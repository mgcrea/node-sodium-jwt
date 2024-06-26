#!/usr/bin/env ts-node
import assert from "node:assert";
import sodium from "sodium-native";
import { signSync, verifySync } from "../crypto";
import type { JWTPayload } from "../types";

const [action = "help", ...args] = process.argv.slice(2);

const readStdin = async (bufferSize?: number): Promise<Buffer> => {
  return new Promise((resolve) => {
    const buffers: Buffer[] = [];
    process.stdin.on("readable", () => {
      const read = process.stdin.read();
      if (read) {
        buffers.push(read);
      }
    });
    process.stdin.on("end", () => {
      resolve(Buffer.concat(buffers, bufferSize));
    });
  });
};

const main = async () => {
  switch (action) {
    // @NOTE npx ts-node src/bin/cli.ts sign '{"sub": "1"}' '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
    case "sign": {
      assert(args[0], "Missing payload argument");
      assert(args[1], "Missing token argument");
      const payload = JSON.parse(args[0]) as JWTPayload;
      const jwt = signSync(payload, args[1]);
      console.warn("JWT successfully signed!");
      const [header, , signature] = jwt.split(".") as [string, string, string];
      console.warn({ header: Buffer.from(header, "base64url").toString("utf8"), payload, signature });
      console.log(jwt);
      break;
    }
    // @NOTE echo -n 'eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxIn0.QdubXBylKLNswV8-b44StbaNQr3SYhqwRBTMn6A6-JM' | npx ts-node src/bin/cli.ts verify '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
    case "verify": {
      assert(args[0], "Missing payload argument");
      const stdin = await readStdin();
      const result = verifySync(stdin.toString(), [args[0]]);
      if (!result) {
        console.log("JWT failed verification");
        process.exit(1);
      }
      console.warn("JWT successfully verified!");
      console.log(result);
      break;
    }
    case "generate-keypair": {
      const publicKey = Buffer.alloc(sodium.crypto_box_PUBLICKEYBYTES);
      const secretKey = Buffer.alloc(sodium.crypto_box_SECRETKEYBYTES);
      sodium.crypto_box_keypair(publicKey, secretKey);
      console.dir({ publicKey: publicKey.toString("base64"), secretKey: secretKey.toString("base64") });
      break;
    }
    case "random-bytes": {
      const length = args[0] ? parseInt(args[0], 10) : sodium.crypto_auth_BYTES;
      const buffer = Buffer.allocUnsafe(length);
      sodium.randombytes_buf(buffer);
      console.warn(`Generated ${length}-bytes long:`);
      console.log(buffer.toString("base64"));
      break;
    }
    default:
      console.log("Sorry, that is not something I know how to do.");
      console.log(`Available actions: ${["sign", "verify", "generate-keypair", "random-bytes"].join(", ")}.`);
  }
};

main();
