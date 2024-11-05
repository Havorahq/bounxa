/* eslint-disable @typescript-eslint/no-require-imports */
import {
  Signer,
  buildSigningConfig,
  postAndAwaitDataRequest,
} from "@seda-protocol/dev-tools";

require('dotenv').config()
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_ORACLE_PROGRAM_ID) {
    return new Response(
      JSON.stringify({
        error: "ORACLE_PROGRAM_ID not set in environment variables",
      }),
      {
        status: 500,
      },
    );
  }

  try {
    const body = await req.json();
    console.log(body)

    const params = body;
    const { chain, transaction_hash } = params

    const signingConfig = buildSigningConfig({});
    const signer = await Signer.fromPartial(signingConfig);

    const result = await postAndAwaitDataRequest(
      signer,
      {
        consensusOptions: {
          method: "none",
        },
        oracleProgramId: process.env.NEXT_PUBLIC_ORACLE_PROGRAM_ID!,
        drInputs: Buffer.from(`${chain}-${transaction_hash}`),
        tallyInputs: Buffer.from([]),
        memo: Buffer.from(new Date().toISOString()),
      },
      {},
    );

    if (result) {

      return new Response(
        JSON.stringify({ result }),
        {
          status: 201,
        },
      );
    }
  } catch (error) {
    console.error("Error fetching price quote:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch price quote" }),
      { status: 500 },
    );
  }
}
