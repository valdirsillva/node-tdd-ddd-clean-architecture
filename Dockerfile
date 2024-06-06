# FROM node:18
# WORKDIR /usr/clean-node-api
# COPY ./package.json ./
# RUN npm install --only=prod
# COPY . .

# RUN npm run build

FROM node:18 as builder
WORKDIR /app/clean-node-api
COPY package.json ./
RUN npm install -g npm@10.8.1
RUN npm install 
COPY . .

RUN npm run build

FROM node:18 as final
COPY --from=builder /app/clean-node-api/node_modules ./node_modules
COPY --from=builder /app/clean-node-api/package*.json ./
COPY --from=builder /app/clean-node-api/build ./build
