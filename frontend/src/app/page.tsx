/* eslint-disable @next/next/no-img-element */
//
"use client";
import { Compass } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <main className="">
      <div className="bgg"></div>
      <header className="m-auto flex w-[90%] justify-between py-8 tablet:w-[1020px]">
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
      <div className="m-auto mt-10 flex w-[1020px] items-center justify-center">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="w-[530px] text-[80px] font-medium leading-[75px]">
              Event Hosting On The Blockchain
            </h1>
            <p className="mt-5 w-[350px] text-[#FFFFFFCC]">
              Set up an event page, invite friends and sell tickets. Host a
              memorable event today.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <Link href={""}>
                <button className="rounded-full bg-white px-6 py-2 font-medium text-black">
                  Get Started
                </button>
              </Link>

              <Link href={""}>
                <button className="rounded-full border border-white px-6 py-2 font-medium text-white">
                  <div className="flex items-center gap-1 font-medium">
                    <Compass color="white" size={20} /> <p>Explore Events</p>
                  </div>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img src="/images/ticket.svg" className="h-[500px]" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
