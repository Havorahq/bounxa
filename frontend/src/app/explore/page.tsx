//
"use client";
import EventsCard2 from "@/components/event/EventsCard2";
import { Compass } from "@phosphor-icons/react";
import React from "react";

function Explore() {
  return (
    <main>
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
          <div className="rounded-[36px] bg-white px-5 py-1 font-medium text-black">
            My Event
          </div>
          <div className="font-medium">Upcoming Events</div>
        </div>
        <div className="mt-10 flex w-full flex-wrap items-start gap-5">
          <EventsCard2 />
          <EventsCard2 />
          <EventsCard2 />
          <EventsCard2 />
          <EventsCard2 />
          {/* <EventsCard2 /> */}
        </div>
      </div>
    </main>
  );
}

export default Explore;
