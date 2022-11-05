import algosdk from "algosdk";
import * as bkr from "beaker-ts";
import { createRequire } from "module";
import { Tokpock } from "./beaker/tokpock_client";

const require = createRequire(import.meta.url);

var sha512_256 = require("js-sha512").sha512_256;

async function run() {
  const acct = (await bkr.sandbox.getAccounts())[0];
  const acct2 = (await bkr.sandbox.getAccounts())[1];
  const acct3 = (await bkr.sandbox.getAccounts())[2];
  if (acct === undefined) return;
  if (acct2 === undefined) return;
  if (acct3 === undefined) return;

  const appClient = new Tokpock({
    client: bkr.clients.sandboxAlgod(),
    signer: acct.signer,
    sender: acct.addr,
  });

  //----------------------------------------------------------------------------------
  // Create App
  const { appId, appAddress, txId } = await appClient.create();
  console.log(`Created app ${appId} with address ${appAddress} in tx ${txId}`);

  //----------------------------------------------------------------------------------
  // Set Initialize wallet
  const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    suggestedParams: await bkr.clients
      .sandboxAlgod()
      .getTransactionParams()
      .do(),
    amount: 400_000,
    from: acct.addr,
    to: algosdk.getApplicationAddress(appId),
  });

  const password_hash = sha512_256.array("myPassworDE");

  await appClient.init_wallet({
    payment,
    manager: acct2.addr,
    account_name: "tomi's wallet",
    password_hash,
  });
  console.log("initialized the wallet");

  //----------------------------------------------------------------------------------
  // Claim funds
  const appClient2 = new Tokpock({
    client: bkr.clients.sandboxAlgod(),
    signer: acct2.signer,
    sender: acct2.addr,
    appId,
  });

  await appClient2.claim_funds(
    {
      password: "myPassworDE",
      account: acct3.addr,
    },
    {
      appAccounts: [acct3.addr],
    }
  );

  console.log(acct3.addr);

  // set new manager
  setTimeout(async () => {
    await appClient.set_manager({
      new_manager: acct.addr,
    });
  }, 10000);
}

await run();

function getInt64Bytes(x: number) {
  let y = Math.floor(x / 2 ** 32);
  let a;
  a = [y, y << 8, y << 16, y << 24, x, x << 8, x << 16, x << 24].map(
    (z) => z >>> 24
  );
  return a as unknown as Uint8Array;
}
