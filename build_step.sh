#!/bin/bash

echo "Build script"

# add the commands here
npm install
npm start &
cd bloglist-frontend
npm install
npm run build
npm run start-prod