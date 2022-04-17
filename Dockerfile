# pull the official base image
FROM nginx:latest
# create environment variables
ENV BACKEND_ADDRESS="localhost"
# add all of the built files into the nginx build folder to be served
COPY ./build ./build/var/www/html/frontend/build/
# map ports
EXPOSE 80
EXPOSE 443

# start app
CMD ["npm", "run", "build"]