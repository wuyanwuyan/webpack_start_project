#!/usr/bin/env bash
#清空
npm run clean_server
#
##打包
npm run build_server

# 部署
rsync -vzacu  -e "ssh -p 6677" ./package.json xiangsheng@121.41.91.93:/data/cqaso-temp-activity-server/
rsync -vzacu  -e "ssh -p 6677" ./yarn.lock xiangsheng@121.41.91.93:/data/cqaso-temp-activity-server
rsync -vzacu  -e "ssh -p 6677" ./server_dist/ xiangsheng@121.41.91.93:/data/cqaso-temp-activity-server/server/

#scp -r -P 6677 ./dist/* xiangsheng@121.41.91.93:/data/cqaso-message-backend


#scp -r -P 6677 ./server_dist/* xiangsheng@121.41.91.93:/data/cqaso-message-backend/server
#scp -r -P 6677 ./package.json xiangsheng@121.41.91.93:/data/cqaso-message-backend
#scp -r -P 6677 ./yarn.lock xiangsheng@121.41.91.93:/data/cqaso-message-backend

ssh -p 6677 xiangsheng@121.41.91.93 "cd /data/cqaso-temp-activity-server ; yarn install ;sudo pm2 delete server_temp ; sudo pm2 start server/index.js --name 'server_temp'"

echo 'deploy server end ！！！'

