#!/bin/sh
echo "Running Prisma db push..."
npx prisma db push --skip-generate 2>&1 || echo "DB push failed, continuing..."
echo "Seeding database..."
node prisma/seed.js 2>&1 || echo "Seed skipped or failed, continuing..."
echo "Starting server..."
exec node server.js
