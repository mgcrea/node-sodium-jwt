
export type RegisteredClaims = {
  iss?: string;  // Issuer
  sub?: string;  // Subject
  aud?: string | string[];  // Audience
  exp?: number;  // Expiration time
  nbf?: number;  // Not before
  iat?: number;  // Issued at
  jti?: string;  // JWT ID
};

// https://openid.net/specs/openid-connect-core-1_0.html
export type PublicClaims = {
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string[];
  azp?: string;
};

// Custom claims specific to your application
export interface CustomClaims {
}
