# Choose base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependecies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4100
CMD [ "npm", "start" ]