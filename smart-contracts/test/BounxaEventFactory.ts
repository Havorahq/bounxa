import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("BounxaEvent", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBounxaEventFactory() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const BounxaEventFactory = await hre.ethers.getContractFactory("BounxaEventFactory");
      const bounxaEventFactory = await BounxaEventFactory.deploy();
  
      return { bounxaEventFactory, owner, otherAccount };
    }
  
    describe("Factory Deployment", function () {
      it("Should deploy a bounxa event successfully", async function () {
        const { bounxaEventFactory, otherAccount, owner } = await loadFixture(deployBounxaEventFactory);
        const initialEventCount = await bounxaEventFactory.eventCount();
        const creationResponce = await bounxaEventFactory.connect(otherAccount).createBounxaEvent(
            "bounxa flagship event",
            100,
            1000,
            '0xeb40Cea52D7D78AEab0b5D858Af0F5076809A2fA'
        )
        // console.log(creationResponce, 'the creation responce')
        expect(await bounxaEventFactory.eventCount()).to.be.above(initialEventCount);
      });
    });
  });
  