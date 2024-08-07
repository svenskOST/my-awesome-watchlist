FROM node:20.16.0

WORKDIR /usr/src/app

COPY ../package*.json ./

COPY package.json ./package.json

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]