FROM node:16.2.0-alpine

WORKDIR /jupiter/

COPY package.json yarn.lock /jupiter/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "pm2" ]
