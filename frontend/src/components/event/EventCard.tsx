/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
//

import React from "react";
import date from "date-and-time";
import { truncateString } from "@/utils/function.helper";

function EventCard({ data }: any) {
  const dateFormat = new Date(data?.start_date);
  return (
    <div className="m-auto flex w-[90%] flex-col items-start justify-between gap-3 phone:w-[400px] sm:w-[600px] sm:flex-row sm:gap-0 md:w-[700px]">
      <div className="sm:w-[100px]">
        <p className="font-medium">{date.format(dateFormat, "DD")}</p>
        <p className="text-[26px] font-medium">
          {date.format(dateFormat, "dddd")}
        </p>
      </div>
      <div className="hidden flex-col items-center sm:flex">
        <div className="h-[12px] w-[12px] rounded-full bg-white"></div>
        <div className="mt-2 h-[206px] w-[2px] border-r border-dashed border-white"></div>
      </div>
      <div className="group flex w-full justify-between rounded-xl bg-white p-3 text-black hover:bg-[#6637ED] hover:text-white phone:w-[420px]">
        <div className="flex flex-col items-start">
          <p className="text-xs font-medium phone:text-base">
            {date.format(dateFormat, "hh:mm")}
          </p>
          <p className="text-lg font-medium phone:text-2xl">
            {truncateString(data.name, 9)}
          </p>
          <p className="text-sm font-medium phone:text-base">{data.location}</p>
          <div className="mt-3 flex items-center gap-2">
            <img
              src="/images/events.png"
              className="h-[18px] w-[18px] rounded-full"
              alt=""
            />
            <p className="text-sm font-medium capitalize">{data.host_name}</p>
          </div>
          <div
            className={
              "mt-3 w-auto rounded-md bg-black p-1 text-[12px] font-medium text-white group-hover:bg-white group-hover:text-black"
            }
          >
            View event
          </div>
        </div>
        <img
          src="/images/events.png"
          className="h-[148px] w-[148px] rounded-xl"
          alt=""
        />
      </div>
    </div>
  );
}

export default EventCard;
