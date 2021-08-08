FROM node:16.2.0-alpine

WORKDIR /jupiter/

RUN npm install -g nodemon

COPY package.json yarn.lock /jupiter/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "nodemon", "src/server.ts" ]
