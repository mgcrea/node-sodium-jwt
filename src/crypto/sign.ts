import sodium from 'sodium-native';
import {Header, Payload} from '../types';
import {asBuffer, base64UrlEncode} from '../utils';

export const signSync = (payload: Payload, secretKey: Buffer | string, extraHeader: Partial<Header> = {}): string => {
  const header: Header = {
    alg: 'HS512T',
    typ: 'JWT',
    ...extraHeader,
  };
  const output = Buffer.allocUnsafe(sodium.crypto_auth_BYTES);
  const message = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  sodium.crypto_auth(output, Buffer.from(message), asBuffer(secretKey, 'base64'));
  return `${message}.${output.toString('base64url')}`;
};
