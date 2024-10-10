import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    // for testnet
    'bnb': {
      url: 'https://bsc-testnet.infura.io/v3/3c63ab1bf9684ad9b4c1a78b18d3a70d',
      accounts: [''],
      gasPrice: 1000000000,
    },
  },
};

export default config;
