//

import React from "react";

function EventsCard2() {
  return (
    <div className="flex w-[320px] flex-col items-start gap-3">
      <div>
        <p className="font-medium">06</p>
        <p className="text-[26px] font-medium">Monday</p>
      </div>
      <div className="group flex w-full justify-between rounded-xl bg-white p-3 text-black hover:bg-[#6637ED] hover:text-white">
        <div className="flex flex-col items-start">
          <p className="text-xs font-medium phone:text-base">17:00</p>
          <p className="text-lg font-medium phone:text-2xl">Virtual Tour</p>
          <p className="text-sm font-medium phone:text-base">02 Arena</p>
          <div className="mt-3 flex items-center gap-2">
            <img
              src="/images/events.png"
              className="h-[18px] w-[18px] rounded-full"
              alt=""
            />
            <p className="text-sm font-medium">By Block</p>
          </div>
          <div
            className={
              "mt-3 w-auto rounded-md bg-black p-1 text-[12px] font-medium text-white group-hover:bg-white group-hover:text-black"
            }
          >
            Invited
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

export default EventsCard2;
