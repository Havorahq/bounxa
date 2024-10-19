import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    // for testnet
    'bnb': {
      url: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      accounts: [''],
      gasPrice: 1000000000,
    },
    'sepolia': {
      url: 'https://eth-sepolia.g.alchemy.com/v2/qokf832tk1LMYpfbOwozWXwmpfTfJ9FI',
      accounts: [''],
      gasPrice: 1000000000,
    },
  },
};

export default config;
