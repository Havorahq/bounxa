/* eslint-disable react-hooks/exhaustive-deps */
import { useAccount, useWallets } from "@particle-network/connectkit";
import { Eip1193Provider, ethers } from "ethers";
import eventFactoryAbi from "../../../lib/contractinfo/EventFactoryAbi.json";
import { useEffect, useState } from "react";

export const useGetDeployedEvents = (args: { ownerAddress: string }) => {
  const [primaryWallet] = useWallets();
  const { address, isConnected } = useAccount();
  const [events, setEvents] = useState([]);

  const getDeployedEvents = async () => {
    try {
      if (!isConnected || !primaryWallet) return;
      const EOAprovider = await primaryWallet?.connector?.getProvider();

      const web3Provider = new ethers.BrowserProvider(
        EOAprovider as unknown as Eip1193Provider,
      );
      const signer = await web3Provider.getSigner();
      if (address) {
        const bounxaEventFactory = new ethers.Contract(
          "0xC8BF6461596eaDAF5386a6786aaEce1Dc74dB11e",
          eventFactoryAbi,
          signer,
        );
        const events = await bounxaEventFactory.getEvents(args.ownerAddress);
        setEvents(events);
      }
    } catch (e) {
      console.log("error getting deployed events info", e);
      alert(e);
    }
  };

  useEffect(() => {
    getDeployedEvents();
  }, [address, isConnected, primaryWallet]);

  return {
    events,
  };
};
