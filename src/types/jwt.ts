export type JWTRegisteredClaims = {
  iss?: string | number; // Issuer
  sub?: string | number; // Subject
  aud?: string | string[]; // Audience
  exp?: number; // Expiration time
  nbf?: number; // Not before
  iat?: number; // Issued at
  jti?: string | number; // Identifier
};

// https://openid.net/specs/openid-connect-core-1_0.html
export type JWTPublicClaims = {
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string[];
  azp?: string;
};

// Custom claims specific to your application
export interface JWTCustomClaims {
  scope: string | string[];
}
