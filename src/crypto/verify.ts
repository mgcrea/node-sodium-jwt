import sodium from 'sodium-native';
import {Header, Payload} from '../types';
import {asArray, asBuffer, createError} from '../utils';

export const verifySync = (
  message: string,
  secretKeys: (string | Buffer) | (string | Buffer)[]
): {header: Header; payload: Payload; rotated: boolean} => {
  const splitCharIndex = message.lastIndexOf('.');
  if (splitCharIndex === -1) {
    throw createError('MalformedMessageError', 'The message is malformed');
  }
  const signature = Buffer.from(message.slice(splitCharIndex + 1), 'base64url');
  if (signature.length !== sodium.crypto_auth_BYTES) {
    throw createError('SignatureLengthError', 'The signature does not have the required length');
  }
  const cleartext = message.slice(0, splitCharIndex);
  const cleartextBuffer = Buffer.from(cleartext, 'utf8');

  let rotated = false;
  const success = asArray(secretKeys).some((secretKey, index) => {
    const verified = sodium.crypto_auth_verify(signature, cleartextBuffer, asBuffer(secretKey, 'base64'));
    rotated = verified && index > 0;
    return verified;
  });

  if (!success) {
    throw createError('VerifyError', 'Unable to verify');
  }

  const splits = cleartext.split('.');
  if (splits.length !== 2) {
    throw createError('MalformedMessageError', 'The message header/payload is malformed');
  }
  const header = JSON.parse(Buffer.from(splits[0], 'base64url').toString());
  const payload = JSON.parse(Buffer.from(splits[1], 'base64url').toString());
  return {header, payload, rotated};
};
