#! /usr/bin/env node
import {signSync, verifySync} from '../crypto';
import {Header, Payload} from '../types';

const [action = 'help', ...args] = process.argv.slice(2);

const readStdin = async (bufferSize?: number): Promise<Buffer> => {
  return new Promise((resolve) => {
    const buffers: Buffer[] = [];
    process.stdin.on('readable', () => {
      const read = process.stdin.read();
      if (read) {
        buffers.push(read);
      }
    });
    process.stdin.on('end', () => {
      resolve(Buffer.concat(buffers, bufferSize));
    });
  });
};

const main = async () => {
  switch (action) {
    // @NOTE npx ts-node src/bin/cli.ts sign '{"sub": "1"}' '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
    case 'sign': {
      const payload = JSON.parse(args[0]) as Payload;
      const jwt = signSync(payload, args[1]);
      console.warn('JWT successfully signed!');
      const [header, , signature] = jwt.split('.');
      console.warn({header: Buffer.from(header, 'base64url').toString('utf8'), payload, signature});
      console.log(jwt);
      break;
    }
    // @NOTE echo -n 'eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxIn0.QdubXBylKLNswV8-b44StbaNQr3SYhqwRBTMn6A6-JM' | npx ts-node src/bin/cli.ts verify '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
    case 'verify': {
      const stdin = await readStdin();
      const result = verifySync(stdin.toString(), [args[0]]);
      if (result) {
        console.warn('JWT successfully verified!');
        console.log(result);
        process.exit(0);
      } else {
        console.log('JWT failed verification');
        process.exit(1);
      }
      break;
    }
    default:
      console.log('Sorry, that is not something I know how to do.');
      console.log(`Available actions: ${['sign', 'verify'].join(', ')}.`);
  }
};

main();
