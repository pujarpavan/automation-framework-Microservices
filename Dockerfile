# Dockerfile
FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npx", "testcafe", "chrome:headless", "tests/**/*.js"]
