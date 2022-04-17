# pull the official base image
FROM node:alpine
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# add app
COPY . ./
# map ports
EXPOSE 3000
EXPOSE 443
EXPOSE 2222
EXPOSE 22
# start app
CMD ["npm", "run", "tsc"]