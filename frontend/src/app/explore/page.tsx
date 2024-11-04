/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//
"use client";
import EventsCard2 from "@/components/event/EventsCard2";
import React, { useEffect, useState } from "react";
import { getAllEvent, getUserTicket } from "../api/helper-function";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { useAccount } from "@particle-network/connectkit";
import EmptyState from "@/components/event/EmptyState";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import QRCode from "react-qr-code";
import { EventType } from "@/utils/dataType";
import { truncateString } from "@/utils/function.helper";
import date from "date-and-time";

function Explore() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [show, setShow] = useState("all events");
  const [filter, setFilter] = useState<any>([]);
  const [tickets, setTickets] = useState<any>([]);
  const [showTicket, setShowTicket] = useState(false);
  const [showId, setShowId] = useState("");
  const [ticket, setTict] = useState<EventType | null>(null);
  const todayNow = new Date();
  const getAll = async () => {
    setLoading(true);
    const res = await getAllEvent();
    if (res.data) {
      setData(res.data);
    }
    setLoading(false);
  };

  const att = async () => {
    const res = await getUserTicket(address!);
    setTickets(res.data);
    console.log(res);
  };

  useEffect(() => {
    let filter;
    if (show === "my events") {
      filter = data.filter((obj: any) => obj.host === address);
    }
    if (show === "all events") {
      const first = data.filter(
        (obj: any) => new Date(obj.end_date) > todayNow,
      );
      filter = first.filter(
        (obj: any) => obj.host !== address && obj.type === "public",
      );
    }

    if (show === "my tickets") {
      const first = data.filter((obj1: any) =>
        tickets.some((obj2: any) => obj2.event_id === obj1.id),
      );
      filter = first;
    }
    setFilter(filter?.reverse());
  }, [data, show, address]);

  useEffect(() => {
    getAll();
    att();
  }, []);

  useEffect(() => {
    if (showId) {
      const get = filter.find((obj: EventType) => obj.id === showId);
      setTict(get);
    }
  }, [showId]);

  return (
    <main className="h-screen overflow-y-scroll">
      <Header />
      {showTicket && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="w-[90%] items-center justify-center rounded-lg bg-white p-12 text-center sm:w-1/2">
            <div className="flex w-full items-center justify-center">
              <div className="h-[183px] w-[200px] rounded-2xl border-r border-dashed border-white bg-[#1E0970] p-4 text-left text-xs text-[#D5CBFF]">
                <img
                  src="image"
                  alt=""
                  className="h-[30px] w-[30px] rounded-md bg-white"
                />
                <h1 className="mt-2 text-base font-bold">
                  {truncateString(ticket?.name!, 14)}
                </h1>

                <p className="mt-2">
                  Date :{" "}
                  <span className="font-semibold">
                    {date.format(new Date(ticket?.start_date!), "MMM D, YYYY")}
                  </span>
                </p>
                <p className="mt-2">
                  Time :{" "}
                  <span className="font-semibold">
                    {date.format(new Date(ticket?.start_date!), "hh:mmA")}
                  </span>
                </p>
                <p className="mt-2">
                  Location :{" "}
                  <span className="font-semibold">
                    {truncateString(ticket?.location!, 13)}
                  </span>
                </p>
              </div>
              {/* <div className="h-[160px] w-[10px] rounded-2xl border-r border-dashed border-white bg-[#1E0970]"></div> */}
              <div className="h-[183px] flex items-center justify-center w-[200px] rounded-2xl border-l border-dashed border-white bg-[#1E0970]">
                <img src="./qrcode" alt="" className="h-[123px] w-[120px] object-cover" />
              </div>
            </div>
          </div>

          <Button
            className="mt-6 !bg-red-400 !text-white"
            text={"Close"}
            onClick={() => setShowTicket(false)}
          />
        </div>
      )}
      <Nav />
      <div className="m-auto w-[95%] lg:w-[1000px]">
        <div className="flex items-center gap-3 phone:gap-6">
          <div
            onClick={() => setShow("all events")}
            className={`${show === "all events" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 text-center font-medium`}
          >
            All Events
          </div>
          {isConnected && (
            <div
              onClick={() => setShow("my events")}
              className={`${show === "my events" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 text-center font-medium`}
            >
              My Events
            </div>
          )}
          {isConnected && (
            <div
              onClick={() => setShow("my tickets")}
              className={`${show === "my tickets" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 text-center font-medium`}
            >
              My Tickets
            </div>
          )}
        </div>
        <div className="events_con mt-10">
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <Loader color={"white"} heignt={"100px"} />
            </div>
          ) : filter?.length === 0 ? (
            <EmptyState
              title={
                show === "my tickets" ? "No Active Ticket" : "No Upcoming Event"
              }
              subtitle={
                show === "my tickets"
                  ? "You have not purchased any ticket. Why not buy one?"
                  : " You have no upcoming events. Why not host one?"
              }
              btnText={show === "my tickets" ? "Buy Ticket" : "Create Event"}
              onClick={
                show === "my tickets"
                  ? () => setShow("all events")
                  : () => router.push("/create-event")
              }
            />
          ) : (
            filter?.map((obj: EventType, index: number) => (
              <div
                key={index}
                className="event_card"
                onClick={
                  show === "my tickets"
                    ? () => {
                        setShowTicket(true);
                        setShowId(obj.id);
                      }
                    : () => {}
                }
              >
                <EventsCard2
                  data={obj}
                  text={show === "my tickets" ? "View ticket" : ""}
                />
              </div>
            ))
          )}
          {/* <EventsCard2 /> */}
        </div>
      </div>
    </main>
  );
}

export default Explore;
