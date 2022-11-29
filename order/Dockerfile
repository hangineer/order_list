# 基底映像檔
FROM node:16.18.1-alpine
MAINTAINER hannah <hannahwang@oetn.cf>
WORKDIR order
COPY ./package*.json ./
RUN yarn install 
# copy專案及該資料夾下所有檔案
COPY . .  
# docker 映射的port號
EXPOSE 8080
RUN yarn run build
CMD [ "yarn", "run","serve" ]


#啟動json server指令
# docker run -d -p 3000:3000 -v /Users/hanwang/Desktop/traning101-105/order/db.json:/data/db.json clue/json-server