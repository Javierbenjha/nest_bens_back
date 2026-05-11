#!/bin/bash
set -e
cd /home/site/wwwroot
echo "Installing production dependencies with Node $(node -v)..."
npm install --omit=dev
echo "Generating Prisma client..."
npx prisma generate
echo "Starting NestJS application..."
exec node dist/main
