#!/bin/sh
export NODE_ENV=production
npx sequelize-cli db:migrate --env production
node dist/main.js