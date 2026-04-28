FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install
COPY . .
RUN npm run build

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["sh", "-c", "cp -r /app/dist/. /usr/share/nginx/html"]
