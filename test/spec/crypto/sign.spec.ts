import { signSync } from "src/crypto";
import type { JWTPayload } from "src/types";
import { describe, expect, it } from "vitest";

const payload: JWTPayload = {
  sub: 7,
  iat: new Date("2022-01-03T16:37:48.612Z").getTime(),
};
const secretKey = "0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=";

describe("Sign", () => {
  it("should properly sign a JWT", async () => {
    const jwt = signSync(payload, Buffer.from(secretKey, "base64"));
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe("string");
    expect(jwt.split(".").length).toBe(3);
    expect(jwt).toMatchSnapshot();
  });
  it("should properly support a stringified secretKey", async () => {
    const jwt = signSync(payload, secretKey);
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe("string");
    expect(jwt.split(".").length).toBe(3);
    expect(jwt).toMatchSnapshot();
  });
});
