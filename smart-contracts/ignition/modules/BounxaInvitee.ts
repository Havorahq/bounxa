import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BounxaInviteeModule = buildModule("BounxaInvitee", (m) => {

  const bounxaInvitee = m.contract("BounxaInvitee");

  return { bounxaInvitee: bounxaInvitee };
});

export default BounxaInviteeModule;