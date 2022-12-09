FROM node:alpine
ADD . /api/

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Copy everything else
COPY . /usr/src/app

# Expose the web service port
EXPOSE $PORT

CMD nvm use
CMD npm ci
CMD npm run start
