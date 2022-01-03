import {verifySync} from 'src/crypto';

const jwt =
  'eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOjcsImlhdCI6MTY0MTIyNzg2ODYxMn0.a3_bFmeD5vugh3p998QXTdPbAuAJFQzCm-2MfmRVEAg';
const secretKey = '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=';

describe('Verify', () => {
  it('should properly verify a hashed password', async () => {
    const object = verifySync(jwt, [Buffer.from(secretKey, 'base64')]);
    expect(object).toBeDefined();
    expect(Object.keys(object)).toEqual(['header', 'payload', 'rotated']);
    expect(object).toMatchSnapshot();
  });
  it('should properly support a stringified secretKey', async () => {
    const object = verifySync(jwt, secretKey);
    expect(object).toBeDefined();
    expect(Object.keys(object)).toEqual(['header', 'payload', 'rotated']);
    expect(object).toMatchSnapshot();
  });
  it('should properly support a stringified secretKey in an array', async () => {
    const object = verifySync(jwt, [secretKey]);
    expect(object).toBeDefined();
    expect(Object.keys(object)).toEqual(['header', 'payload', 'rotated']);
    expect(object).toMatchSnapshot();
  });
});
