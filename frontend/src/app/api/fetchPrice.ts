import type { NextApiRequest, NextApiResponse } from "next";
import {
  Signer,
  buildSigningConfig,
  postAndAwaitDataRequest,
} from "@seda-protocol/dev-tools";

function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { pair } = req.body;

  if (!process.env.ORACLE_PROGRAM_ID) {
    return res
      .status(500)
      .json({ error: "ORACLE_PROGRAM_ID not set in environment variables" });
  }

  try {
    const signingConfig = buildSigningConfig({});
    const signer = await Signer.fromPartial(signingConfig);

    const result = await postAndAwaitDataRequest(
      signer,
      {
        consensusOptions: {
          method: "none",
        },
        oracleProgramId: process.env.ORACLE_PROGRAM_ID,
        drInputs: Buffer.from(pair),
        tallyInputs: Buffer.from([]),
        memo: Buffer.from(new Date().toISOString()),
      },
      {},
    );

    const resultHex = result.result;
    const resultDecimal = hexToDecimal(resultHex);

    res.status(200).json({
      result: result,
      decimalResult: resultDecimal / 1000000,
    });
  } catch (error) {
    console.error("Error fetching price quote:", error);
    res.status(500).json({ error: "Failed to fetch price quote" });
  }
}
