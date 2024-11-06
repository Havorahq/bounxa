/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
//

"use client";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Image,
  MapPinLine,
  PencilSimple,
  Plus,
  Ticket,
  // UploadSimple,
  UsersThree,
  WarningCircle,
} from "@phosphor-icons/react";
import date from "date-and-time";
import Button from "@/components/Button";
import { getSingleEvent, updateEvent } from "../../../api/helper-function";
import { useAccount } from "@particle-network/connectkit";
import EventModal from "../../../create-event/_components/EventModal";
import { toast } from "sonner";
import timezones from "timezones-list";
import "react-calendar/dist/Calendar.css";
import { resizeFile } from "@/config/resizer";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useRouter } from "next/navigation";
import { EventType } from "@/utils/dataType";
import Loader from "@/components/Loader";

function EditEvent() {
  const { address } = useAccount();
  const [showPrice, setShowPrice] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const router = useRouter();
  const { slug } = useParams();
  const eventId = slug;
  const [eventData, setEventData] = useState<EventType>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescriotion] = useState("");
  const [tz, setTz] = useState("");
  const [utc, setUtc] = useState("");
  const [creator, setCreator] = useState("");
  const [showTz, setShowtz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(true);
  const [image, setImage] = useState("");
  const [chain, setChain] = useState("");
  const [value, setValue] = useState<File | null>(null);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  // const [attendee, setAttendee] = useState([]);

  // const getAttendee = async () => {
  //   const res = await getEventAttendee(eventId as string);
  //   if (res.data) {
  //     setAttendee(res.data as never[]);
  //   }
  // };
  const getEventData = async () => {
    setEditLoading(true);
    const res = await getSingleEvent(eventId as string);
    // getAttendee();
    if (res.error) {
      toast.error(res.error, { position: "top-right" });
    }
    if (res.data) {
      setEventData(res.data[0]);
      setEditLoading(false);
    }
    setEditLoading(false);
  };

  const formData = new FormData();
  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      let res;
      if (value) {
        formData.append("formData", value!);
        res = await axios.post("/api/upload/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImage(res.data.url);
      }
      const response = await updateEvent(
        eventId as string,
        address as string,
        location,
        parseInt(capacity!),
        eventName,
        date.format(startDate!, "YYYY-MM-DDTHH:mm:ss"),
        date.format(endDate!, "YYYY-MM-DDTHH:mm:ss"),
        type,
        description,
        tz,
        creator,
        utc,
        price ? parseInt(price) : 0,
        res?.data.url ?? image,
        chain,
      );
      if (response.error) {
        toast.error(response.error, { position: "top-right" });
      }
      if (!response.error) {
        toast.success("Event updated", { position: "top-right" });
        router.push("/explore");
      }
    } catch (e: unknown) {
      // toast.error(e as ReactNode);
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

  useEffect(() => {
    if (eventData?.start_date != null) {
      setEventName(eventData?.name as string);
      setLocation(eventData?.location as string);
      setCapacity(eventData?.capacity ?? "unlimited");
      setPrice(eventData?.price?.toString() as string);
      setType(eventData?.type as string);
      setDescriotion(eventData?.description as string);
      setTz(eventData?.timezone as string);
      setUtc(eventData?.timezone_utc as string);
      setCreator(eventData?.host_name as string);
      setChain(eventData?.chain as string);
      setImage(eventData?.image_url as string);
      setStartDate(new Date(eventData.start_date!));
      setEndDate(new Date(eventData.end_date));
    }
  }, [eventData]);

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <main className="background-image-div">
      <Header />
      <Nav />
      {showPrice && (
        <EventModal
          title={"Ticket Price"}
          subTitle={"Set the price for your event (Set as $0 if free)"}
          label={"Cost"}
          value={price?.toString() as string}
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
          value={capacity!}
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
      {editLoading ? (
        <Loader />
      ) : (
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
                <img
                  src={image}
                  alt=""
                  className="m-auto h-[320px] cursor-pointer rounded-xl object-cover phone:w-[400px] tablet:h-[539px] tablet:w-[450px]"
                  onClick={handleFileSelect}
                />
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
                        selected={
                          new Date(date.format(startDate!, "YYYY/MM/DD"))
                        }
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
                        <PencilSimple
                          size={20}
                          onClick={() => setStart(false)}
                        />
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
                  <div className="relative flex grow">
                    {!end ? (
                      <DatePicker
                        selected={new Date(date.format(endDate!, "YYYY/MM/DD"))}
                        showTimeSelect
                        className="flex grow rounded-lg bg-white p-2 text-black"
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
                <p className="text-sm font-medium text-black opacity-80">
                  {utc}
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
                value={chain!}
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
                      they wish, event hosts have the option of choosing the
                      chain they wish to receive all their ticket sales fund.
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
                // value === null ||
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
      )}
    </main>
  );
}

export default EditEvent;
