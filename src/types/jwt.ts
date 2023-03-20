export type JWTClaims = RegisteredClaims & PublicClaims;

export type RegisteredClaims<T = unknown> = {
  iss?: string; // issuer
  sub?: string; // subject
  aud?: T; // audience
  exp?: number; // expiration time (seconds)
  nbf?: number; // not before (seconds)
  iat?: number; // issued at (seconds)
  jti?: string; // jwt id
};

// https://openid.net/specs/openid-connect-core-1_0.html
export type PublicClaims = {
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string[];
  azp?: string;
};
