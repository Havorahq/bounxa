import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    // for testnet
    'bnb': {
      url: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      accounts: ['0x94408cb11d639ad62a0100ee08d8d025a9eee8ebf402823cf489233d67057093'],
      gasPrice: 1000000000,
    },
    'sepolia': {
      url: 'https://eth-sepolia.g.alchemy.com/v2/qokf832tk1LMYpfbOwozWXwmpfTfJ9FI',
      accounts: ['0x94408cb11d639ad62a0100ee08d8d025a9eee8ebf402823cf489233d67057093'],
      gasPrice: 1000000000,
    },
    'artbitrum-sepolia': {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      accounts: ['0x94408cb11d639ad62a0100ee08d8d025a9eee8ebf402823cf489233d67057093'],
      gasPrice: 1000000000,
    },
  },
};

export default config;
