
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .env ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /usr/src/app

RUN apk --update --no-cache add curl

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./.env

CMD ["node", "dist/main"]