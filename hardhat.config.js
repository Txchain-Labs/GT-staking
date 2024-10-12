require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "bscTestNet",
  networks: {
    bscTestNet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      blockGasLimit: 30000000, // whatever you want here,
      // accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.5.16",
        settings: {},
      },
    ],
  },
  //solidity: "0.8.17",
  settings: {
    optimizer: {
      //   enabled: withOptimizations,
      runs: 200,
    },
  },
  gasReporter: {
    currency: "CHF",
    enabled: false,
    gasPrice: 20,
  },
};
