import { initKlaster, klasterNodeHost, loadBicoV2Account, rawTx } from "klaster-sdk";
import { createWalletClient, custom, parseUnits } from "viem";
import { arbitrumSepolia } from "viem/chains";


export const initkkk = async ()=>{
    // blindly following hackathon workshop
    const signer = createWalletClient({
        transport: custom((window as any).ethereum),
    });

    const [address] = await signer.getAddresses();

    const klaster = await initKlaster(
        {
            nodeUrl: klasterNodeHost.default,
            accountInitData: loadBicoV2Account({
                owner: address, // Fetch
            }),
        }
    )

    const klasterAccountAddress = klaster.account.getAddress(arbitrumSepolia.id)

    console.log('klaster account address', klasterAccountAddress, 'from', address, klasterAccountAddress === address)

    const sendUSDC = rawTx({
        to: address,
        gasLimit: BigInt(90000),
        value: parseUnits('0.1', 6)
    })
}