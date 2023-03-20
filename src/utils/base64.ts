export const base64UrlEncode = (object: unknown): string => {
  return Buffer.from(JSON.stringify(object)).toString("base64url");
};
