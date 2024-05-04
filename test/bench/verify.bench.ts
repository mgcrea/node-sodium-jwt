import { verifySync } from "src/crypto";
import { bench, describe } from "vitest";

describe("sign", () => {
  const jwt =
    "eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOjcsImlhdCI6MTY0MTIyNzg2ODYxMn0.a3_bFmeD5vugh3p998QXTdPbAuAJFQzCm-2MfmRVEAg";
  const secretKey = "0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=";

  bench(
    "verifySync",
    () => {
      verifySync(jwt, Buffer.from(secretKey, "base64"));
    },
    { time: 2000, iterations: 0 },
  );
});
