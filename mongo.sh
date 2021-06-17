#!/bin/sh
#Simple script for running a mongo docker image
docker rm -fv mongo
docker volume create mongo_data

docker run -i --rm \
--name mongo \
-v mongo_data:/data/db \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=mongo \
-e MONGO_INITDB_ROOT_PASSWORD=mongo \
mongo

docker rm -fv mongo
