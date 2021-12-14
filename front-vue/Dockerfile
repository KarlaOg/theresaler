FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# RUN npm install -g @vue/cli @vue/cli-service-global
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]
