/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
//

"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Globe,
  MapPinLine,
  Ticket,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Button from "@/components/Button";
import {
  getEventAttendee,
  getSingleEvent,
  joinEvent,
} from "@/app/api/helper-function";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import date from "date-and-time";
import Loader from "@/components/Loader";
import { EventType } from "@/utils/dataType";
import { useKlater } from "@/app/hooks/kaster/useKlasterTransaction";
import { fetchPrice } from "@/app/seda/helper";
import { usePaymaster } from "@/app/hooks/contractInteractions/usePayMaster";
import { useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";

function EventDetail() {
  const { slug } = useParams();
  const router = useRouter();
  // const { address } = useAccount();
  const eventId = slug;
  const [chain, setChain] = useState<number | null>(null);
  const [data, setData] = useState<EventType>({
    id: "",
    created_at: "",
    address: "",
    host: "",
    host_name: "",
    location: "",
    start_date: "",
    capacity: "",
    end_date: "",
    description: "",
    type: "",
    timezone: "",
    name: "",
    price: 0,
    blockchain_address: "",
    chain: "",
    timezone_utc: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [dateF, setDate] = useState<Date>();
  const [dateE, setDateE] = useState<Date>();
  const [attendee, setAttendee] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>("token1"); // Default token
  const [price, setPrice] = useState<number | null>(null); // Price state
  const [showImage, setShowImage] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [sedaId, setSedaId] = useState("");

  const { initiateKlasterTransaction, klasterAddress, unifiedBalance } =
    useKlater();
  const { buyTickets: payTicket } = usePaymaster();
  const { address, chainId } = useAccount();

  const handleJoinEvent = async (ticket_hash: string, seda_id: string) => {
    const res = await joinEvent(
      eventId as string,
      address as string,
      ticket_hash,
      seda_id,
    );
    if (res.data) {
      toast.success("Ticket bought, pls check 'My Tickets' to view");
      router.push("/explore");
    } else {
      toast.error("Something went wrong");
    }
    getAttendee();
  };

  const getAttendee = async () => {
    const res = await getEventAttendee(eventId as string);
    if (res.data) {
      setAttendee(res.data);
    }
  };

  const getEventData = async () => {
    setLoading(true);
    const res = await getSingleEvent(eventId as string);
    getAttendee();
    if (res.error) {
      toast.error(res.error, { position: "top-right" });
    }
    if (res.data) {
      setData(res.data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEventData();
  }, []);

  useEffect(() => {
    const format = new Date(data?.start_date);
    const formatE = new Date(data?.end_date);
    setDate(format);
    setDateE(formatE);
    setChain(data.chain === "" ? 0 : data.chain === "" ? 1 : 2);
  }, [data]);

  const handleValidatePurchase = async (
    chain: number,
    transaction_hash: string,
  ) => {
    const data = await fetchPrice(chain, transaction_hash);
    setSedaId(data.result.drId);
    return data.result.drId;
  };

  const buyTicket = async () => {
    setLoadingB(true);

    try {
      if (data.price) {
        const result = await initiateKlasterTransaction(
          data.price,
          data.host as `0x${string}`,
          // data.chain === "Ethereum" ? 0 : data.chain === "Arbitrum" ? 1 : 2,
          1,
        );
      }
      const res = await payTicket({
        eventContractAddress: data.blockchain_address as `0x${string}`,
        quantity: 1,
        userAddress: address as `0x${string}`,
      });

      const sedaRes = await handleValidatePurchase(
        chainId!,
        res.transactionHash,
      );
      if (sedaRes) {
        await handleJoinEvent(res.transactionHash, sedaRes);
      }
    } catch (e) {
      toast.error("Something went wrong", { position: "top-right" });
      // toast.error(e as string, { position: "top-right" });
      setLoadingB(false);
      return e;
    }

    setLoadingB(false);
  };

  const toggleModal = async () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="w-[90%] items-center justify-center rounded-lg bg-white p-12 text-center sm:w-1/2">
            <h2 className="text-lg font-semibold">Confirm Purchase</h2>
            <p>Are you sure you want to buy a ticket?</p>
            <p className="mt-2">
              Price: {data.price ? `$${data.price}` : "Free"}
            </p>
            <div className="mt-5 flex justify-center gap-5">
              <Button
                onClick={toggleModal}
                text="Cancel"
                className="!bg-red-400 !text-white"
              />
              <Button
                onClick={() => buyTicket()}
                text="Confirm"
                loading={loadingB}
                className="!bg-green-400 !text-white"
              />
            </div>
          </div>
        </div>
      )}

      {showImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 text-black">
          <div>
            <div
              onClick={() => setShowImage(false)}
              className="flex items-end justify-end"
            >
              <X size={32} color="white" />
            </div>
            <div className="relative">
              {/* <Image src={data.image_url!} alt={"Event image"} fill /> */}
              <img src={data.image_url!} alt="" />
            </div>
          </div>
        </div>
      )}
      <main className="background-image-div">
        <Header />
        <Nav />
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader color={"white"} heignt={"100px"} />
          </div>
        ) : (
          <div className="mb-16 mt-4 flex flex-col items-center justify-center gap-5 tablet:flex-row">
            <div className="cursor-pointer" onClick={() => setShowImage(true)}>
              <Image
                src={data.image_url || "/images/events.png"}
                alt=""
                width={450}
                height={539}
                className="m-auto w-[90%] rounded-xl object-cover phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
              />
            </div>
            <div className="w-[90%] phone:w-[400px] tablet:w-[380px]">
              {/* <div className="flex items-center gap-6">
            <div className="bg-white text-black font-medium py-1 px-5 rounded-[36px]">
              Public
            </div>
            <div className="font-medium">Private</div>
          </div> */}
              <h1 className="mt-2 w-full text-3xl capitalize phone:text-4xl">
                {data.name}
              </h1>
              <div className="mt-4 flex gap-2">
                <div className="grow rounded-lg bg-[#FFFFFFCC] p-1">
                  <div className="flex gap-2">
                    <p className="grow rounded-lg bg-white p-2 font-medium text-black opacity-80">
                      {dateF && date.format(dateF! as Date, "dddd D MMM")}
                    </p>
                    <p className="rounded-lg bg-white p-2 font-medium text-black opacity-80">
                      {dateF && date.format(dateF! as Date, "hh:mm")}
                    </p>
                  </div>
                  <div className="mt-1 flex gap-2">
                    <p className="grow rounded-lg bg-white p-2 font-medium text-black opacity-80">
                      {dateE && date.format(dateE! as Date, "dddd D MMM")}
                    </p>
                    <p className="rounded-lg bg-white p-2 font-medium text-black opacity-80">
                      {dateE && date.format(dateE! as Date, "hh:mm")}
                    </p>
                  </div>
                </div>
                <div className="flex w-[90px] flex-col justify-between rounded-lg bg-[#FFFFFFCC] p-3">
                  <Globe color="black" size={25} />
                  <p className="font-medium text-black">GMT</p>
                  <p className="text-sm font-medium text-black opacity-80">
                    {data.timezone_utc}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <MapPinLine size={20} className="mt-1" />
                <div>
                  <p className="font-medium">Event Location</p>
                  <p className="font-medium opacity-80">{data.location}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                {data.description}
              </div>

              <div className="mt-4">
                <h1 className="text-xl font-medium">Event Details</h1>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                  <div className="flex items-center gap-2">
                    <Ticket size={20} className="" />
                    <div>
                      <p className="font-medium">Tickets</p>
                    </div>
                  </div>
                  {data.price ? <p>${data.price}</p> : "Free"}
                </div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                  <div className="flex items-center gap-2">
                    <UsersThree size={20} className="" />
                    <div>
                      <p className="font-medium">Capacity</p>
                    </div>
                  </div>
                  {data.capacity ? (
                    <p>
                      {attendee.length}/{data.capacity}
                    </p>
                  ) : (
                    "Unlimited"
                  )}
                </div>
              </div>

              <Button
                onClick={toggleModal}
                className="mt-4 w-full"
                text={"Buy Ticket"}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default EventDetail;
