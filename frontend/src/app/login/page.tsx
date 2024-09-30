//

import AuthParent from "@/components/auth/AuthParent";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <main>
      <AuthParent>
        <div className="h-full flex flex-col w-[353px] items-center m-auto justify-center">
          <h1 className="text-4xl font-bold">Welcome 👋🏼</h1>
          <p className="mt-1">Please Login to your account</p>
          <div className="h-[0.1px] w-full opacity-40 my-6 bg-white"></div>
          <p className="text-center">
            You will be redirected to the sign up page if you don’t have an
            account
          </p>
          <Button text={"Connect Wallet"} className="mt-5 w-full" />
          <div className="flex items-center gap-1 mt-10">
            <p>Need to create an account?</p>
            <Link href={"signup"} className="font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </AuthParent>
    </main>
  );
}

export default Login;
