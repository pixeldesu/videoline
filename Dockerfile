########
# UI-build
########
#Base image
FROM node:alpine as ui-build
# set working directory
RUN mkdir /app
WORKDIR /app
# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools 
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
COPY . .
RUN npm run build


########
# Production
########
FROM nginx
COPY  --from=ui-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
