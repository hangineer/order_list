# 基底映像檔
FROM node:16.18.1-alpine
MAINTAINER hannah <hannahwang@oetn.cf>
WORKDIR order
COPY ./package*.json ./
RUN yarn install 
# COPY .dockerignore ./
# copy專案及該資料夾下所有檔案
COPY . .  
EXPOSE 80
RUN yarn run build
CMD [ "yarn", "run","serve" ]

# 本機程式碼copy到container裏面

# RUN yarn add json-server
# docker run -d -p 30:80 -v traning101-105/order:/data/db.json clue/json-server
# docker run -d -p 30:80 -v /Users/hanwang/Desktop/traning101-105/order:/data/db.json clue/json-server