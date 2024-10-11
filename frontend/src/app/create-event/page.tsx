/* eslint-disable @next/next/no-img-element */
//
"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useState, useRef } from "react";
import {
  Globe,
  MapPinLine,
  Plus,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import Button from "@/components/Button";
import { createEvent } from "../api/helper-function";
import { useAccount } from "@particle-network/connectkit";
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CreateEvent() {
  const { address } = useAccount();
  
  const [showPrice, setShowPrice] = useState(false);
  const startDRef = useRef<HTMLInputElement | null>(null);
  const endDRef = useRef<HTMLInputElement | null>(null);
  const startTRef = useRef<HTMLInputElement | null>(null);
  const endTRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);  
  const [type, setType] = useState("public");

  const startDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleCreateEvent = async () => {
   await createEvent(address as string, location, capacity,eventName, startDate, endDate,type)
  };
  return (
    <main className="background-image-div">
      <Header auth={true} />
      <Nav />
      {showPrice && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#DEDEDECC]">
          <div className="h-[377px] w-[95%] rounded-2xl bg-white p-5 text-black phone:w-[340px]">
            <img src="/icons/movie-tickets.svg" alt="" />
            <h1 className="mt-5 text-xl font-medium">Ticket Price</h1>
            <p className="mt-2 font-medium text-[#00000099]">
              Set the price for your event (Set as $0 if free)
            </p>
            <p className="mt-4 font-medium">Cost</p>
            <div className="mt-1 flex items-center gap-3 rounded-lg border border-[#00000033] p-2 font-medium">
              <Ticket size={20} className="" />
              <div className="flex items-center">
                <p>$</p>
                <input
                  type="text"
                  className="w-full bg-transparent outline-none"
                  name=""
                  id=""
                  placeholder="Ticket price"
                />
              </div>
            </div>
            <Button
              text={"Set Ticket Price"}
              className="mt-5 w-full !bg-black text-white"
              onClick={() => setShowPrice(false)}
            />
          </div>
        </div>
      )}
      <div className="mb-16 mt-4 flex flex-col items-center justify-center gap-5 tablet:flex-row">
        <div>
          <img
            src="/images/events.png"
            alt=""
            className="m-auto w-[90%] rounded-xl object-cover phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
          />
        </div>
        <div className="w-[90%] phone:w-[400px] tablet:w-[380px]">
          <div className="flex items-center gap-6">
            <div className="rounded-[36px] bg-white px-5 py-1 font-medium text-black">
              Public
            </div>
            <div className="font-medium">Private</div>
          </div>
          <input
            type="text"
            className="mt-2 w-full border-b border-white bg-transparent text-3xl outline-none phone:text-4xl"
            placeholder="Event Name"
            name=""
            id=""
          />
          <div className="mt-4 flex gap-2">
            <div className="grow rounded-lg bg-[#FFFFFFCC] p-1">
              <div className="flex gap-2">
                <div className="flex grow">
                  <input
                    ref={startDRef}
                    type="date"
                    className="mt-10 h-[1px] w-[0px] bg-white font-medium text-black opacity-0"
                    name=""
                    id=""
                    onChange={startDateChange}
                    min={getTodayDate()}
                  />
                  <p
                    onClick={() => startDRef.current?.showPicker()}
                    className="grow cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {startDate || "Start date"}
                  </p>
                </div>

                {/* <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow">
                  Sunday 29 Sept
                </p> */}
                <div className="flex">
                  <input
                    ref={startTRef}
                    type="time"
                    className="mt-10 h-[0px] w-[0px] opacity-0"
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <p
                    onClick={() => startTRef.current?.showPicker()}
                    className="cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {startTime || "12:00"}
                  </p>
                </div>
              </div>
              <div className="mt-1 flex gap-2">
                <div className="flex grow">
                  <input
                    type="date"
                    className="mt-10 h-[1px] w-[0px] bg-white font-medium text-black opacity-0"
                    name=""
                    id=""
                    ref={endDRef}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <p
                    onClick={() => endDRef.current?.showPicker()}
                    className="grow cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {endDate || "End date"}
                  </p>
                </div>
                <div className="flex">
                  <input
                    ref={endTRef}
                    type="time"
                    className="mt-10 h-[0px] w-[0px] opacity-0"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <p
                    onClick={() => endTRef.current?.showPicker()}
                    className="rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {endTime || "12:00"}
                  </p>
                </div>
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
          <div className="mt-3 flex w-full gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            <MapPinLine size={20} className="mt-1" />
            <div className="w-full">
              <p className="font-medium">Add Event Location</p>
              <input
                placeholder="Enter event Location (Offline and Online)"
                className="w-full bg-transparent font-medium opacity-80 outline-none"
              ></input>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            <MapPinLine size={20} className="" />
            <div>
              <p className="font-medium">Add Description</p>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-medium">Event Options</h1>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div
                onClick={() => setShowPrice(true)}
                className="flex cursor-pointer items-center gap-2"
              >
                <Ticket size={20} className="" />
                <div>
                  <p className="font-medium">Tickets</p>
                </div>
              </div>
              <p>Free</p>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <div className="flex items-center gap-2">
                <UsersThree size={20} className="" />
                <div>
                  <p className="font-medium">Capacity</p>
                </div>
              </div>
              <p>Unlimited</p>
            </div>
          </div>

          <Button onClick={handleCreateEvent}
            className="mt-4 w-full"
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
