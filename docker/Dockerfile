FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/fullchain.pem /app/fullchain.pem
COPY ./docker/privkey.pem /app/privkey.pem
COPY ./docker/dhparam-2048.pem app/dhparam-2048.pem


## Need to find a way to provision those files outside of build context ; for now, copied manually from server to context
#COPY /docker-volumes/etc/letsencrypt/live/cloudhelp.ca/fullchain.pem /etc/letsencrypt/live/clouhelp.ca/fullchain.pem
#COPY /docker-volumes/etc/letsencrypt/live/cloudhelp.ca/privkey.pem /etc/letsencrypt/live/cloudhelp.ca/privkey.pem
#COPY /certbot/dh-param/dhparam-2048.pem /etc/ssl/certs/dhparam-2048.pem

## chmod 0644 fullchain.pem privkey.pem dhparam-2048.pem
## chown pbb: fullchain.pemp privkey.pem dhparam-2048.pem
