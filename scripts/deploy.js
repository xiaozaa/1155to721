// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const COLLECTION_SIZE = 1000;
const TOKEN_ID = 1;
const PUBLIC_TIME = 1658705139;

async function main() {
  // We get the contract to deploy
  const accounts = await hre.ethers.getSigners();
  const RedeemableToken = await hre.ethers.getContractFactory("RedeemableToken");
  const redeem = await RedeemableToken.deploy();   // uint256 maxBatchSize_, uint256 collectionSize_, uint256 amountForDevs_, uint256 amountForAllowlist_

  const REDEEM = await redeem.deployed();
  console.log("RedeemableToken deployed to:", redeem.address);

  await REDEEM.setSupply(TOKEN_ID, COLLECTION_SIZE);
  console.log("REDEEM setSupply");

  const ForgeToken = await hre.ethers.getContractFactory("ForgeToken");
  const forge = await ForgeToken.deploy(COLLECTION_SIZE, redeem.address);   // uint256 maxBatchSize_, uint256 collectionSize_, uint256 amountForDevs_, uint256 amountForAllowlist_

  const FORGE = await forge.deployed();
  console.log("ForgeToken deployed to:", forge.address);

  await FORGE.setupPublicSaleStartTime(PUBLIC_TIME);
  console.log("PUBLIC_TIME setupPublicSaleStartTime");

  await REDEEM.setForgingAddress(TOKEN_ID, forge.address);
  console.log("REDEEM setForgingAddress");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
