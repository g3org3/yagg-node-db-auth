#!/bin/bash

if [[ -n "$1" ]]; then
  ssh jorgeadolfo.com "mkdir /var/docker/$1"
  scp docker/docker-compose.yml jorgeadolfo.com:/var/docker/$1/
else
  echo "please provide a project name, i.e. init-server.sh my-app"
fi
