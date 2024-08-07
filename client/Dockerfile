FROM node:20.16.0

WORKDIR /usr/src/app

COPY ../package*.json ./

COPY package.json ./package.json

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]