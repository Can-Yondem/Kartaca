FROM node:15.13.0-alpine3.10
WORKDIR /home/node/app
COPY . .
RUN npm install
CMD npm start
EXPOSE 3000
