#!/bin/bash

if [ ! -d "/var/www/node_modules" ]; then
  npm install --unsafe-perm=true
  npm cache clean --force
fi

npm run dev
