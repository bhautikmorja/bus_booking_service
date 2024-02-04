#!/bin/sh
export NODE_ENV=staging
npx sequelize-cli db:migrate --env staging
node dist/main.js