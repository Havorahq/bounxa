/* eslint-disable @next/next/no-img-element */
//

import React, { ReactNode } from "react";

function AuthParent({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center p-6 h-screen justify-between w-full">
        <section className="w-7/12 h-full relative">
          <div className="absolute bottom-12 left-10">
            <h1 className="font-bold text-[64px] leading-[66px] w-[518px]">
              Event Hosting On The Blockchain
            </h1>
            <div className="flex gap-1 mt-12">
              <div className="h-[6px] w-10 rounded-[64px] bg-white"></div>
              <div className="h-[6px] w-5 rounded-[64px] bg-white"></div>
              <div className="h-[6px] w-5 rounded-[64px] bg-white"></div>
            </div>
          </div>
          <img
            src="/images/frame.png"
            className="h-full w-full object-cover rounded-[19px]"
            alt=""
          />
        </section>
        <section className="w-5/12 h-screen flex items-center justify-center">
          {children}
        </section>
      </div>
    </div>
  );
}

export default AuthParent;
