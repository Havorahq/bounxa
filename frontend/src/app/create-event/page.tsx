/* eslint-disable @next/next/no-img-element */
//
"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useState, useRef, ReactNode } from "react";
import {
  Globe,
  MapPinLine,
  Plus,
  Ticket,
  UsersThree,
} from "@phosphor-icons/react";
import date from "date-and-time";
import Button from "@/components/Button";
import { createEvent } from "../api/helper-function";
import { useAccount } from "@particle-network/connectkit";
import EventModal from "./_components/EventModal";
import { toast } from "sonner";
import timezones from "timezones-list";
import { useCreateEvent } from "../hooks/contractInteractions/useCreateEvent";
import "react-calendar/dist/Calendar.css";

const getTodayDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CreateEvent() {
  const { address } = useAccount();
  const [showPrice, setShowPrice] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const startDRef = useRef<HTMLInputElement | null>(null);
  const endDRef = useRef<HTMLInputElement | null>(null);
  const startTRef = useRef<HTMLInputElement | null>(null);
  const endTRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("public");
  const [description, setDescriotion] = useState("");
  const [tz, setTz] = useState("");
  const [utc, setUtc] = useState("");
  const [creator, setCreator] = useState("");
  const [showTz, setShowtz] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createEvent: blockCReate, newEventAddress } = useCreateEvent();

  const startDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleCreateEvent = async () => {
    setLoading(true);

    try {
      await blockCReate({
        visibility: type,
        startDate: `${startDate}T${startTime}`,
        endDate: `${endDate}T${endTime}`,
        location: location,
        imageUrl: "",
        description: description,
        ticketPrice: price ? parseInt(price) : 0,
        ticketQuantity: capacity ? parseInt(capacity) : 0,
      });
    } catch (e: unknown) {
      toast.error(e as ReactNode);
      return e;
    }

    if (newEventAddress) {
      const response = await createEvent(
        address as string,
        location,
        parseInt(capacity),
        eventName,
        `${startDate}T${startTime}`,
        `${endDate}T${endTime}`,
        type,
        description,
        tz,
        creator,
        utc,
        newEventAddress!,
        parseInt(price),
      );
      if (response.error) {
        toast.error(response.error, { position: "top-right" });
      }
      if (response.data) {
        toast.success("Event created", { position: "top-right" });
      }
    }

    setLoading(false);
  };
  return (
    <main className="background-image-div">
      <Header auth={true} />
      <Nav />
      {showPrice && (
        <EventModal
          title={"Ticket Price"}
          subTitle={"Set the price for your event (Set as $0 if free)"}
          label={"Cost"}
          value={price.toString()}
          close={() => setShowPrice(false)}
          setValue={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
          money={true}
          icon={<Ticket />}
          placeHolder={"Ticket price"}
        />
      )}
      {showCapacity && (
        <EventModal
          title={"Max Capacity"}
          subTitle={
            "Auto-close registration when the capacity is reached. Only approved guests count towards the cap."
          }
          label={"Capacity"}
          value={capacity}
          close={() => setShowCapacity(false)}
          setValue={(e) => setCapacity(e.target.value.replace(/[^0-9.]/g, ""))}
          icon={<UsersThree />}
          placeHolder={"capacity"}
          btn={
            <div className="flex items-center gap-2">
              <Button
                text={"Set Limit"}
                className="mt-5 w-full !bg-black text-white"
                onClick={() => setShowCapacity(false)}
              />
              <Button
                text={"Remove Limit"}
                className="mt-5 w-full border border-[#00000033] !bg-black !bg-transparent !px-2 !text-black"
                onClick={() => {
                  setCapacity("");
                  setShowCapacity(false);
                }}
              />
            </div>
          }
        />
      )}

      {showTz && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[#DEDEDECC]">
          <div
            className="w-[95%] rounded-2xl bg-white p-5 text-black phone:w-[340px]"
            // ref={ref!}
          >
            <div className="h-[400px] w-full overflow-y-scroll">
              {timezones.map((obj, index: number) => (
                <div
                  onClick={() => {
                    setTz(obj.tzCode);
                    setUtc(obj.utc);
                    setShowtz(false);
                  }}
                  key={index}
                  className="cursor-pointer border-b border-[#96969686] py-1 text-sm"
                >
                  {obj.tzCode}
                </div>
              ))}
            </div>
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
            <div
              onClick={() => setType("public")}
              className={` ${type === "public" ? "r rounded-[36px] bg-white px-5 py-1 text-black" : ""} cursor-pointer font-medium`}
            >
              Public
            </div>
            <div
              onClick={() => setType("private")}
              className={`${type === "private" ? "rounded-[36px] bg-white px-5 py-1 text-black" : ""} cursor-pointer font-medium`}
            >
              Private
            </div>
          </div>
          <input
            type="text"
            className="mt-2 w-full border-b border-white bg-transparent text-3xl outline-none phone:text-4xl"
            placeholder="Event Name"
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />
          <div className="mt-4 flex gap-2">
            <div className="grow rounded-lg bg-[#FFFFFFCC] p-1">
              <div className="flex gap-2">
                <div className="relative flex grow">
                  <input
                    ref={startDRef}
                    type="date"
                    className="absolute mt-10 max-h-0 max-w-0 bg-white font-medium text-black opacity-0"
                    name=""
                    id=""
                    onChange={startDateChange}
                    min={getTodayDate(new Date())}
                  />

                  <p
                    onClick={() => startDRef!.current?.showPicker()}
                    className="grow cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {startDate
                      ? date.format(new Date(startDate), "dddd D MMM")
                      : "Start date"}
                  </p>
                </div>

                {/* <p className="text-black opacity-80 font-medium bg-white p-2 rounded-lg grow">
                  Sunday 29 Sept
                </p> */}
                <div className="relative flex">
                  <input
                    ref={startTRef}
                    type="time"
                    className="absolute mt-10 h-[0px] w-[0px] opacity-0"
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
                <div className="relative flex grow">
                  <input
                    type="date"
                    className="absolute mt-10 h-[1px] w-[0px] bg-white font-medium text-black opacity-0"
                    ref={endDRef}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={getTodayDate(new Date(startDate))}
                  />
                  <p
                    onClick={() => endDRef.current?.showPicker()}
                    className="grow cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {endDate
                      ? date.format(new Date(endDate), "dddd D MMM")
                      : "Start date"}
                  </p>
                </div>
                <div className="relative flex">
                  <input
                    ref={endTRef}
                    type="time"
                    className="absolute mt-10 h-[0px] w-[0px] opacity-0"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <div
                    onClick={() => endTRef.current?.showPicker()}
                    className="cursor-pointer rounded-lg bg-white p-2 font-medium text-black opacity-80"
                  >
                    {endTime || "12:00"}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setShowtz(true)}
              className="flex w-[90px] cursor-pointer flex-col justify-between rounded-lg bg-[#FFFFFFCC] p-3"
            >
              <Globe color="black" size={25} />
              <p className="font-medium text-black">GMT</p>
              <p className="text-sm font-medium text-black opacity-80">{utc}</p>
            </div>
          </div>
          <div className="mt-3 flex w-full gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            <MapPinLine size={20} className="mt-1" />
            <div className="w-full">
              <p className="font-medium">Add Event Location</p>
              <input
                placeholder="Enter event Location (Offline and Online)"
                className="w-full bg-transparent font-medium opacity-80 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#FFFFFFCC] p-3 text-black">
            <MapPinLine size={20} className="" />
            <div className="w-full">
              <p className="font-medium">Add Description</p>
              <input
                placeholder="Enter event description"
                className="w-full bg-transparent font-medium opacity-80 outline-none"
                value={description}
                onChange={(e) => setDescriotion(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-xl font-medium">Event Options</h1>
            <div className="mt-4 flex cursor-pointer items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black">
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                name=""
                id=""
                placeholder="Creator alias"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <div
              onClick={() => setShowPrice(true)}
              className="mt-2 flex cursor-pointer items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black"
            >
              <div className="flex items-center gap-2">
                <Ticket size={20} className="" />
                <div>
                  <p className="font-medium">Tickets</p>
                </div>
              </div>
              <p>{price === "" ? "Free" : `$${price}`}</p>
            </div>
            <div
              onClick={() => setShowCapacity(true)}
              className="mt-2 flex cursor-pointer items-center justify-between rounded-lg bg-[#FFFFFFCC] p-3 text-black"
            >
              <div className="flex items-center gap-2">
                <UsersThree size={20} className="" />
                <div>
                  <p className="font-medium">Capacity</p>
                </div>
              </div>
              <p>{capacity === "" ? "Unlimited" : capacity}</p>
            </div>
          </div>

          <Button
            loading={loading}
            onClick={handleCreateEvent}
            disabled={
              eventName === "" ||
              location === "" ||
              startDate === "" ||
              endDate === "" ||
              description === "" ||
              creator === "" ||
              tz === "" ||
              loading
            }
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
