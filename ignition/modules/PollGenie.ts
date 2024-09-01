import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PollGenieModule = buildModule("PollGenieModule", (m) => {
  const pollGenie = m.contract("PollGenie", [], {});

  return { pollGenie };
});

export default PollGenieModule;
