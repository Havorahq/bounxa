//

import AuthParent from "@/components/auth/AuthParent";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function Signup() {
  return (
    <main>
      <AuthParent>
        <div className="h-full flex flex-col w-[353px] items-center justify-center">
          <h1 className="text-4xl font-bold">Get Started</h1>
          <p className="mt-1">Connect wallet to create an account</p>
          <div className="h-[0.1px] w-full opacity-40 my-6 bg-white"></div>
          <p className="text-center">
            Connect wallet to start creating events and open a wide range of
            possibilities.
          </p>
          <Button text={"Connect Wallet"} className="mt-5 w-full" />
          <div className="flex items-center gap-1 mt-10">
            <p>Need to create an account?</p>
            <Link href={"/login"} className="font-medium">
              Login
            </Link>
          </div>
        </div>
      </AuthParent>
    </main>
  );
}

export default Signup;
