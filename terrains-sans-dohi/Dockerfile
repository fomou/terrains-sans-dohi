FROM node:22-slim

# Update and install security patches
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000
RUN npm run build

CMD [ "npm", "run", "start" ]
