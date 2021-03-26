FROM --platform=linux/x86-64 node:alpine
ENV CI=true

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]