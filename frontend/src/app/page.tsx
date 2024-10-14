/* eslint-disable @next/next/no-img-element */
//
"use client";
import { Compass } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <main className="">
      {/* <div className="bgg"></div> */}
      <header className="m-auto flex w-[90%] items-center justify-between py-8 lg:w-[1020px]">
        <img src="/icons/Logo.svg" alt="" className="h-10 phone:h-auto" />
        <div className="flex items-center gap-2">
          {/* <Link href={"/explore"}>
            <button className="rounded-full px-6 py-2 font-medium text-white">
              <div className="flex items-center gap-1 font-medium">
                <Compass color="white" size={20} /> <p>Explore Events</p>
              </div>
            </button>
          </Link> */}
          <Link href={"/login"}>
            <button className="rounded-full bg-white px-3 py-2 font-medium text-black phone:px-6">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      <div className="m-auto mt-10 flex w-[90%] items-center justify-center lg:w-[1020px]">
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <div>
            <h1 className="w-[90%] text-[40px] font-medium leading-[50px] phone:text-[48px] sm:w-[400px] sm:text-[65px] sm:leading-[75px] tablet:w-[530px] lg:text-[80px]">
              Event Hosting On The Blockchain
            </h1>
            <p className="mt-5 w-[90%] text-[#FFFFFFCC] phone:w-[350px]">
              Set up an event page, invite friends and sell tickets. Host a
              memorable event today.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <Link href={"/login"}>
                <button className="rounded-full bg-white px-3 py-2 font-medium text-black phone:px-6">
                  Get Started
                </button>
              </Link>
              <Link href={"/explore"}>
                <button className="rounded-full border border-white px-3 py-2 font-medium text-white phone:px-6">
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
