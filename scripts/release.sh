#!/usr/bin/env bash

npm run build_client

# 部署
rsync -vzacu  -e "ssh -p 6677" ./release/ xiangsheng@121.41.91.93:/data/cqaso-temp-activity
rsync -vzacu  -e "ssh -p 6677" ./release/ xiangsheng@120.27.152.54:/data/cqaso-temp-activity

#node ./scripts/oss-dev.js

#scp -r -P 6677 ./dist/* xiangsheng@121.41.91.93:/data/cqaso-message-backend
#scp -r -P 6677 ./release/* xiangsheng@120.27.152.54:/data/cqaso-temp-activity

echo 'finish！！！！！'
