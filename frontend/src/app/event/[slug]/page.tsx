//

"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React from "react";
import {
  Globe,
  MapPinLine,
  Plus,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import Button from "@/components/Button";

function EventDetail() {
  return (
    <main className="background-image-div">
      <Header auth={true} />
      <Nav />
      <div className="mb-16 mt-4 flex flex-col items-center justify-center gap-5 tablet:flex-row">
        <div>
          <img
            src="/images/events.png"
            alt=""
            className="m-auto w-[90%] rounded-xl object-cover phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
          />
        </div>
        <div className="w-[90%] phone:w-[400px] tablet:w-[380px]">
          {/* <div className="flex items-center gap-6">
            <div className="bg-white text-black font-medium py-1 px-5 rounded-[36px]">
              Public
            </div>
            <div className="font-medium">Private</div>
          </div> */}
          <h1 className="mt-2 w-full text-3xl phone:text-4xl">Concert Party</h1>
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

          <div className="mt-4">
            <h1 className="text-xl font-medium">Event Details</h1>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <Ticket size={20} className="" />
                <div>
                  <p className="font-medium">Tickets</p>
                </div>
              </div>
              <p>$20</p>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <UsersThree size={20} className="" />
                <div>
                  <p className="font-medium">Capacity</p>
                </div>
              </div>
              <p>10/100</p>
            </div>
          </div>

          <Button className="mt-4 w-full" text={"Buy Ticket"} />
        </div>
      </div>
    </main>
  );
}

export default EventDetail;
