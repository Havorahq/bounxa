/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
//
"use client";
// import { useAccount } from "@particle-network/connectkit";
import {
  Compass,
  Globe,
  MapPinLine,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEventAttendee, getSingleEvent } from "@/app/api/helper-function";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import date from "date-and-time";
import { EventType } from "@/utils/dataType";

function Analytics() {
  const { slug } = useParams();
  // const { address } = useAccount();
  const eventId = slug;
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
    blockchain_address: "",
    chain: "",
    image_url: "",
    timezone_utc: "",
  });
  const [loading, setLoading] = useState(true);
  const [dateF, setDate] = useState<Date>();
  const [dateE, setDateE] = useState<Date>();
  const [attendee, setAttendee] = useState([]);

  const getAttendee = async () => {
    const res = await getEventAttendee(eventId as string);
    if (res.data) {
      setAttendee(res.data as never[]);
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

  return (
    <main className="h-screen">
      <header className="m-auto flex w-[90%] items-center justify-between py-8 lg:w-[1020px]">
        <Link href={"/"}>
          <img src="/icons/Logo.svg" alt="" className="h-10 phone:h-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <Link href={"/explore"}>
            <button className="hidden rounded-full px-6 py-2 font-medium text-white sm:block">
              <div className="flex items-center gap-1 font-medium">
                <Compass color="white" size={20} /> <p>Explore Events</p>
              </div>
            </button>
          </Link>
          <Link href={"/login"}>
            <button className="rounded-full bg-white px-3 py-2 font-medium text-black phone:px-6">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {loading ? (
        <Loader color={"white"} />
      ) : (
        <div className="mt-16 flex items-center justify-center">
          <div className="w-[90%] sm:w-[550px]">
            <div className="flex gap-2">
              <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <div className="flex items-center gap-2">
                  <Ticket size={20} />
                  <div>
                    <p className="font-medium">Tickets</p>
                  </div>
                </div>
                <p className="mt-3 text-2xl">{attendee.length}</p>
              </div>
              <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <div className="flex items-center gap-2">
                  <Ticket size={20} />
                  <div>
                    <p className="font-medium">Cost per Ticket</p>
                  </div>
                </div>
                <p className="mt-3 text-2xl">
                  {data.price ? <p>${data.price}</p> : "Free"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <div className="flex items-center gap-2">
                  <UsersThree size={20} />
                  <div>
                    <p className="font-medium">Capacity</p>
                  </div>
                </div>
                <p className="mt-3 text-2xl">
                  {" "}
                  {data.capacity ? <p>{data.capacity}</p> : "Unlimited"}
                </p>
              </div>
              <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                <div className="flex items-center gap-2">
                  <Ticket size={20} />
                  <div>
                    <p className="font-medium">Cost per Ticket</p>
                  </div>
                </div>
                <p className="mt-3 text-2xl">
                  {" "}
                  {data.price ? <p>${data.price}</p> : "Free"}
                </p>
              </div>
            </div>

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
          </div>
        </div>
      )}
    </main>
  );
}

export default Analytics;
