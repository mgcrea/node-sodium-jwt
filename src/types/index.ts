export type Header = {
  alg: 'HS512T';
  typ: 'JWT';
};
export type Payload = {
  sub: string | number;
  iat?: number;
  [s: string]: string | number | null | undefined;
};
