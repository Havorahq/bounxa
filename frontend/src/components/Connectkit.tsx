"use client";

import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { aa } from "@particle-network/connectkit/aa";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import {
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  linea,
  lineaSepolia,
  polygon,
  polygonAmoy,
  solana,
  solanaTestnet,
} from "@particle-network/connectkit/chains";
import {
  evmWalletConnectors,
  passkeySmartWallet,
} from "@particle-network/connectkit/evm";
import { solanaWalletConnectors } from "@particle-network/connectkit/solana";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";
import React from "react";

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  appearance: {
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "coinbaseWallet", label: "Popular" },
    ],
    splitEmailAndPhone: false,
    collapseWalletList: false,
    hideContinueButton: false,
    connectorsOrder: ["email", "phone", "social", "wallet"],
    language: "en-US",
    mode: "light",
    theme: {
      "--pcm-accent-color": "#ff4d4f",
    },
    filterCountryCallingCode: (countries) => {
      return countries.filter((item) => item === "US");
    },
  },
  walletConnectors: [
    evmWalletConnectors({
      metadata: { name: "My App", icon: "", description: "", url: "" },
      walletConnectProjectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      connectorFns: [passkeySmartWallet()],
    }),
    authWalletConnectors({
      authTypes: ["email", "google", "apple", "twitter", "github"],
      fiatCoin: "USD",
      promptSettingConfig: {
        promptMasterPasswordSettingWhenLogin: 1,
        promptPaymentPasswordSettingWhenSign: 1,
      },
    }),
    solanaWalletConnectors(),
  ],
  plugins: [
    aa({
      name: "BICONOMY",
      version: "2.0.0",
    }),
    wallet({
      entryPosition: EntryPosition.BR,
      visible: true,
    }),
  ],
  chains: [
    mainnet,
    sepolia,
    bsc,
    bscTestnet,
    linea,
    lineaSepolia,
    polygon,
    polygonAmoy,
    solana,
    solanaTestnet,
  ],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
