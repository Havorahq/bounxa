/* eslint-disable @next/next/no-img-element */
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

function CreateEvent() {
  return (
    <main className="background-image-div">
      <Header auth={true} />
      <Nav />
      <div className="flex gap-8 items-center justify-center mt-8">
        <div>
          <img
            src="/images/events.png"
            alt=""
            className="w-[475px] h-[539px] object-cover rounded-xl"
          />
        </div>
        <div className="">
          <div className="flex items-center gap-6">
            <div className="bg-white text-black font-medium py-1 px-5 rounded-[36px]">
              Public
            </div>
            <div className="font-medium">Private</div>
          </div>
          <input
            type="text"
            className="outline-none bg-transparent border-b border-white w-full text-[36px]"
            placeholder="Event Name"
            name=""
            id=""
          />
          <div className="flex gap-2 mt-4">
            <div className="bg-[#FFFFFFCC] p-1 rounded-lg grow">
              <div className="flex gap-2">
                <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow">
                  Sunday 29 Sept
                </p>
                <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg">
                  12:30
                </p>
              </div>
              <div className="flex gap-2 mt-1">
                <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow">
                  Sunday 29 Sept
                </p>
                <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg">
                  12:30
                </p>
              </div>
            </div>
            <div className="bg-[#FFFFFFCC] p-3 rounded-lg flex flex-col justify-between w-[90px]">
              <Globe color="black" size={25} />
              <p className="text-black font-medium">GMT</p>
              <p className="text-black opacity-80 text-sm font-medium">
                London
              </p>
            </div>
          </div>
          <div className="flex bg-[#FFFFFFCC] p-3 rounded-lg text-black gap-2 mt-3">
            <MapPinLine size={20} className="mt-1" />
            <div>
              <p className="font-medium">Add Event Location</p>
              <p className="font-medium opacity-80">
                Enter event Location (Offline and Online)
              </p>
            </div>
          </div>
          <div className="flex bg-[#FFFFFFCC] p-3 items-center rounded-lg text-black gap-2 mt-3">
            <MapPinLine size={20} className="" />
            <div>
              <p className="font-medium">Add Description</p>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="font-medium text-xl">Event Options</h1>
            <div className="flex items-center bg-[#FFFFFFCC] rounded-lg text-black p-3 mt-4 justify-between">
              <div className="flex items-center gap-2">
                <Ticket size={20} className="" />
                <div>
                  <p className="font-medium">Tickets</p>
                </div>
              </div>
              <p>Free</p>
            </div>
            <div className="flex items-center bg-[#FFFFFFCC] rounded-lg text-black p-3 mt-2 justify-between">
              <div className="flex items-center gap-2">
                <UsersThree size={20} className="" />
                <div>
                  <p className="font-medium">Capacity</p>
                </div>
              </div>
              <p>Unlimited</p>
            </div>
          </div>

          <Button
            className="w-full mt-4"
            text={
              <div className="flex items-center gap-2">
                <Plus />
                <p>Create Event</p>
              </div>
            }
          />
        </div>
      </div>
    </main>
  );
}

export default CreateEvent;
