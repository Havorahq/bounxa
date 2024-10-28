import { ethers } from "ethers"
import eventFactoryAbi from '../../../lib/contractinfo/EventFactoryAbi.json'
import eventContractAbi from '../../../lib/contractinfo/EventContractAbi.json'

const EVENT_FACT0RY_ADDRESS = '0x32d4B0F1C9150F23613035F825eE52FD6fDC75Cc'

export const usePaymaster = () => {
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const arbitrumProvider = ethers.getDefaultProvider('https://sepolia-rollup.arbitrum.io/rpc') // for arbitrum sepolia
    const signer = new ethers.Wallet(privateKey as string, arbitrumProvider)


    const createEvent = async (args:{
        name: string,
        ticketPrice: number,
        ticketQuantity: number,
        owner: `0x${string}`
    }) =>{
        try{
            const {
                name,
                ticketPrice,
                ticketQuantity,
                owner
            } = args;
    
            const eventFactoryContract = new ethers.Contract(EVENT_FACT0RY_ADDRESS, eventFactoryAbi, signer)
            const eventCreationTx = await eventFactoryContract.createBounxaEvent(name, ticketPrice, ticketQuantity, owner)
            eventCreationTx.wait();

            const deployedEvents: string[] = await eventFactoryContract.getEvents(owner)
            const mostRecentEvent = deployedEvents[deployedEvents.length - 1]
    
            console.log('the most recent event', mostRecentEvent)
            return mostRecentEvent
        } catch (e){
            console.log('error creating event', e)
        }
        
    }

    const buyTickets = async (args:{
        eventContractAddress: `0x${string}`,
        quantity: number,
        userAddress: `0x${string}`
    }) => {
        const {
            eventContractAddress,
            quantity,
            userAddress
        } = args
        try{
            const eventContract = new ethers.Contract(eventContractAddress, eventContractAbi, signer);
            const ticketNFTAddress = await eventContract.getTicketNFTAddress()
            console.log('the ticket nft address', ticketNFTAddress)
            const buyTicketTx = await eventContract.buyTickets(quantity, userAddress);
            buyTicketTx.wait();
            console.log('the buy ticket tx', buyTicketTx)
            return {status: "success"}
        } catch(e){
            console.log('error buying ticket', e)
            return {status: "error"}
        }
    }

    return {
        createEvent,
        signer,
        arbitrumProvider,
        buyTickets
    }
}