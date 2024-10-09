import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    // for testnet
    'bnb': {
      url: 'https://bsc-testnet.infura.io/v3/3c63ab1bf9684ad9b4c1a78b18d3a70d',
      accounts: ['94408cb11d639ad62a0100ee08d8d025a9eee8ebf402823cf489233d67057093'],
      gasPrice: 1000000000,
    },
  },
};

export default config;
