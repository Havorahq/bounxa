// import Image from "next/image";
"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { CalendarDots, Plus } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="flex flex-col background-image-div">
      <Header />
      <Nav />
      <div className="grow flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <CalendarDots size={60} />
          <h1 className="font-medium text-[32px] mt-5">No Upcoming Event</h1>
          <p className="font-medium mt-1">
            You have no upcoming events. Why not host one?
          </p>
          <Button
            className="mt-5"
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
