FROM node:16.6.1-alpine as builder

ENV APP=/app/

WORKDIR ${APP}

COPY package.json yarn.lock ${APP}

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn test
RUN yarn build

FROM node:16.6.1-alpine

ENV APP=/app/
ENV BUILD=/app/dist

WORKDIR ${APP}

COPY package.json yarn.lock pm2.config.js ${APP}

RUN yarn install --production --frozen-lockfile

COPY --from=builder ${BUILD} ${APP}

EXPOSE 3000

CMD [ "yarn", "start" ]
