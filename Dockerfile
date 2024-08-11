FROM node:18.17.1-alpine3.17

WORKDIR /app
COPY package.json .
RUN npm install
COPY * .
EXPOSE 3000
CMD ["node", "server.js"]
