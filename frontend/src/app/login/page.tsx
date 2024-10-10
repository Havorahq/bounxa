"use client";
import AuthParent from "@/components/auth/AuthParent";
// import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import { ConnectButton, useAccount } from "@particle-network/connectkit";

function Login() {
  const { address, isConnected, chainId } = useAccount();
  return (
    <main>
      <AuthParent>
        <div className="m-auto flex h-full w-[353px] flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome 👋🏼</h1>
          <p className="mt-1">Please Login to your account</p>
          <div className="my-6 h-[0.1px] w-full bg-white opacity-40"> </div>
          <p className="text-center">
            You will be redirected to the sign up page if you don’t have an
            account
          </p>
          <div className="mt-10">
            {isConnected ? (
              <>
                <h2>Address: {address}</h2>
                <h2>Chain ID: {chainId}</h2>
              </>
            ) : (
              <ConnectButton />
            )}
          </div>
          {/* <Button text={"Connect Wallet"} className="mt-5 w-full" /> */}
          <div className="mt-10 flex items-center gap-1">
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
