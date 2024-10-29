//
"use client";
import {
  HouseSimple,
  CalendarBlank,
  Compass,
  Plus,
} from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import Marquee from "./Marque";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useKlater } from "@/app/hooks/kaster/useKlasterTransaction";

function Nav() {
  const pathName = usePathname();
  const active = twMerge(
    "border-[#E0E0E0] border-2 rounded-full bg-[#e0e0e065] text-black",
  );
  const notActive = twMerge("text-[#7D7D7D]");
  const { klasterAddress } = useKlater();

  const navLinks = [
    {
      path: "/home",
      icon: <HouseSimple />,
      active: pathName === "/home",
      name: "Home",
      title: "Events",
    },
    {
      path: "/calendar",
      icon: <CalendarBlank />,
      active: pathName === "/calendar",
      name: "Calendar",
      title: "Events Calendar",
    },
    {
      path: "/explore",
      icon: <Compass />,
      active: pathName === "/explore",
      name: "Explore",
      title: "Explore events",
    },
    {
      path: "/create-event",
      icon: <Plus />,
      active: pathName === "/create-event",
      name: "Create",
      title: "Create event",
    },
  ];

  return (
    <>
      <nav className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-[48px] border-2 border-[#E0E0E0] bg-[#FAFAFA] px-1 py-1 sm:bottom-auto sm:left-4 sm:top-1/2 sm:w-[48px] sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:px-0">
        {navLinks.map((obj, index: number) => (
          <Link
            key={index}
            href={obj.path}
            className={`${obj.active ? active : notActive} p-2 text-xl`}
            title={obj.title}
          >
            <div className="flex items-center gap-1">
              {obj.icon}
              {obj.active && (
                <p className="text-sm font-medium sm:hidden">{obj.name}</p>
              )}
            </div>
          </Link>
        ))}
      </nav>
      {klasterAddress && (
        <Marquee>
          <span className="mx-4 text-red-500">
            To top up and use Account Abstraction
          </span>
          <span className="mx-4 text-orange-500">
            fund your Klaster wallet:
          </span>
          <span className="mx-4 text-yellow-500">{klasterAddress}</span>
          <span className="mx-4 text-green-500">{klasterAddress}</span>
          <span className="mx-4 text-blue-500">{klasterAddress}</span>
          <span className="mx-4 text-indigo-500">{klasterAddress}</span>
        </Marquee>
      )}
    </>
  );
}

export default Nav;
