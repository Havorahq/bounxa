import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BounzaEventFactoryModule = buildModule("BounxaEventFactory", (m) => {

  const bounxaEventFactory = m.contract("BounxaEventFactory");

  return { bounxaEventFactory: bounxaEventFactory };
});

export default BounzaEventFactoryModule;