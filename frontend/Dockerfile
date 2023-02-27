FROM node:alpine as development
ENV NODE_ENV development
WORKDIR /fe
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn","start"]



