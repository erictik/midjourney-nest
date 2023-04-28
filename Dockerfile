FROM node:18.14-alpine as builder
WORKDIR /dist
ADD . . 
RUN npm install
RUN npm run build

FROM node:18.14-alpine as runner
WORKDIR /dist
COPY --from=builder /dist/dist dist
COPY package*.json .
RUN npm install --omit=dev
EXPOSE 8080
CMD [ "node", "dist/main" ]