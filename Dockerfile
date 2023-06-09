FROM node:18
WORKDIR /var/opt/app
COPY package*.json ./
RUN npm install --production --registry https://registry.npm.taobao.org/
COPY . .
RUN npm run build
RUN chmod +x entrypoint.sh
CMD ["sh","entrypoint.sh"]


