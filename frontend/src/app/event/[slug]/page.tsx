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
import { Globe, MapPinLine, Ticket, UsersThree } from "@phosphor-icons/react";
import Button from "@/components/Button";
import {
  getEventAttendee,
  getSingleEvent,
} from "@/app/api/helper-function";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import date from "date-and-time";
import Loader from "@/components/Loader";
import { EventType } from "@/utils/dataType";
import { useKlater } from "@/app/hooks/kaster/useKlasterTransaction";
import { fetchPrice } from "@/app/seda/helper";

function EventDetail() {
  const { slug } = useParams();
  // const { address } = useAccount();
  const eventId = slug;
  // const [chain, setChain] = useState('')
  const [data, setData] = useState<EventType>({
    id: "",
    created_at: "",
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
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [dateF, setDate] = useState<Date>();
  const [dateE, setDateE] = useState<Date>();
  const [attendee, setAttendee] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>("token1"); // Default token
  const [price, setPrice] = useState<number | null>(null); // Price state

  const { initiateKlasterTransaction, klasterAddress } = useKlater();

  // const handleJoinEvent = async () => {
  //   await joinEvent(eventId as string, address as string);
  //   getAttendee();
  // };

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
  }, [data]);

  const buyTicket = async () => {
    const data = await fetchPrice(selectedToken);
    if (data) {
      console.log({ data });
      // handleJoinEvent();
    }
  };

  const toggleModal = async () => {
    setIsModalOpen(!isModalOpen);
    // const data = await fetchPrice();
    // if (data) {
    //   handleJoinEvent();
    // }
    // console.log(data);
    await initiateKlasterTransaction(
      1,
      "0xf6Ef00549fa9987b75f71f65EAcFB30A82E095E5",
    );
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="w-[50%] items-center justify-center rounded-lg bg-white p-6 text-center">
            <h2 className="text-lg font-semibold">Confirm Purchase</h2>
            <p>Are you sure you want to buy a ticket?</p>

            <p className="mt-2">
              Price: {price !== null ? `$${price}` : "Loading..."}
            </p>

            <div className="mt-4 flex justify-end">
              <Button onClick={toggleModal} text="Cancel" className="mr-2" />
              <Button onClick={buyTicket} text="Confirm" />
            </div>
          </div>
        </div>
      )}
      <main className="background-image-div">
        <Header auth={true} />
        <Nav />
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader color={"white"} heignt={"100px"} />
          </div>
        ) : (
          <div className="mb-16 mt-4 flex flex-col items-center justify-center gap-5 tablet:flex-row">
            <div>
              <Image
                src="/images/events.png"
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
                    London
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <MapPinLine size={20} className="mt-1" />
                <div>
                  <p className="font-medium">Add Event Location</p>
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
