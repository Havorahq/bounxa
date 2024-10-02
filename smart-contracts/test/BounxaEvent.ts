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
    async function deployBounxaEvent() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const BounxaEvent = await hre.ethers.getContractFactory("BounxaEvent");
      const bounxaEvent = await BounxaEvent.deploy(
        "public",
        1234,
        4321,
        "behind the bleachers",
        "the best concert you will ever experience",
        "https://bouxa.com/imgdoesnotexist",
        "bounxa flagship event",
        100,
        1000,
        435458,
        owner.address
      );
  
      return { bounxaEvent, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Should have the right value for ticket price", async function () {
        const { bounxaEvent } = await loadFixture(deployBounxaEvent);
  
        expect(await bounxaEvent.ticketPrice()).to.equal(100);
        expect(await bounxaEvent.isActive()).to.equal(true);
      });
    });

    describe("Ticket Buying", function () {
        it("the number of remaining tickets should be less than the number of available tickets by the value purchased", async function () {
          const { bounxaEvent, otherAccount } = await loadFixture(deployBounxaEvent);
          await bounxaEvent.connect(otherAccount).buyTickets(2, {value: 200});
    
          expect(await bounxaEvent.ticketsRemaining()).to.be.below(await bounxaEvent.ticketQuantity());
        });
      });
  });
  