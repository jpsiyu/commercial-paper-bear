FROM node:10

WORKDIR /official

COPY . /official

RUN npm install

RUN npm install -g nodemon

EXPOSE 80

CMD ["npm", "start"]