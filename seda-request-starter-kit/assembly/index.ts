import { executionPhase } from "./execution-phase";
import { OracleProgram } from "@seda-protocol/as-sdk/assembly";


class PriceFeed extends OracleProgram {
  execution(): void {
    executionPhase();
  }

  tally(): void {

  }
}

new PriceFeed().run();
