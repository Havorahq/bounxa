//
"use client";
import React, { useState } from "react";

function Header({ auth = false }: { auth?: boolean }) {
  const [show, setShow] = useState("upcoming");
  return (
    <header className="m-auto flex w-[90%] justify-between py-8 tablet:w-[800px]">
      <h1 className="text-2xl font-medium sm:text-3xl">Events</h1>
      {auth ? (
        <div className="flex items-center gap-4">
          <div className="font-medium sm:text-xl">John Paul</div>
          <div className="h-[40px] w-[40px] rounded-full bg-white font-medium sm:h-[50px] sm:w-[50px]"></div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div
            onClick={() => setShow("upcoming")}
            className={`${show === "upcoming" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            Upcoming
          </div>
          <div
            onClick={() => setShow("past")}
            className={`${show === "past" ? "bg-white text-black" : ""} cursor-pointer rounded-[36px] px-5 py-1 font-medium`}
          >
            Past
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
