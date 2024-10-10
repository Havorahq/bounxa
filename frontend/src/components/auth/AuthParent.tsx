/* eslint-disable @next/next/no-img-element */
//

import React, { ReactNode } from "react";

function AuthParent({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-between gap-3 p-6">
        <section className="relative hidden h-full w-7/12 md:block">
          <div className="absolute bottom-12 left-10">
            <h1 className="text-[40px] font-bold leading-[66px] tablet:w-[400px] tablet:text-[50px] lg:w-[518px] lg:text-[64px]">
              Event Hosting On The Blockchain
            </h1>
            <div className="mt-12 flex gap-1">
              <div className="h-[6px] w-10 rounded-[64px] bg-white"></div>
              <div className="h-[6px] w-5 rounded-[64px] bg-white"></div>
              <div className="h-[6px] w-5 rounded-[64px] bg-white"></div>
            </div>
          </div>
          <img
            src="/images/frame.png"
            className="h-full w-full rounded-[19px] object-cover"
            alt=""
          />
        </section>
        <section className="m-auto flex h-screen w-[95%] items-center justify-center phone:w-[450px] md:m-0 md:w-5/12">
          {children}
        </section>
      </div>
    </div>
  );
}

export default AuthParent;
