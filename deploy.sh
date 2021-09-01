#!/bin/bash
# npm run build
ssh root@120.78.177.9 "mkdir /usr/local/nginx/cmd-cli"
scp -r ./docDist/* root@120.78.177.9:/usr/local/nginx/cmd-cli
