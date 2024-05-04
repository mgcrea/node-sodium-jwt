import { signSync } from "src/crypto";
import { JWTPayload } from "src/types";
import { bench, describe } from "vitest";

describe("sign", () => {
  const payload: JWTPayload = {
    sub: 7,
    iat: new Date("2022-01-03T16:37:48.612Z").getTime(),
  };
  const secretKey = "0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=";

  bench(
    "signSync",
    () => {
      signSync(payload, Buffer.from(secretKey, "base64"));
    },
    { time: 2000, iterations: 0 },
  );
});
