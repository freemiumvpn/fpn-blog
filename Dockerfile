FROM node:12-alpine AS STAGE_BUILD

RUN apk --no-cache add git

RUN mkdir -p /app
WORKDIR /app/

ADD package*.json /app/

RUN npm ci

ADD . /app/

ENV NODE_ENV production

RUN npm run build

##

FROM node:12-alpine AS STAGE_SERVE

WORKDIR /app/

ENV NODE_ENV production

ADD package*.json /app/
RUN npm ci

COPY --from=STAGE_BUILD /app/build /app/build

EXPOSE 3000
CMD [ "npm", "run", "serve" ]
