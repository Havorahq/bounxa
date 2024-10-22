import {
  Signer,
  buildSigningConfig,
  postAndAwaitDataRequest,
} from "@seda-protocol/dev-tools";

function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.ORACLE_PROGRAM_ID) {
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
    const body = await req.json(); // Parse the JSON body

    const { token } = body;

    const signingConfig = buildSigningConfig({});
    const signer = await Signer.fromPartial(signingConfig);

    const result = await postAndAwaitDataRequest(
      signer,
      {
        consensusOptions: {
          method: "none",
        },
        oracleProgramId: process.env.ORACLE_PROGRAM_ID,
        // drInputs: Buffer.from(pair),
        drInputs: Buffer.from(token),
        tallyInputs: Buffer.from([]),
        memo: Buffer.from(new Date().toISOString()),
      },
      {},
    );

    if (result) {
      const resultHex = result.result;
      const resultDecimal = hexToDecimal(resultHex);

      return new Response(
        JSON.stringify({ result, decimalResult: resultDecimal / 1000000 }),
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
