//

import AuthParent from "@/components/auth/AuthParent";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function Signup() {
  return (
    <main>
      <AuthParent>
        <div className="flex h-full w-[353px] flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Get Started</h1>
          <p className="mt-1">Connect wallet to create an account</p>
          <div className="my-6 h-[0.1px] w-full bg-white opacity-40"></div>
          <p className="text-center">
            Connect wallet to start creating events and open a wide range of
            possibilities.
          </p>
          <Button text={"Connect Wallet"} className="mt-5 w-full" />
          <div className="mt-10 flex items-center gap-1">
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
