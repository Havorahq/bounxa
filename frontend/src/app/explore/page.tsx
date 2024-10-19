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
import Link from "next/link";
import EmptyState from "@/components/event/EmptyState";

function Explore() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [show, setShow] = useState("upcoming");
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
    if (show === "upcoming") {
      filter = data.filter((obj: any) => new Date(obj.end_date) > todayNow);
    }
    setFilter(filter);
  }, [data, show, address]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <main className="h-screen">
      <Nav />
      <header className="m-auto flex w-[90%] items-center justify-between py-8 lg:w-[1020px]">
        <Link href={"/"}>
          <img src="/icons/Logo.svg" alt="" className="h-10 phone:h-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <Link href={"/login"}>
            <button className="rounded-full bg-white px-6 py-2 font-medium text-black">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      <div className="m-auto w-[95%] lg:w-[1000px]">
        <div className="flex items-center gap-6">
          <div
            onClick={() => setShow("upcoming")}
            className={`${show === "upcoming" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            Upcoming Events
          </div>
          <div
            onClick={() => setShow("my event")}
            className={`${show === "my event" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            My Event
          </div>
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
