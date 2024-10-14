//
"use client";
import React, { useState } from "react";
import {
  useAccount,
  useDisconnect,
  ConnectButton,
} from "@particle-network/connectkit";
import { truncateString } from "@/utils/function.helper";
import Link from "next/link";
import Button from "@/components/Button";

function Header({ auth = false }: { auth?: boolean }) {
  const [show, setShow] = useState("upcoming");
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <header className="m-auto flex w-[90%] justify-between py-8 lg:w-[1000px]">
      <h1 className="text-2xl font-medium sm:text-3xl">Events</h1>
      {auth ? (
        <div className="flex items-center gap-4">
          <div className="hidden font-medium lowercase phone:block sm:text-xl">
            {truncateString(address!, 10)}
          </div>
          <div>
            <Button
              onClick={() => disconnect()}
              text={"Disconnect"}
              className="rounded-full bg-white px-3 py-2 font-medium text-black"
            />
          </div>
          <Link
            href={"/create-event"}
            className="rounded-full bg-white px-3 py-2 font-medium text-black"
          >
            Create event
          </Link>
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
          <div>
            <ConnectButton />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
