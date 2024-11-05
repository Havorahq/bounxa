/* eslint-disable @next/next/no-img-element */
//
"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useState, useRef } from "react";
import {
  Globe,
  Image,
  MapPinLine,
  PencilSimple,
  Plus,
  Ticket,
  UploadSimple,
  UsersThree,
  WarningCircle,
} from "@phosphor-icons/react";
import date from "date-and-time";
import Button from "@/components/Button";
import { createEvent } from "../api/helper-function";
import { useAccount } from "@particle-network/connectkit";
import EventModal from "./_components/EventModal";
import { toast } from "sonner";
import timezones from "timezones-list";
import { usePaymaster } from "../hooks/contractInteractions/usePayMaster";
import "react-calendar/dist/Calendar.css";
import { resizeFile } from "@/config/resizer";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

// function getTodayDate(date: Date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");

//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// }

function CreateEvent() {
  const { address } = useAccount();
  const [showPrice, setShowPrice] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const router = useRouter();
  // const startDRef = useRef<HTMLInputElement | null>(null);
  // const endDRef = useRef<HTMLInputElement | null>(null);
  // const startTRef = useRef<HTMLInputElement | null>(null);
  // const endTRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  // const [startTime, setStartTime] = useState("12:00");
  // const [endTime, setEndTime] = useState("13:00");
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("public");
  const [description, setDescriotion] = useState("");
  const [tz, setTz] = useState("Europe/London");
  const [utc, setUtc] = useState("+00:00");
  const [creator, setCreator] = useState("");
  const [showTz, setShowtz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState("");
  const { createEvent: blockCreate } = usePaymaster();
  const [value, setValue] = useState<File | null>(null);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  // const startDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStartDate(e.target.value);
  // };

  const formData = new FormData();
  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      const newEventAddress = await blockCreate({
        name: eventName,
        ticketPrice: price ? parseInt(price) : 0,
        ticketQuantity: capacity ? parseInt(capacity) : 1000000000,
        owner: address as `0x${string}`,
      });

      if (newEventAddress) {
        formData.append("formData", value!);
        const res = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.url !== "") {
          const response = await createEvent(
            address as string,
            location,
            parseInt(capacity),
            eventName,
            date.format(startDate!, "YYYY-MM-DDTHH:mm"),
            date.format(endDate!, "YYYY-MM-DDTHH:mm"),
            type,
            description,
            tz,
            creator,
            utc,
            newEventAddress!,
            price ? parseInt(price) : 0,
            res.data.url,
            chain,
          );
          if (response.error) {
            toast.error(response.error, { position: "top-right" });
          }
          if (response.data) {
            toast.success("Event created", { position: "top-right" });
            router.push("/explore");
          }
        }
      }
    } catch (e: unknown) {
      toast.error(e as string);
      return e;
    }
    setLoading(false);
  };

  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current!.click();
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let file: File | null = event.target.files![0];

    if (file.size >= 524288 && file.size <= 1048576) {
      file = await resizeFile(file, 70);
    } else if (file.size >= 2000000 && file.size <= 3000000) {
      file = await resizeFile(file, 50);
    } else if (file.size >= 3000000 && file.size <= 5000000) {
      file = await resizeFile(file, 50);
    } else if (file.size > 5000000) {
      file = null;
      toast.error("File is more than 5mb", { position: "top-center" });
    }
    // const selectedFile: any = await resizeFile(File);
    if (file) {
      setValue(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="background-image-div">
      <Header />
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
        <div className="relative w-[90%] phone:w-auto">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="absolute bottom-5 right-8 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#7b7b7b8e] bg-white">
            <Image alt="img" color="black" size={20} />
          </div>
          {!imagePreview ? (
            <div
              onClick={handleFileSelect}
              className="flex h-[320px] cursor-pointer items-center justify-center rounded-xl bg-[#CDCDD1] phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
            >
              <div className="flex flex-col items-center gap-4">
                <p className="w-[200px] text-center text-xl leading-7 text-black">
                  Upload event image from device
                </p>
                <Button
                  text={
                    <div className="flex items-center gap-2">
                      <UploadSimple />
                      <p>Browse Device Images</p>
                    </div>
                  }
                  className="!bg-black !text-white"
                />
              </div>
            </div>
          ) : (
            <img
              src={imagePreview}
              alt=""
              className="m-auto h-[320px] cursor-pointer rounded-xl object-cover phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
              onClick={handleFileSelect}
            />
          )}
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
          <div className="mt-4 flex w-full gap-2">
            <div className="grow rounded-lg bg-[#FFFFFFCC] p-1">
              <div className="flex grow gap-2">
                <div className="flex grow">
                  {!start ? (
                    <DatePicker
                      selected={startDate!}
                      showTimeSelect
                      className="flex !grow rounded-lg bg-white p-2 text-black"
                      timeFormat="hh:mm"
                      dateFormat="EEEE dd MMM"
                      placeholderText="Select start date"
                      onChange={(date) => {
                        setStartDate(date!);
                      }}
                      minDate={new Date()}
                    />
                  ) : (
                    <p
                      // onClick={() => startDRef!.current?.showPicker()}
                      className="flex w-full grow cursor-pointer items-center justify-between rounded-lg bg-white p-2 text-xs font-medium text-black opacity-80 phone:text-base"
                    >
                      {date.format(startDate!, "dddd D MMM")}
                      <PencilSimple size={20} onClick={() => setStart(false)} />
                    </p>
                  )}
                </div>

                <div className="relative flex">
                  <p className="cursor-pointer rounded-lg bg-white p-2 text-sm font-medium text-black opacity-80 phone:text-base">
                    {startDate
                      ? date.format(new Date(startDate), "HH:mm")
                      : "12:00"}
                  </p>
                </div>
              </div>
              <div className="mt-1 flex gap-2">
                <div className="flex grow">
                  {!end ? (
                    <DatePicker
                      selected={endDate!}
                      showTimeSelect
                      className="flex !grow rounded-lg bg-white p-2 text-black"
                      timeFormat="hh:mm"
                      dateFormat="EEEE dd MMM"
                      placeholderText="Select End date"
                      onChange={(date) => {
                        setEndDate(date!);
                      }}
                      minDate={new Date(startDate?.toDateString() as string)}
                    />
                  ) : (
                    <p className="flex w-full grow cursor-pointer items-center justify-between rounded-lg bg-white p-2 text-xs font-medium text-black opacity-80 phone:text-base">
                      {date.format(endDate!, "dddd D MMM")}
                      <PencilSimple size={20} onClick={() => setEnd(false)} />
                    </p>
                  )}
                </div>
                <div className="relative flex">
                  <div className="cursor-pointer rounded-lg bg-white p-2 text-sm font-medium text-black opacity-80 phone:text-base">
                    {endDate
                      ? date.format(new Date(endDate), "HH:mm")
                      : "13:00"}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setShowtz(true)}
              className="flex w-[70px] cursor-pointer flex-col justify-between rounded-lg bg-[#FFFFFFCC] p-3"
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
                placeholder="Host Name"
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
          <div className="flex w-full items-center">
            <select
              className="mt-1 w-full rounded-lg bg-[#FFFFFFCC] p-3 font-medium text-black outline-none"
              name=""
              id=""
              value={chain}
              onChange={(e) => setChain(e.target.value)}
            >
              <option className="text-[#0000003e]" value="">
                --Select a chain--
              </option>
              <option value="Ethereum">Ethereum sepolia</option>
              <option value="Arbitrum">Arbitrum sepolia</option>
              <option value="Optimism">Optimism sepolia</option>
            </select>

            <div
              className="cursor-default"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Hello world!"
            >
              <WarningCircle size={20} />
            </div>
            <Tooltip
              id="my-tooltip"
              render={() => (
                <div className="w-[300px] text-center">
                  <h1 className="text-lg font-bold">Useful tip</h1>
                  <p>
                    While attendees can buy your ticket with any chain token
                    they wish, event hosts have the option of choosing the chain
                    they wish to receive all their ticket sales fund.
                  </p>
                </div>
              )}
            />
          </div>

          <Button
            loading={loading}
            onClick={handleCreateEvent}
            disabled={
              eventName === "" ||
              location === "" ||
              startDate === null ||
              endDate === null ||
              description === "" ||
              creator === "" ||
              tz === "" ||
              chain === "" ||
              value === null ||
              loading
            }
            className="mt-4 w-full disabled:bg-[#ffffff6f] disabled:text-[#000000b0]"
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

// 0x0c9bB8849Dc2c2ED63662ff846f6760554b03BAA

export default CreateEvent;
