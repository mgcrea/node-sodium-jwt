import type { JWTCustomClaims, JWTPublicClaims, JWTRegisteredClaims } from "./jwt";

export type JWTHeader = {
  alg: "HS512T";
  typ: "JWT";
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type JWTPayload = Simplify<JWTRegisteredClaims & JWTPublicClaims & JWTCustomClaims>;
