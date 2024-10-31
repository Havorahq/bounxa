/* eslint-disable @typescript-eslint/no-explicit-any */
//

"use client";

import EventCard from "@/components/event/EventCard";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useEffect, useState } from "react";
import { getAllEvent } from "../api/helper-function";
import Loader from "@/components/Loader";
import { EventType } from "@/utils/dataType";
import EmptyState from "@/components/event/EmptyState";
import { useRouter } from "next/navigation";

function Calendar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EventType[]>([]);
  const [arranged, setArranged] = useState<EventType[]>([]);
  const [show, setShow] = useState("upcoming");
  const getAll = async () => {
    setLoading(true);
    const res = await getAllEvent();
    if (res.data) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const filtered = data.sort(function (a, b) {
      return a.start_date.localeCompare(b.start_date);
    });

    let more;
    if (show === "upcoming") {
      more = filtered.filter((obj) => new Date(obj.start_date) > new Date());
    } else {
      more = filtered.filter((obj) => new Date(obj.start_date) < new Date());
    }

    setArranged(more);
  }, [data, show]);

  return (
    <main className="background-image-div">
      <Header />
      <Nav />
      <div className="m-auto flex items-center gap-10 phone:w-[400px] sm:w-[600px] md:w-[700px]">
        <div
          onClick={() => setShow("upcoming")}
          className={`${show === "upcoming" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
        >
          Upcoming
        </div>
        <div
          onClick={() => setShow("past")}
          className={`${show === "past" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
        >
          Past
        </div>
      </div>
      <div className="flex flex-col gap-5 sm:mt-20 sm:gap-0">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader color={"white"} heignt={"100px"} />
          </div>
        ) : arranged.length === 0 ? (
          <EmptyState
            title={"No Upcoming Event"}
            subtitle={"You have no upcoming events. Why not host one?"}
            btnText={"Create Event"}
            onClick={() => router.push("/create-event")}
          />
        ) : (
          arranged.map(
            (obj, index: number) =>
              obj.type === "public" && <EventCard key={index} data={obj} />,
          )
        )}
      </div>
    </main>
  );
}

export default Calendar;
