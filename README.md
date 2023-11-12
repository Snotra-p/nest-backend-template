
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

using typeorm with mysql based

simple 3-layered mvc architecture



for security, using jwt token or session

jwt using ES256 algorithm for security.
it can be generate secret and public key from openssl

ECDSA using P-256 and SHA-256

private key 
- openssl ecparam -genkey -name prime256v1 -noout -out ec-private.pem
public key 
- openssl ec -in ec-private.pem -pubout -out ec-public.pem

session key using
// ref : https://github.com/fastify/fastify-secure-session
getSecretKeys(): string {
const keyBuffer = fs.readFileSync('secret-key');
return keyBuffer.toString('hex');
}
// secret key is created by fastify-secure-session


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
