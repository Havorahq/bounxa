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
import { useAccount} from "@particle-network/connectkit";
// import { Eip1193Provider, ethers } from "ethers";
import { avalancheFuji, arbitrumSepolia, sepolia, optimismSepolia, base, liskSepolia, optimism} from '@particle-network/connectkit/chains';
import { useState } from "react";
import { liFiBrigePlugin } from "./helpers/lifiPlugin";
import { encodeFunctionData, erc20Abi } from "viem";

export const useKlater =()=>{
    // const [primaryWallet] = useWallets();
    const { address, isConnected, chainId}  = useAccount();
    // const [transactionStatus, setTransactionStatus] = useState<string|null>(null)
    // const [newEventAddress, setNewEventAddress] = useState<string|null>(null)
    // const [unifiedUsdcBalance, setUnifiedUsdcBalance] = useState(0)
    const [multichainToken, setMultichainToken] = useState<MultichainTokenMapping>([])
    const [klasterObj, setKlaterObj] = useState<KlasterSDK<BiconomyV2AccountInitData> | null>(null)
    const [multiChainClient, setMultiChainClient] = useState<MultichainClient | null>(null)
    const [unifiedBalance, setUnifiedBalance] = useState<UnifiedBalanceResult | null>(null)

    const initialiseKlaster = async ()=>{
        console.log('hook called')
        try{
            if (!isConnected) throw new Error("Wallet not connected")
            // const EOAprovider = await primaryWallet?.connector?.getProvider();
            // const web3Provider = new ethers.BrowserProvider(EOAprovider as unknown as Eip1193Provider);
            // const signer = await web3Provider.getSigner();

            if (!address) return
            const klaster = await initKlaster({
                // accountInitData: loadBicoV2Account({
                //   owner: (address as `0x${string}`), // Fetch
                // }),
                accountInitData: loadSafeV141Account({
                    signers: ['0xE08686958FF334A5422df17FaF05dd989e779FfA'],
                    threshold: BigInt(100),
                  }),
                nodeUrl: klasterNodeHost.default,
            });

            setKlaterObj(klaster)

            const mcClient = buildMultichainReadonlyClient([
                buildRpcInfo(sepolia.id, "https://eth-sepolia.g.alchemy.com/v2/qokf832tk1LMYpfbOwozWXwmpfTfJ9FI"),
                buildRpcInfo(421614, "https://sepolia-rollup.arbitrum.io/rpc"),
            ]);

            setMultiChainClient(mcClient)

            const mcUSDC = buildTokenMapping([
                deployment(sepolia.id, "0x779877A7B0D9E8603169DdbD7836e478b4624789"),
                deployment(421614, "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E"),
            ]);
            setMultichainToken(mcUSDC)

            const intersectTokenAndClients = (
                token: MultichainTokenMapping,
                mcClient: MultichainClient
            ) => {
                return token.filter((deployment) =>
                mcClient.chainsRpcInfo
                    .map((info) => info.chainId)
                    .includes(deployment.chainId)
                );
            };

            const mUSDC = intersectTokenAndClients(mcUSDC, mcClient);

            const uBalance = await mcClient.getUnifiedErc20Balance({
                tokenMapping: mUSDC,
                account: klaster.account,
            });

            setUnifiedBalance(uBalance)

            console.log(uBalance, 'the united obj')
        } catch (e){
            alert(e)
            console.log('error in klaster transaction', e)
        }
    }

    const initiateKlasterTransaction =async(amount: number)=>{
        if (!klasterObj || !multiChainClient || !unifiedBalance) return
        const bridgingOps = await encodeBridgingOps({
            tokenMapping: multichainToken,
            account: klasterObj.account,
            amount: BigInt(amount), // Don't send entire balance
            bridgePlugin: liFiBrigePlugin,
            client: multiChainClient,
            destinationChainId: sepolia.id,
            unifiedBalance: unifiedBalance,
        });

        const sendERC20Op = rawTx({
            gasLimit: BigInt(1000000),
            to:   '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',//destChainTokenAddress,
            data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "transfer",
            args: ['0xbDAa89286D2055140546c84fc70727a675345ae5', bridgingOps.totalReceivedOnDestination],
            }),
        });

        const iTx = buildItx({
            // BridgingOPs + Execution on the destination chain
            // added as steps to the iTx
            steps: bridgingOps.steps.concat(singleTx(sepolia.id, sendERC20Op)),
            // Klaster works with cross-chain gas abstraction. This instructs the Klaster
            // nodes to take USDC on Optimism as tx fee payment.
            feeTx: klasterObj.encodePaymentFee(optimism.id, "USDC"),
        });

        const quote = await klasterObj.getQuote(iTx);

        console.log('the quote', quote)
    }

    // useEffect(()=>{
    //     initialiseKlaster()
    // }, [isConnected])

    return {
        initialiseKlaster,
        initiateKlasterTransaction
    }
}
