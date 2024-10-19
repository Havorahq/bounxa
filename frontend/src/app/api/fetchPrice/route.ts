
import {
  Signer,
  buildSigningConfig,
  postAndAwaitDataRequest,
} from "@seda-protocol/dev-tools";

function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}

export const dynamic = 'force-dynamic'

export async function POST() {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method Not Allowed" });
  // }

  // const { pair } = await req.json();

  if (!process.env.ORACLE_PROGRAM_ID) {
    return new Response(JSON.stringify({ error: "ORACLE_PROGRAM_ID not set in environment variables" }), {
      status: 500
    })
    // .status(500)
    // .json({ error: "ORACLE_PROGRAM_ID not set in environment variables" });
  }


  try {
    console.log("I am here 1")
    const signingConfig = buildSigningConfig({});
    const signer = await Signer.fromPartial(signingConfig);
    console.log(signingConfig)
    console.log(signer)

    const result = await postAndAwaitDataRequest(
      signer,
      {
        consensusOptions: {
          method: "none",
        },
        oracleProgramId: process.env.ORACLE_PROGRAM_ID,
        // drInputs: Buffer.from(pair),
        drInputs: Buffer.from("btc-usdc"),
        tallyInputs: Buffer.from([]),
        memo: Buffer.from(new Date().toISOString()),
      },
      {},
    );

    console.log({ result })

    console.log("I am here 2")


    if (result) {
      const resultHex = result.result;
      const resultDecimal = hexToDecimal(resultHex);
      console.log("I am here 2")
      return new Response(JSON.stringify({ result, decimalResult: resultDecimal / 1000000, }), {
        status: 201
      })
    }


    // .status(200).json({
    //   result: result,
    //   decimalResult: resultDecimal / 1000000,
    // });

  } catch (error) {
    console.error("Error fetching price quote:", error);
    // res.status(500).json({ error: "Failed to fetch price quote" });
    return new Response(JSON.stringify({ error: "Failed to fetch price quote" }), { status: 500 })
  }
}
