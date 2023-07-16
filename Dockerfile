# FROM node:18.14-alpine as builder
# WORKDIR /dist
# ADD . . 
# RUN npm install
# RUN npm run build

FROM node:18-alpine 
WORKDIR /app
COPY dist ./dist
COPY package.json .
# COPY package*.json .
RUN yarn install --production
EXPOSE 8080
CMD [ "node", "dist/main" ]