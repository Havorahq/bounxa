"use client";
import AuthParent from "@/components/auth/AuthParent";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect } from "react";
import { ConnectButton, useAccount, useDisconnect } from "@particle-network/connectkit";
import { createUser } from "../api/helper-function";
import { useKlater } from "../hooks/kaster/useKlasterTransaction";

function Login() {
  const { address, isConnected, chainId } = useAccount();
  const {initialiseKlaster, initiateKlasterTransaction} = useKlater()

  useEffect(() => {
    const handleUserCreation = async () => {
      if (address) {
        try {
          const { data, error } = await createUser(address);
          console.log({ data, error });
          // Handle the result here
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };

    handleUserCreation();
  }, [address]);


  const {disconnect} = useDisconnect();
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
                {/* <button onClick={() => disconnect()}>Disconnect</button> */}
                <Button onClick={
                  // () => disconnect()
                  ()=>initialiseKlaster()
                } text={"Disconnect"} className="mt-5 w-full" />
              </>
            ) : (
              <ConnectButton />
            )}
          </div>
          <Button text={"do transaction"} className="mt-5 w-full"
            onClick={()=>{
              initiateKlasterTransaction(1)
            }}
          />
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
