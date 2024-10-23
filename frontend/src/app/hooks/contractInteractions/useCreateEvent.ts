import eventFactoryAbi from "../../../lib/contractinfo/EventFactoryAbi.json";
import { useState } from "react";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { bscTestnet } from "viem/chains";

function dateToUint256(dateInput: string) {
  // If dateInput is a string, convert it to a Date object
  const date = new Date(dateInput);
  // Get the Unix timestamp in seconds
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  // Convert to uint256 (same as a large number in JavaScript)
  const uint256Timestamp = BigInt(unixTimestamp);
  return uint256Timestamp;
}

export const useCreateEvent = () => {
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null,
  ); // pending | confirmed
  const [newEventAddress, setNewEventAddress] = useState<string | null>(null);

  const createEvent = async (args: {
    visibility: string;
    startDate: string;
    endDate: string;
    location: string;
    imageUrl?: string;
    description: string;
    ticketPrice: number;
    ticketQuantity: number;
  }) => {
    try {
      // const EOAprovider = await primaryWallet?.connector?.getProvider();
      const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
      const signerAccount = privateKeyToAccount(privateKey as `0x${string}`);
      const signer = createWalletClient({
        transport: http(),
        chain: bscTestnet,
      });
      // const web3Provider = new ethers.BrowserProvider(EOAprovider as unknown as Eip1193Provider);
      // const signer = await web3Provider.getSigner();
      setTransactionStatus("pending");
      // const eventCreationTx = await bounxaEventFactory.createBounxaEvent(
      //     args.visibility, // _visibility
      //     dateToUint256(args.startDate), // _startTime (the date the event is starting)
      //     dateToUint256(args.endDate), // _endTime
      //     args.location, // location
      //     args.description, // description
      //     args.imageUrl ?? '', // image: image url for the event,
      //     args.description, // name: event name
      //     BigInt(args.ticketPrice), // ticketPrice
      //     BigInt(args.ticketQuantity), // ticketQuantity
      // )
      await signer.writeContract({
        address: "0xeb40Cea52D7D78AEab0b5D858Af0F5076809A2fA",
        abi: eventFactoryAbi,
        functionName: "createBounxaEvent",
        args: [
          args.visibility, // _visibility
          dateToUint256(args.startDate), // _startTime (the date the event is starting)
          dateToUint256(args.endDate), // _endTime
          args.location, // location
          args.description, // description
          args.imageUrl ?? "", // image: image url for the event,
          args.description, // name: event name
          BigInt(args.ticketPrice), // ticketPrice
          BigInt(args.ticketQuantity), // ticketQuantity
        ],
        account: signerAccount,
      });
      // setTransactionStatus('confirmed')

      // const deployedEvents: string[] = await bounxaEventFactory.getEvents(address)

      // const mostRecentEvent = deployedEvents[deployedEvents.length - 1]
      setNewEventAddress("0xeb40Cea52D7D78AEab0b5D858Af0F5076809A2fA");
      return "0xeb40Cea52D7D78AEab0b5D858Af0F5076809A2fA";
    } catch (e) {
      console.log(e, "inner");
      // throw new Error(JSON.stringify(e))
      return "0xeb40Cea52D7D78AEab0b5D858Af0F5076809A2fA";
    }
  };

  return {
    createEvent,
    transactionStatus,
    newEventAddress,
  };
};
