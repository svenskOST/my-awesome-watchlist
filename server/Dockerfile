FROM node:20.16-slim

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]