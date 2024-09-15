ARG GRAPHQL_URI

# Develop stage
FROM node:lts-alpine AS develop-stage
WORKDIR /src
COPY package*.json ./
RUN npm i -g @quasar/cli@latest
COPY . .

# Local-deps
FROM develop-stage AS local-deps-stage
RUN npm install

# Build stage
FROM local-deps-stage AS build-stage-spa
RUN quasar build -m spa

# Production stage
FROM nginx:stable-alpine AS production-stage-spa
COPY --from=build-stage-spa /src/dist/spa /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
