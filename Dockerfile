FROM node:18
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./build ./build
EXPOSE 9000
CMD npm start
