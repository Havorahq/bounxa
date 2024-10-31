/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @next/next/no-img-element */
//

import React from "react";
import Button from "../Button";
import { Plus } from "@phosphor-icons/react";

// import Image from "next/image";

function EmptyState({
  title,
  subtitle,
  onClick,
  btnText,
}: {
  title: string;
  subtitle: string;
  onClick?: () => void;
  btnText: string;
}) {
  return (
    <div className="mt-20 flex grow items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/icons/desk_calendar.svg" alt="" className="h-10" />
        <h1 className="mt-5 text-[25px] font-medium phone:text-[32px]">
          {title}
        </h1>
        <p className="mt-1 text-center font-medium">{subtitle}</p>
        <Button
          className="mt-5"
          onClick={onClick}
          text={
            <div className="flex items-center gap-2">
              <Plus />
              <p>{btnText}</p>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default EmptyState;
