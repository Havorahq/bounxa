"use client";

import React from "react";
import AuthProvider from "@/components/auth/AuthProvider";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ClientWrapper;
