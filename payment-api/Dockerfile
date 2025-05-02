FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache dumb-init bash

COPY package*.json ./

RUN npm ci

COPY . .

RUN ls -la

RUN npm run build

RUN ls -la dist

ENTRYPOINT ["dumb-init", "--"]

EXPOSE 3000

CMD ["npm", "start"]