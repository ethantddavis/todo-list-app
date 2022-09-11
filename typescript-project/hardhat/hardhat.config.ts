import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    goreli: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIV_KEY]
    },

  }
};

export default config;
