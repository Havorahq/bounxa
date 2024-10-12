/* eslint-disable @next/next/no-img-element */
//
"use client";
import {
  Compass,
  Globe,
  MapPinLine,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import React from "react";

function Analytics() {
  return (
    <main className="flex h-screen flex-col">
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

      <div className="flex h-full grow items-center justify-center">
        <div className="w-[550px]">
          <div className="flex gap-2">
            <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <Ticket size={20} />
                <div>
                  <p className="font-medium">Tickets</p>
                </div>
              </div>
              <p className="mt-3 text-2xl">100</p>
            </div>
            <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <Ticket size={20} />
                <div>
                  <p className="font-medium">Cost per Ticket</p>
                </div>
              </div>
              <p className="mt-3 text-2xl">$100</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <UsersThree size={20} />
                <div>
                  <p className="font-medium">Capacity</p>
                </div>
              </div>
              <p className="mt-3 text-2xl">100</p>
            </div>
            <div className="mt-4 w-1/2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <Ticket size={20} />
                <div>
                  <p className="font-medium">Cost per Ticket</p>
                </div>
              </div>
              <p className="mt-3 text-2xl">$100</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="grow rounded-lg bg-[#FFFFFFCC] p-1">
              <div className="flex gap-2">
                <p className="grow rounded-lg bg-white p-2 font-medium text-black opacity-80">
                  Sunday 29 Sept
                </p>
                <p className="rounded-lg bg-white p-2 font-medium text-black opacity-80">
                  12:30
                </p>
              </div>
              <div className="mt-1 flex gap-2">
                <p className="grow rounded-lg bg-white p-2 font-medium text-black opacity-80">
                  Sunday 29 Sept
                </p>
                <p className="rounded-lg bg-white p-2 font-medium text-black opacity-80">
                  12:30
                </p>
              </div>
            </div>
            <div className="flex w-[90px] flex-col justify-between rounded-lg bg-[#FFFFFFCC] p-3">
              <Globe color="black" size={25} />
              <p className="font-medium text-black">GMT</p>
              <p className="text-sm font-medium text-black opacity-80">
                London
              </p>
            </div>
          </div>

          <div className="mt-3 flex gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            <MapPinLine size={20} className="mt-1" />
            <div>
              <p className="font-medium">Add Event Location</p>
              <p className="font-medium opacity-80">02 Arena, London</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            Welcome to the biggest music fest this year!
          </div>
        </div>
      </div>
    </main>
  );
}

export default Analytics;
