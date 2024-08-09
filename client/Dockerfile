FROM node:20.16-slim

WORKDIR /app

COPY ./package*.json .

RUN npm install

RUN npx next telemetry disable

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]