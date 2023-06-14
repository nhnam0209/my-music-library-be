# Specify the base image
FROM node:14-alpine

WORKDIR /app

COPY .dockerignore .
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
COPY . .

ENV NODE_ENV=production
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin123
ENV MYSQL_DATABASE=music_library

ENV DB_HOST=localhost
ENV DB_USER=admin
ENV DB_PASSWORD=admin123
ENV DB_NAME=music_library

EXPOSE 8000
CMD ["npm", "start","nodemon"]
