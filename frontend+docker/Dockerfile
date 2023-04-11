# # Stage 1
# FROM node:17-alpine as builder
# WORKDIR /app
# COPY package.json ./
# RUN apk add --no-cache openssl-dev && \
#     npm install && \
#     npm cache clean --force
# COPY . .
# RUN npm run build

# # Stage 2
# FROM nginx:1.19.0-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:14.17.6-alpine

RUN apk add --no-cache openssl=1.1.1l-r0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

