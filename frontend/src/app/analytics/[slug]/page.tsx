/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
//
"use client";
// import { useAccount } from "@particle-network/connectkit";
import {
  CopySimple,
  Globe,
  MapPinLine,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  deleteEvent,
  getEventAttendee,
  getSingleEvent,
} from "@/app/api/helper-function";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import date from "date-and-time";
import { EventType } from "@/utils/dataType";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import copy from "copy-to-clipboard";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

function Analytics() {
  const { slug } = useParams();
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
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
    price: null,
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

  const onCopy = (text: string) => {
    copy(text, {});
    toast("text copied");
  };

  const [deleteL, setDeleteL] = useState(false);
  const delEvent = async () => {
    setDeleteL(true);
    const res = await deleteEvent(eventId as string);
    if (!res.error) {
      toast.success("Event deleted");
      router.push("/explore");
    } else {
      toast("Error while deleting event");
    }
    setDeleteL(false);
  };

  return (
    <main className="h-screen overflow-y-scroll pb-20">
      <Header />
      <Nav />
      {loading ? (
        <Loader color={"white"} />
      ) : (
        <div className="m-auto mt-16 w-[90%] sm:w-[550px]">
          <div className="flex gap-5">
            <Button
              text={"Edit event"}
              onClick={() => router.push(`/event/edit/${eventId}`)}
            />
            <Button
              text={"Delete event"}
              className="!bg-red-400 !text-white"
              onClick={delEvent}
              loading={deleteL}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <div className="flex gap-2">
                <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                  <div className="flex items-center gap-2">
                    <Ticket size={20} />
                    <div>
                      <p className="font-medium">Tickets Sold</p>
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
                    {data.capacity ? <p>{data.capacity}</p> : "Unlimited"}
                  </p>
                </div>
                <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                  <div className="flex items-center gap-2">
                    <Ticket size={20} />
                    <div>
                      <p className="font-medium">Total Sales</p>
                    </div>
                  </div>
                  <p className="mt-3 text-2xl">
                    {data.price ? (
                      <p>{data.price * attendee.length}</p>
                    ) : (
                      "Free"
                    )}
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
                  <p className="font-medium">Event Location</p>
                  <p className="font-medium opacity-80">{data.location}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
                {data.description}
              </div>
              <div
                onClick={() => onCopy(`${BaseUrl}/event/${eventId}`)}
                className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black"
              >
                <p className="font-medium">Copy event link</p>
                <CopySimple size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Analytics;
