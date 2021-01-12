FROM node:12-alpine
WORKDIR /app
COPY . /app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --only=prod
EXPOSE 5000 5001 
USER node
CMD ["node", "app.js"]