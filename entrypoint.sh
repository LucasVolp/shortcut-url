#!/bin/sh
set -e

echo "📦 Gerando Prisma Client..."
npx prisma generate

echo "📄 Aplicando migrations existentes..."
npx prisma migrate deploy

echo "🚀 Iniciando NestJS..."
npm run start:dev
