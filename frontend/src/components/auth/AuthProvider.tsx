"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "@particle-network/connectkit";

interface AuthProviderProps {
  children: React.ReactNode;
}

const protectedRoutes = ["/create-event", "/analytics", "/event"];

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isConnected } = useAccount();
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      !isConnected &&
      protectedRoutes.some((routes) => currentPath.startsWith(routes))
    ) {
      router.push("/login");
    } else if (isConnected && currentPath === "/login") {
      router.push("/explore");
    }
  }, [currentPath, isConnected, router]);

  return <>{children}</>;
};

export default AuthProvider;
