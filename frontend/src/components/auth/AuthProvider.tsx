"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "@particle-network/connectkit";

interface AuthProviderProps {
  children: React.ReactNode;
}

const protectedRoutes = ["/home", "create-event", "calendar"];

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && protectedRoutes.includes(currentPath)) {
      router.push("/login");
    } else if (isConnected && currentPath === "/login") {
      router.push("/home");
    }
  }, [currentPath, isConnected, router]);

  return <>{children}</>;
};

export default AuthProvider;
