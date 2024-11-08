/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
//
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useAccount,
  useDisconnect,
  ConnectButton,
} from "@particle-network/connectkit";
// import { truncateString } from "@/utils/function.helper";
// import Link from "next/link";
import Button from "@/components/Button";
import { useKlater } from "@/app/hooks/kaster/useKlasterTransaction";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

function Header({ showBal }: { showBal?: boolean }) {
  // const [show, setShow] = useState("upcoming");
  const [bal, setBal] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { unifiedBalance, klasterAddress } = useKlater();

  const ref: any = useRef(null);
  useEffect(() => {
    const closeModal = (e: any) => {
      if (!ref!.current!.contains(e.target)) {
        setBal(false);
      }
    };
    if (typeof window === "object") {
      document.addEventListener("mousedown", closeModal);
    }
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  useEffect(() => {
    if (showBal) {
      setBal(true);
    }
  }, [showBal]);

  const onCopy = (text: string) => {
    copy(text, {});
    toast("Address copied");
  };

  return (
    <header className="m-auto flex w-[90%] items-center justify-between py-8 lg:w-[1000px]">
      {bal && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
          <div
            className="flex w-[95%] flex-col justify-center gap-2 rounded-2xl bg-white p-7 text-black sm:w-[630px]"
            ref={ref!}
          >
            <div className="flex items-center gap-2">
              <img src="/icons/document.svg" alt="" />
              <p className="text-lg font-medium text-[#4C4C4C] phone:text-[22px]">
                Transaction Details
              </p>
            </div>

            <p className="mt-4 text-lg phone:text-xl">
              All Balance:
            </p>

            <div className="mt-3 flex items-center justify-between gap-2 phone:text-lg">
              <p className="">Ethereum sepolia: </p>
              <p className="font-medium">
                $
                {parseInt(
                  unifiedBalance?.breakdown[0].amount.toString() as string,
                ) / 1000000}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 phone:text-lg">
              <p className="">Arbitrum sepolia: </p>
              <p className="font-medium">
                $
                {parseInt(
                  unifiedBalance?.breakdown[1].amount.toString() as string,
                ) / 1000000}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 phone:text-lg">
              <p className="">Optimism sepolia: </p>
              <p>
                $
                {parseInt(
                  unifiedBalance?.breakdown[2].amount.toString() as string,
                ) / 1000000}
              </p>
            </div>

            <div className="mt-4 font-medium phone:text-lg">
              <p className="text-center text-lg font-medium phone:text-xl">
                {" "}
                Fund your Klaster wallet
              </p>
              <p className="mt-3 text-wrap break-words text-center">
                {klasterAddress}
              </p>
              <div className="flex justify-center">
                <img
                  src="/icons/copy.svg"
                  onClick={() => onCopy(klasterAddress!)}
                  alt=""
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Link href={"/"}>
        <img src="/icons/Logo.svg" alt="" className="h-8 phone:h-10" />
      </Link>

      <div className="flex items-center gap-1 phone:gap-3">
        {isConnected && (
          // <div
          //   onClick={() => setBal(true)}
          //   className="hidden cursor-pointer rounded-full border border-[#959595] px-3 py-2 font-medium lowercase phone:block sm:text-xl"
          // >
          //   View bal
          // </div>

          <Button
            onClick={() => setBal(true)}
            className="phone:!containerpy-2 !px-2 !py-1 !text-sm phone:!px-6 phone:!py-2 phone:!text-base"
            text={"View Bal"}
          />
        )}
        <div>
          {isConnected ? (
            <Button
              onClick={() => {
                disconnect();
              }}
              text={"Disconnect"}
              className="bg-white !px-2 !py-1 !text-sm font-medium text-black phone:!px-6 phone:!py-2 phone:!text-base"
            />
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
