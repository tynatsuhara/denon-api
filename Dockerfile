FROM node:alpine

# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm ci

EXPOSE $PORT

CMD npm run start
