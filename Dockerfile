FROM node:12-alpine
WORKDIR /src/app
COPY index.js package.json /src/app/
RUN npm install
CMD ["npm", "start"]