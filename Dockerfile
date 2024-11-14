FROM node:20 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY config/nginx.conf /etc/nginx/nginx.conf
#COPY config/entrypoint.sh /entrypoint.sh
#RUN chmod +x /entrypoint.sh
ENTRYPOINT ["echo", "Running..."]
