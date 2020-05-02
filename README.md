## Endpoints

- [GET] /discord/bot-invite
helper method that redirect to the bot invite link

- [POST] /
create a new channel: body should comply to the `IChannelConfig` interface;

- [PUT] /:channelId
Update an existing channel: body should comply to the `IChannelConfig` interface;

- [DELETE] /:guildId/:channelId
Mark a channel for deletion. It will be rename as to be delete (defined in the constant `CHANNEL_WILL_BE_DELETED`);
The channel deletion will occur during a cron tab action only when all members are disconnected

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Environnement variables

.env files supported

- PORT : default 5000
- DISCORD_API_TOKEN
- DISCORD_CLIENT_ID

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

