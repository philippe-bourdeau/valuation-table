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
COPY ./docker/dhparam-2048.pem /app/dhparam-2048.pem


## Need to find a way to provision those files outside of build context ; for now, copied manually from server to context
# @see cerbot README for more info