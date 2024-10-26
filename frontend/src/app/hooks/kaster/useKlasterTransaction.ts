/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BiconomyV2AccountInitData,
  buildItx,
  buildMultichainReadonlyClient,
  buildRpcInfo,
  buildTokenMapping,
  deployment,
  encodeBridgingOps,
  initKlaster,
  klasterNodeHost,
  KlasterSDK,
  loadBicoV2Account,
  loadSafeV141Account,
  MultichainClient,
  MultichainTokenMapping,
  rawTx,
  singleTx,
  UnifiedBalanceResult,
} from "klaster-sdk";
// import eventFactoryAbi from '../../../lib/contractinfo/EventFactoryAbi.json'
// import { useWallets } from '@particle-network/connectkit';
import { useAccount } from "@particle-network/connectkit";
// import { Eip1193Provider, ethers } from "ethers";
import { arbitrumSepolia, sepolia } from "@particle-network/connectkit/chains";
import { useEffect, useState } from "react";
import { liFiBrigePlugin } from "./helpers/lifiPlugin";
import {
  encodeFunctionData,
  erc20Abi,
  parseUnits,
} from "viem";

export const useKlater = () => {
  const blockchainAccount = useAccount();
  const { isConnected, address } = blockchainAccount;
  console.log({ isConnected, address });
  const [multichainToken, setMultichainToken] =
    useState<MultichainTokenMapping>([]);
  const [klasterObj, setKlaterObj] =
    useState<KlasterSDK<BiconomyV2AccountInitData> | null>(null);
  const [multiChainClient, setMultiChainClient] =
    useState<MultichainClient | null>(null);
  const [unifiedBalance, setUnifiedBalance] =
    useState<UnifiedBalanceResult | null>(null);
  const [signer, setSigner] = useState<any>(null);
  const [klasterAddress, setKlasterAddress] = useState<`0x${string}` | null>(
    null,
  );

  const initialiseKlaster = async () => {
    try {
      if (!isConnected) throw new Error("Wallet not connected");
      // const EOAprovider = await primaryWallet?.connector?.getProvider();
      // const web3Provider = new ethers.BrowserProvider(EOAprovider as unknown as Eip1193Provider);
      // const signer = await web3Provider.getSigner();

      //   const signer = createWalletClient({
      //     transport: custom((window as any).ethereum),
      //   });
      //   console.log("testing signer", signer);
      //   setSigner(signer);

      //   const [address] = await signer.getAddresses();

      //   console.log("the signer address", address);

      if (!address) return;
      const klaster = await initKlaster({
        // accountInitData: loadBicoV2Account({
        //   owner: (address as `0x${string}`), // Fetch
        // }),
        accountInitData: loadSafeV141Account({
          signers: [address as `0x${string}`],
          threshold: BigInt(1),
        }),
        nodeUrl: klasterNodeHost.default,
      });

      const mcClient = buildMultichainReadonlyClient([
        buildRpcInfo(
          sepolia.id,
          "https://eth-sepolia.g.alchemy.com/v2/qokf832tk1LMYpfbOwozWXwmpfTfJ9FI",
        ),
        buildRpcInfo(421614, "https://sepolia-rollup.arbitrum.io/rpc"),
      ]);

      setMultiChainClient(mcClient);

      const mcUSDC = buildTokenMapping([
        deployment(sepolia.id, "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"),
        deployment(421614, "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"),
      ]);
      setMultichainToken(mcUSDC);

      const intersectTokenAndClients = (
        token: MultichainTokenMapping,
        mcClient: MultichainClient,
      ) => {
        return token.filter((deployment) =>
          mcClient.chainsRpcInfo
            .map((info) => info.chainId)
            .includes(deployment.chainId),
        );
      };

      const mUSDC = intersectTokenAndClients(mcUSDC, mcClient);

      console.log(
        "the klaster address",
        klaster.account.getAddress(sepolia.id),
      );
      setKlasterAddress(
        klaster?.account?.getAddress(sepolia.id) as `0x${string}`,
      );

      const uBalance = await mcClient.getUnifiedErc20Balance({
        tokenMapping: mUSDC,
        account: klaster.account,
      });

      setUnifiedBalance(uBalance);

      console.log(uBalance, "the united obj");
      setKlaterObj(klaster);
    } catch (e) {
      // alert(e)
      console.log("error in klaster transaction", e);
    }
  };

  useEffect(() => {
    initialiseKlaster();
  }, [isConnected]);

  const initiateKlasterTransaction = async (
    amount: number,
    receiverAddress: `0x${string}`,
  ) => {
    console.log("function getting in use");
    try {
      if (!klasterObj || !multiChainClient || !unifiedBalance) return;
      console.log(klasterObj.account, "klasteraccount");
      const bridgingOps = await encodeBridgingOps({
        tokenMapping: multichainToken,
        account: klasterObj.account,
        amount: parseUnits("15", unifiedBalance.decimals), // parseUnits(amount.toString(), unifiedBalance.decimals), // Don't send entire balance
        bridgePlugin: liFiBrigePlugin,
        client: multiChainClient,
        destinationChainId: arbitrumSepolia.id,
        unifiedBalance: unifiedBalance,
      });

      const sendERC20Op = rawTx({
        gasLimit: BigInt(1000000),
        to: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [receiverAddress, bridgingOps.totalReceivedOnDestination],
        }),
      });

      const iTx = buildItx({
        // BridgingOPs + Execution on the destination chain
        // added as steps to the iTx
        steps: bridgingOps.steps.concat(
          singleTx(arbitrumSepolia.id, sendERC20Op),
        ),
        // Klaster works with cross-chain gas abstraction. This instructs the Klaster
        // nodes to take USDC on Optimism as tx fee payment.
        feeTx: klasterObj.encodePaymentFee(arbitrumSepolia.id, "USDC"),
      });

      const quote = await klasterObj.getQuote(iTx);
      console.log("the quote", quote);

      const signed = await signer.signMessage({
        message: {
          raw: quote.itxHash,
        },
        account: address,
      });

      const result = await klasterObj.execute(quote, signed);
      console.log("the result", result);
      return result

    } catch (e) {
      alert(e);
      console.log("tx error", e);
      return e
    }
  };

  // useEffect(()=>{
  //     initialiseKlaster()
  // }, [isConnected])

  return {
    initialiseKlaster,
    initiateKlasterTransaction,
    klasterAddress,
  };
};
