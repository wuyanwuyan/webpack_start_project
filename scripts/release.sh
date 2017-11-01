#!/usr/bin/env bash

npm run production

# 部署
rsync -vzacu  -e "ssh -p 6677" ./release/ xiangsheng@121.41.91.93:/data/cqaso-temp-activity


#scp -r -P 6677 ./dist/* xiangsheng@121.41.91.93:/data/cqaso-message-backend

echo 'finish！！！！！'
