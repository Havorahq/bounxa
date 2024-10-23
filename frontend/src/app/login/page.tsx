"use client";
import AuthParent from "@/components/auth/AuthParent";
import Button from "@/components/Button";
import React, { useEffect } from "react";
import {
  ConnectButton,
  useAccount,
  useDisconnect,
} from "@particle-network/connectkit";
import { createUser } from "../api/helper-function";

function Login() {
  const { address, isConnected, chainId } = useAccount();

  useEffect(() => {
    const handleUserCreation = async () => {
      // console.log({ data });
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

  const { disconnect } = useDisconnect();
  return (
    <main>
      <AuthParent>
        <div className="m-auto flex h-full w-[353px] flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome 👋🏼</h1>
          <p className="mt-1">Please Connect your Wallet</p>
          <div className="my-6 h-[0.1px] w-full bg-white opacity-40"> </div>
          <p className="text-center">
            You will be signed up if you don’t have an account
          </p>
          <div className="mt-10">
            {isConnected ? (
              <>
                <h2>Address: {address}</h2>
                <h2>Chain ID: {chainId}</h2>
                {/* <button onClick={() => disconnect()}>Disconnect</button> */}
                <Button
                  onClick={() => disconnect()}
                  text={"Disconnect"}
                  className="mt-5 w-full"
                />
              </>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      </AuthParent>
    </main>
  );
}

export default Login;
