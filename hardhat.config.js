require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

let secret = require("./secret");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + secret.infuraApiKey,
      accounts: [secret.accountPrivateKey],
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + secret.infuraApiKey,
      accounts: [secret.accountPrivateKey],
      allowUnlimitedContractSize: true
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + secret.infuraApiKey,
      accounts: [secret.accountPrivateKey],
      allowUnlimitedContractSize: true
    }
  },
  etherscan: {
    apiKey: secret.etherscanApiKey
  }
};