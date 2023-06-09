#!/usr/bin/env sh
npm run typeorm:run-migrations &&
  npm run start:prod
