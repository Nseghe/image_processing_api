FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN mv .aws ~

RUN npm install \
  && npm audit fix

EXPOSE 8080

CMD npm run test && npm run start 
