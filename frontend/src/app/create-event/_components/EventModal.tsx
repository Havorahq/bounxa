/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
//
"use client";
import Button from "@/components/Button";
import React, { ReactNode, useEffect, useRef } from "react";

type ModalType = {
  title: string;
  subTitle: string;
  label: string;
  value: string;
  close: () => void;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  money?: boolean;
  icon: ReactNode;
  placeHolder: string;
  btn?: ReactNode;
};

function EventModal({
  title,
  subTitle,
  label,
  value,
  close,
  setValue,
  money = false,
  icon,
  placeHolder,
  btn,
}: ModalType) {
  const ref: any = useRef(null);

  useEffect(() => {
    const closeModal = (e: any) => {
      if (!ref!.current!.contains(e.target)) {
        close();
      }
    };
    if (typeof window === "object") {
      document.addEventListener("mousedown", closeModal);
    }
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className="min-h-[377px] w-[95%] rounded-2xl bg-white p-5 text-black phone:w-[340px]"
        ref={ref!}
      >
        <img src="/icons/movie-tickets.svg" alt="" />
        <h1 className="mt-5 text-xl font-medium">{title}</h1>
        <p className="mt-2 font-medium text-[#00000099]">{subTitle}</p>
        <p className="mt-4 font-medium">{label}</p>
        <div className="mt-1 flex items-center gap-3 rounded-lg border border-[#00000033] p-2 font-medium">
          <div className="text-xl">{icon}</div>

          <div className="flex items-center">
            {money && <p>$</p>}
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              name=""
              id=""
              placeholder={placeHolder}
              onChange={setValue}
              value={value}
            />
          </div>
        </div>
        {btn ? (
          btn
        ) : (
          <Button
            text={"Set Ticket Price"}
            className="mt-5 w-full !bg-black text-white"
            onClick={close}
          />
        )}
      </div>
    </div>
  );
}

export default EventModal;
