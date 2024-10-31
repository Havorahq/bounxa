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

function Explore() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [show, setShow] = useState("all events");
  const [filter, setFilter] = useState<any>([]);
  const [tickets, setTickets] = useState<any>([]);
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
      filter = first.filter((obj: any) => obj.host !== address);
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

  return (
    <main className="h-screen overflow-y-scroll">
      <Header />
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
            filter?.map(
              (obj: any, index: number) =>
                obj.type === "public" && <EventsCard2 key={index} data={obj} />,
            )
          )}
          {/* <EventsCard2 /> */}
        </div>
      </div>
    </main>
  );
}

export default Explore;
