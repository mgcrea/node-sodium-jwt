import type { RegisteredClaims, PublicClaims, CustomClaims } from "./jwt";

export type Header = {
  alg: "HS512T";
  typ: "JWT";
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type Payload = Simplify<RegisteredClaims & PublicClaims & CustomClaims>;
