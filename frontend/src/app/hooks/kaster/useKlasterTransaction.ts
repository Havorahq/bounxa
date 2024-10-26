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
import { useAccount, useWallets } from "@particle-network/connectkit";
// import { Eip1193Provider, ethers } from "ethers";
import { arbitrumSepolia, sepolia } from "@particle-network/connectkit/chains";
import { useEffect, useState } from "react";
import { liFiBrigePlugin } from "./helpers/lifiPlugin";
import {
  encodeFunctionData,
  erc20Abi,
  parseUnits,
} from "viem";


const usdcOnSupportedChains = [
  {chainId: sepolia.id, coinAddress:"0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"}, // eth sepolia
  {chainId: 421614, coinAddress: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"}, // arbitrum sepolia
  {chainId: 11155420, coinAddress: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7"}, // optimism sepolia
]

export const useKlater = () => {
  const blockchainAccount = useAccount();
  const { isConnected, address } = blockchainAccount;
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

  const [primaryWallet] = useWallets();

  const initialiseKlaster = async () => {
    try {
      if (!isConnected) throw new Error("Wallet not connected");

      if (!address) return;
      const klaster = await initKlaster({
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
        buildRpcInfo(421614, "https://sepolia-rollup.arbitrum.io/rpc"), // arbitrum sepolia
        buildRpcInfo(11155420, "https://sepolia.optimism.io"), // optimism sepolia
      ]);

      setMultiChainClient(mcClient);

      const mcUSDC = buildTokenMapping([
        deployment(sepolia.id, "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"),
        deployment(421614, "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"), // arbitrum sepolia
        deployment(11155420, "0x5fd84259d66Cd46123540766Be93DFE6D43130D7"), // optimism sepolia
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
      return {status: "success"}
    } catch (e) {
      // alert(e)
      console.log("error in klaster transaction", e);
      return {status: "error"}
    }
  };

  useEffect(() => {
    initialiseKlaster();
  }, [isConnected]);

  const initiateKlasterTransaction = async (
    amount: number,
    receiverAddress: `0x${string}`, // event address
    chainIndex: number,
  ) => {
    console.log("function getting in use", usdcOnSupportedChains[chainIndex]);
    try {
      if (!klasterObj || !multiChainClient || !unifiedBalance) return;
      console.log(klasterObj.account, "klasteraccount");
      const bridgingOps = await encodeBridgingOps({
        tokenMapping: multichainToken,
        account: klasterObj.account,
        amount: parseUnits(amount.toString(), unifiedBalance.decimals), // parseUnits(amount.toString(), unifiedBalance.decimals), // Don't send entire balance
        bridgePlugin: liFiBrigePlugin,
        client: multiChainClient,
        destinationChainId: usdcOnSupportedChains[chainIndex].chainId,
        unifiedBalance: unifiedBalance,
      });

      const sendERC20Op = rawTx({
        gasLimit: BigInt(1000000),
        to: usdcOnSupportedChains[chainIndex].coinAddress as `0x${string}`,
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
          singleTx(usdcOnSupportedChains[chainIndex].chainId, sendERC20Op),
        ),
        // Klaster works with cross-chain gas abstraction. This instructs the Klaster
        // nodes to take USDC on Optimism as tx fee payment.
        feeTx: klasterObj.encodePaymentFee(arbitrumSepolia.id, "USDC"),
      });

      const quote = await klasterObj.getQuote(iTx);
      console.log("the quote", quote);

      const walletClient = primaryWallet.getWalletClient();
      const signed = await walletClient.signMessage({
        message: {
          raw: quote.itxHash,
        },
        account: address as `0x${string}`,
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
