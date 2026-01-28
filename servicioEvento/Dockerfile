FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

COPY . .

EXPOSE 8002

CMD ["npm", "start"]