//

import React from "react";

function EventCard() {
  return (
    <div className="w-[700px] justify-between items-start m-auto flex">
      <div>
        <p className="font-medium">06</p>
        <p className="font-medium text-[26px]">Monday</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[12px] h-[12px] bg-white rounded-full"></div>
        <div className="h-[206px] border-dashed border-r w-[2px] border-white mt-2"></div>
      </div>
      <div className="group w-[420px] hover:bg-[#6637ED] bg-white p-3 rounded-xl hover:text-white text-black flex justify-between">
        <div className="flex flex-col items-start">
          <p className="font-medium">17:00</p>
          <p className="font-medium text-[26px]">Virtual Tour</p>
          <p className="font-medium">02 Arena</p>
          <div className="flex items-center gap-2 mt-3">
            <img
              src="/images/events.png"
              className="h-[18px] w-[18px] rounded-full"
              alt=""
            />
            <p className="text-sm font-medium">By Block</p>
          </div>
          <div
            className={
              "group-hover:bg-white group-hover:text-black bg-black text-white text-[12px] mt-3 w-auto p-1 rounded-md font-medium"
            }
          >
            Invited
          </div>
        </div>
        <img
          src="/images/events.png"
          className="w-[148px] h-[148px] rounded-xl"
          alt=""
        />
      </div>
    </div>
  );
}

export default EventCard;
