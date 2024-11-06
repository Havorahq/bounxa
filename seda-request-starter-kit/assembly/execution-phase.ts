import {
  Bytes,
  Console,
  Process,
  httpFetch,
} from "@seda-protocol/as-sdk/assembly";

@json
class ValidationResponse {
  status!: string;
  message!: string;
  result!: string;
}


export function executionPhase(): void {
  const drInputsRaw = Process.getInputs().toUtf8String();
  const drInputs = drInputsRaw.split("-");
  const chainId = (drInputs[0]);
  const transaction_hash = (drInputs[1]);

  Console.log(`Validate Ticket Purchase Transaction`);

  const response = httpFetch(
    `https://api.etherscan.io/v2/api?chainid=${chainId}&module=transaction&action=gettxreceiptstatus&txhash=${transaction_hash}&apikey=822QHPBSUW9A1MJQYDEAQA56T8G1SBVXRG`
  );

  if (!response.ok) {
    Console.error(
      `HTTP Response was rejected: ${response.status.toString()} - ${response.bytes.toUtf8String()}`
    );
    Process.error(Bytes.fromUtf8String("Error while fetching price feed"));
  }

  const data = response.bytes.toJSON<ValidationResponse>();
  if (data.message != 'OK') {
    Process.error(Bytes.fromUtf8String('This Ticket is not Valid'));
  } else
    Process.success(Bytes.fromUtf8String('This Ticket is  Valid'));
}