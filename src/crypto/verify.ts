import sodium from "sodium-native";
import type { Header, Payload } from "../types";
import { asArray, asBuffer, createError } from "../utils";

export const verifySync = (
  message: string,
  secretKeys: (string | Buffer) | (string | Buffer)[],
): { header: Header; payload: Payload; rotated: boolean } => {
  const splits = message.split(".");
  if (splits.length !== 3) {
    throw createError("MalformedMessageError", "The message is malformed");
  }
  const [rawHeader, rawPayload, rawSignature] = splits as [string, string, string];

  const header = JSON.parse(Buffer.from(rawHeader, "base64url").toString());
  if (header.alg !== "HS512T") {
    throw createError("UnsupportedAlgorithmError", `The alg "${header.alg}" is unsupported`);
  }

  const signature = Buffer.from(rawSignature, "base64url");
  if (signature.length !== sodium.crypto_auth_BYTES) {
    throw createError("SignatureLengthError", "The signature does not have the required length");
  }

  const cleartext = Buffer.from(message.slice(0, -rawSignature.length - 1), "utf8");

  let rotated = false;
  const success = asArray(secretKeys).some((secretKey, index) => {
    const verified = sodium.crypto_auth_verify(signature, cleartext, asBuffer(secretKey, "base64"));
    rotated = verified && index > 0;
    return verified;
  });

  if (!success) {
    throw createError("VerifyError", "Unable to verify");
  }

  const payload = JSON.parse(Buffer.from(rawPayload, "base64url").toString());

  return { header, payload, rotated };
};
