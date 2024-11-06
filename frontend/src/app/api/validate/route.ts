/* eslint-disable @typescript-eslint/no-require-imports */
import {
  Signer,
  buildSigningConfig,
  postAndAwaitDataRequest,
} from "@seda-protocol/dev-tools";

require('dotenv').config()
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body)

    const params = body;
    const { chain, transaction_hash } = params
    console.log({ chain, transaction_hash })

    const signingConfig = buildSigningConfig({});
    const signer = await Signer.fromPartial(signingConfig);

    const result = await postAndAwaitDataRequest(
      signer,
      {
        consensusOptions: {
          method: "none",
        },
        oracleProgramId: '3fae5c7063ae93bbba37efd4928208ffca490818db865d6fb0cf1b434f0a150e',
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
      JSON.stringify({ error }),
      { status: 500 },
    );
  }
}
