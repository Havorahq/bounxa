//

import React from "react";
import Button from "../Button";
import { CalendarDots, Plus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

function EmptyState() {
  const router = useRouter();
  return (
    <div className="mt-20 flex grow items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/icons/desk_calendar.svg" alt="" />
        <h1 className="mt-5 text-[32px] font-medium">No Upcoming Event</h1>
        <p className="mt-1 text-center font-medium">
          You have no upcoming events. Why not host one?
        </p>
        <Button
          className="mt-5"
          onClick={() => router.push("/create-event")}
          text={
            <div className="flex items-center gap-2">
              <Plus />
              <p>Create Event</p>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default EmptyState;
