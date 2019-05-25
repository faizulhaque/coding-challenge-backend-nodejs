FROM node:10.4.1-alpine

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . /app
EXPOSE 4000
EXPOSE 5858
EXPOSE 6379
CMD ["./entrypoint.sh", "node", "./bin/server"]
