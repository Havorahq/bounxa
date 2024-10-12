/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//
"use client";
import EventsCard2 from "@/components/event/EventsCard2";
import { Compass } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { getAllEvent } from "../api/helper-function";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { useAccount } from "@particle-network/connectkit";

function Explore() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [show, setShow] = useState("my event");
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
  }, [data, show]);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <main>
      <Nav />
      <header className="m-auto flex w-[90%] justify-between py-8 tablet:w-[1000px]">
        <img src="/icons/Logo.svg" alt="" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-medium">
            {" "}
            <Compass color="white" size={20} /> <p>Explore Events</p>
          </div>
          <div className="rounded-full bg-white px-6 py-2 font-medium text-black">
            <p>Get Started</p>
          </div>
        </div>
      </header>
      <div className="m-auto w-[1000px]">
        <div className="flex items-center gap-6">
          <div
            onClick={() => setShow("my event")}
            className={`${show === "my event" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            My Event
          </div>
          <div
            onClick={() => setShow("upcoming")}
            className={`${show === "upcoming" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            Upcoming Events
          </div>
        </div>
        <div className="mt-10 flex w-full flex-wrap items-start gap-5">
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <Loader color={"white"} heignt={"100px"} />
            </div>
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
