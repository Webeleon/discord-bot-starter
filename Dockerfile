# Build stage
FROM node:14.15 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:14.15 as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY *.json /app/
ENV NODE_ENV=production
RUN npm ci --silent
RUN npm i -g @nestjs/cli
CMD [ "npm", "start" ]
