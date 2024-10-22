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

function Calendar() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EventType[]>([]);
  const [arranged, setArranged] = useState<EventType[]>([]);
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

    setArranged(filtered);
  }, [data]);

  return (
    <main className="background-image-div">
      <Header />
      <Nav />
      <div className="flex flex-col gap-5 sm:mt-20 sm:gap-0">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader color={"white"} heignt={"100px"} />
          </div>
        ) : arranged.length === 0 ? (
          <EmptyState />
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
