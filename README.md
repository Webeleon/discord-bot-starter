![banner](images/banner.png)

## Built in commands

### `!help`

![help](images/commands/help.png)

### `!invite`

![invite](images/commands/invite.png)

### `!ping`

![ping](images/commands/invite.png)

### `!status`

![status](images/commands/status.png)

## Endpoints

- [GET] `/` `/health`
Health check, should always return OK

- [GET] /discord/bot-invite
helper method that redirect to the bot invite link

## Installation

```bash
$ npm install
```

## Environnement variables

.env files supported

- PORT : default 5000
- DISCORD_API_TOKEN
- DISCORD_CLIENT_ID
- MONGO_URL

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

## Built with

- [Nest](https://github.com/nestjs/nest) framework TypeScript.
- [discord.js](https://discord.js.org/#/) discord API client.
