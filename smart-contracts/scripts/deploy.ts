import { ethers } from 'hardhat';

async function main() {
  const bounxaEventFactory = await ethers.deployContract('BounxaEventFactory');

  await bounxaEventFactory.waitForDeployment();

  console.log('factory Contract Deployed at ' + bounxaEventFactory.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});