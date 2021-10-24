#!/bin/bash
docker build -t registry.nishtahir.com/capella-server:1.0.2 .
docker build -t registry.nishtahir.com/capella-server:latest .

docker push registry.nishtahir.com/capella-server:1.0.2
docker push registry.nishtahir.com/capella-server:latest