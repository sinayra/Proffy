FROM node:current-slim

LABEL MAINTAINER=sinayra@hotmail.com

COPY ./src /var/www
WORKDIR /var/www

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]