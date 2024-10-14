"use client";
import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isConnected && protectedRoutes.includes(currentPath)) {
      router.push("/login");
    } else if (isConnected && currentPath === "/login") {
      setIsLoading(true);

      router.push("/home");
    }
  }, [currentPath, isConnected, router]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
