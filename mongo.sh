#!/bin/sh
#Simple script for running a mongo docker image

docker run -i -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongo mongo
