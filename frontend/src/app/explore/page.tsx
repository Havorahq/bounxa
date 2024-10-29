/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//
"use client";
import EventsCard2 from "@/components/event/EventsCard2";
import React, { useEffect, useState } from "react";
import { getAllEvent } from "../api/helper-function";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { useAccount } from "@particle-network/connectkit";
import EmptyState from "@/components/event/EmptyState";
import Header from "@/components/Header";

function Explore() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [show, setShow] = useState("all event");
  const [filter, setFilter] = useState<any>([]);
  const todayNow = new Date();
  const getAll = async () => {
    setLoading(true);
    const res = await getAllEvent();
    if (res.data) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let filter;
    if (show === "my event") {
      filter = data.filter((obj: any) => obj.host === address);
    }
    if (show === "all event") {
      const first = data.filter(
        (obj: any) => new Date(obj.end_date) > todayNow,
      );
      filter = first.filter((obj: any) => obj.host !== address);
    }
    setFilter(filter.reverse());
  }, [data, show, address]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <main className="h-screen overflow-y-scroll">
      <Header />
      <Nav />
      <div className="m-auto w-[95%] lg:w-[1000px]">
        <div className="flex items-center gap-6">
          <div
            onClick={() => setShow("all event")}
            className={`${show === "all event" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            All Events
          </div>
          {isConnected && (
            <div
              onClick={() => setShow("my event")}
              className={`${show === "my event" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
            >
              My Events
            </div>
          )}
          {isConnected && (
            <div
              onClick={() => setShow("my ticket")}
              className={`${show === "my ticket" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
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
          ) : filter.length === 0 ? (
            <EmptyState />
          ) : (
            filter.map(
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
