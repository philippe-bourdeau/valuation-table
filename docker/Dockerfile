FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

## Need to find a way to provision those files outside of build context ; for now, copied manually from server to context
#COPY /docker-volumes/etc/letsencrypt/live/cloudhelp.ca/fullchain.pem /etc/letsencrypt/live/clouhelp.ca/fullchain.pem
#COPY /docker-volumes/etc/letsencrypt/live/cloudhelp.ca/privkey.pem /etc/letsencrypt/live/cloudhelp.ca/privkey.pem
#COPY /docker/letsencrypt-docker-nginx/src/production/dh-param/dhparam-2048.pem /etc/ssl/certs/dhparam-2048.pe

COPY ./docker/fullchain.pem /etc/letsencrypt/live/clouhelp.ca/fullchain.pem
COPY ./docker/privkey.pem /etc/letsencrypt/live/cloudhelp.ca/privkey.pem
COPY ./docker/dhparam-2048.pem /etc/ssl/certs/dhparam-2048.pe
