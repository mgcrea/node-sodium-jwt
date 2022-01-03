export const asBuffer = (maybeBuffer: Buffer | string, encoding: BufferEncoding = 'ascii'): Buffer =>
  Buffer.isBuffer(maybeBuffer) ? maybeBuffer : Buffer.from(maybeBuffer, encoding);

type AsArray<T> = T extends Array<unknown> ? T : T[];
export const asArray = <T>(maybeArray: T): AsArray<T> =>
  (Array.isArray(maybeArray) ? maybeArray : [maybeArray]) as AsArray<T>;
