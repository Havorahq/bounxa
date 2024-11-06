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
import { toast } from "sonner";

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
  const [tick, setTick] = useState<null>(null);
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
    if (res.data) {
      setTickets(res.data);
    } else {
      toast.error("");
    }
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
  }, [data, show, address, tickets]);

  useEffect(() => {
    getAll();
    att();
  }, [address, show]);

  useEffect(() => {
    if (showId) {
      const get = filter.find((obj: EventType) => obj.id === showId);
      const get2 = tickets.find((obj: any) => obj.event_id === showId);
      setTick(get2);
      setTict(get);
    }
  }, [showId]);

  return (
    <main className="h-screen overflow-y-scroll">
      <Header />
      {showTicket && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 text-black">
          <div className="w-[95%] items-center justify-center rounded-lg bg-white p-4 text-center phone:p-12 sm:w-[500px]">
            <div className="flex w-full items-center justify-center">
              <div className="h-[183px] w-[160px] rounded-2xl border-r border-dashed border-white bg-[#1E0970] p-2 text-left text-xs text-[#D5CBFF] phone:w-[200px] sm:p-4">
                <img
                  src={ticket?.image_url as string}
                  alt=""
                  className="h-[30px] w-[30px] rounded-md bg-white"
                />
                <h1 className="mt-2 text-base font-bold">
                  {truncateString(ticket?.name as string, 14)}
                </h1>

                <p className="mt-2">
                  Date :{" "}
                  <span className="font-semibold">
                    {date.format(
                      new Date(ticket?.start_date as string),
                      "MMM D, YYYY",
                    )}
                  </span>
                </p>
                <p className="mt-2">
                  Time :{" "}
                  <span className="font-semibold">
                    {date.format(
                      new Date(ticket?.start_date as string),
                      "hh:mmA",
                    )}
                  </span>
                </p>
                <p className="mt-2">
                  Location :{" "}
                  <span className="font-semibold">
                    {truncateString(ticket?.location as string, 13)}
                  </span>
                </p>
              </div>
              {/* <div className="h-[160px] w-[10px] rounded-2xl border-r border-dashed border-white bg-[#1E0970]"></div> */}
              <div className="flex h-[183px] w-[160px] items-center justify-center rounded-2xl border-l border-dashed border-white bg-[#1E0970] p-2 sm:w-[200px]">
                <QRCode
                  value={
                    tick
                      ? // ? `https://devnet.explorer.seda.xyz/data-requests/${tick["seda_id"]}`
                        `https://sepolia.arbiscan.io/${tick["ticket_hash"]}`
                      : ""
                  }
                  // value={`ffff`}
                  className="h-full w-full phone:h-[130px]"
                />
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
