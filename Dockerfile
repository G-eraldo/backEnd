FROM node:24.22.1-bookworm

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ENV NODE_ENV=production
RUN yarn build

RUN chown -R node:node /app
USER node

EXPOSE 1337
CMD ["yarn", "start"]
