FROM node:16.2.0-alpine as builder

WORKDIR /app/

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

RUN yarn build

FROM node:16.2.0-alpine

WORKDIR /app/

COPY package.json yarn.lock pm2.config.js /app/

RUN yarn install --production

COPY --from=builder /app/dist /app/

EXPOSE 3000

CMD [ "yarn", "start" ]
