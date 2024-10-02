/* eslint-disable @next/next/no-img-element */
//
"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useState } from "react";
import {
  Globe,
  MapPinLine,
  Plus,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import Button from "@/components/Button";

function CreateEvent() {
  const [showPrice, setShowPrice] = useState(false);
  return (
    <main className="background-image-div">
      <Header auth={true} />
      <Nav />
      {showPrice && (
        <div className="absolute h-screen w-full bg-[#DEDEDECC] top-0 left-0 flex items-center justify-center z-50">
          <div className="w-[340px] h-[377px] bg-white rounded-2xl text-black p-5">
            <img src="/icons/movie-tickets.svg" alt="" />
            <h1 className=" font-medium text-xl mt-5">Ticket Price</h1>
            <p className="font-medium text-[#00000099] mt-2">
              Set the price for your event (Set as $0 if free)
            </p>
            <p className="font-medium mt-4">Cost</p>
            <div className="flex border border-[#00000033] items-center gap-3 font-medium rounded-lg p-2 mt-1">
              <Ticket size={20} className="" />
              <div className="flex items-center ">
                <p>$</p>
                <input
                  type="text"
                  className="outline-none bg-transparent w-full "
                  name=""
                  id=""
                  placeholder="Ticket price"
                />
              </div>
            </div>
            <Button
              text={"Set Ticket Price"}
              className="!bg-black text-white w-full mt-5"
              onClick={() => setShowPrice(false)}
            />
          </div>
        </div>
      )}
      <div className="flex gap-8 items-center justify-center mt-8">
        <div>
          <img
            src="/images/events.png"
            alt=""
            className="w-[475px] h-[539px] object-cover rounded-xl"
          />
        </div>
        <div className="w-[400px]">
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
                <input
                  type="date"
                  className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow"
                  name=""
                  id=""
                />
                {/* <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow">
                  Sunday 29 Sept
                </p> */}
                <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg">
                  12:30
                </p>
              </div>
              <div className="flex gap-2 mt-1">
                <input
                  type="date"
                  className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow"
                  name=""
                  id=""
                />
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
          <div className="w-full flex bg-[#FFFFFFCC] p-3 rounded-lg text-black gap-2 mt-3">
            <MapPinLine size={20} className="mt-1" />
            <div className="w-full">
              <p className="font-medium">Add Event Location</p>
              <input
                placeholder="Enter event Location (Offline and Online)"
                className="font-medium opacity-80 outline-none bg-transparent w-full"
              ></input>
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
              <div
                onClick={() => setShowPrice(true)}
                className="cursor-pointer flex items-center gap-2"
              >
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
