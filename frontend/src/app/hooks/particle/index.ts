import { SmartAccount } from '@particle-network/aa';
import { arbitrumSepolia, sepolia} from '@particle-network/connectkit/chains';
import { useEthereum } from '@particle-network/authkit';
import { useEffect, useState } from 'react';
import { useAccount, useWallets } from '@particle-network/connectkit';



export const initializeSmartAccount = async (args: {
    provider: any
})=>{
    try{
        const {provider} = args;
        const smartAccount = new SmartAccount(provider, {
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY || '',
            appId: process.env.NEXT_PUBLIC_APP_ID || '',
            aaOptions: {
                accountContracts: {  // 'BICONOMY', 'CYBERCONNECT', 'SIMPLE', 'LIGHT', 'XTERIO'
                    BICONOMY: [
                        {
                            version: '1.0.0',  
                            chainIds: [sepolia.id, arbitrumSepolia.id],
                        },
                        {  
                            version: '2.0.0',
                            chainIds: [sepolia.id, arbitrumSepolia.id],
                        }
                    ],
                    CYBERCONNECT: [
                        {
                            version: '1.0.0',
                            chainIds: [sepolia.id, arbitrumSepolia.id], 
                        }
                    ],
                    SIMPLE: [
                        {
                            version: '1.0.0',
                            chainIds: [sepolia.id, arbitrumSepolia.id],
                        }
                    ],
                },
                paymasterApiKeys: [{ // Optional
                    chainId: 11155111,  
                    apiKey: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_API_KEY || '',
                }]
            }, 
        });
        
        smartAccount.setSmartAccountContract({ name: 'BICONOMY', version: '2.0.0' });

        const address = await smartAccount.getAddress(); 
        console.log('the smart account address', address)
    
        const ownerAddress = await smartAccount.getOwner();
        console.log('smart account owner address', ownerAddress)

        const accountInfo = await smartAccount.getAccount();
        console.log('smart account info', accountInfo)
        return {
            smartAccount
        }
    } catch (e){
        console.log('error intializing smart account', e)
        return { smartAccount: null }
    }
    
}
  




export const useParticleSmartAccount =()=>{

    const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null);
    const { isConnected, } = useAccount();
    const [primaryWallet] = useWallets();
    console.log('the primary wallet', primaryWallet)

    const init = async ()=>{
        const EOAprovider = await primaryWallet?.connector?.getProvider();
        const { smartAccount } = await initializeSmartAccount({ provider: EOAprovider });
        setSmartAccount(smartAccount)
    }

    useEffect(()=>{
        if (isConnected && primaryWallet) {
            init()
        }
    }, [isConnected, primaryWallet])

    const executeParticleTransaction =async (args:{
        amount: number,
    })=>{
        const {amount} = args
        if (!smartAccount) return
        
        const tx = {  
            to: '0xf6Ef00549fa9987b75f71f65EAcFB30A82E095E5',
            value: (amount * 1e18).toString(),
        }

        const feeQuotesResult = await smartAccount.getFeeQuotes(tx);
        const tokenFeeQuotes = feeQuotesResult?.tokenPaymaster?.feeQuotes;
        const userOpBundle = await smartAccount.buildUserOperation({ tx,  }) 
        const userOp = userOpBundle.userOp;  
        const userOpHash = userOpBundle.userOpHash;
        const txHash = await smartAccount.sendUserOperation({ userOp, userOpHash });  
        console.log('sending the particle transaction the txHash', txHash)
        console.log('fee quote ggg', tokenFeeQuotes)
    }

    return{
        smartAccount,
        executeParticleTransaction
    }

}