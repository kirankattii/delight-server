#!/bin/bash

# Environment setup script for ManjuDelight Strapi application
# This script sets up the environment variables for Render Postgres database

echo "🔧 Setting up environment variables for ManjuDelight Strapi..."

# Export environment variables
export NODE_ENV=production
export DATABASE_CLIENT=postgres
export DATABASE_HOST=dpg-d3cf16q4d50c73cgf8sg-a.oregon-postgres.render.com
export DATABASE_PORT=5432
export DATABASE_NAME=strapi_server_r7u6
export DATABASE_USERNAME=strapi_server_r7u6_user
export DATABASE_PASSWORD=2zGSG367nuMotLzndpeZYsTlDIedYuRd
export DATABASE_SSL=true
export DATABASE_SSL_REJECT_UNAUTHORIZED=false
export DATABASE_SCHEMA=public
export DATABASE_URL=postgresql://strapi_server_r7u6_user:2zGSG367nuMotLzndpeZYsTlDIedYuRd@dpg-d3cf16q4d50c73cgf8sg-a.oregon-postgres.render.com:5432/strapi_server_r7u6
export DATABASE_POOL_MIN=1
export DATABASE_POOL_MAX=20
export HOST=0.0.0.0
export PORT=1337
export PUBLIC_URL=https://manjudelight.onrender.com

# Strapi secrets
export APP_KEYS="lzd3dXtTM3jQEOgIMPiWPQ==,elZ40smNNdSwylqTAf6PuA==,flo88eXpRyLPXurwyADUfw==,cZUkz3bTF9iQTvUYd7Njdw=="
export API_TOKEN_SALT="GHm8pNE7EwAnHS/j16/eZw=="
export ADMIN_JWT_SECRET="+Jo4pLRoYKHp0JEG4HjOdQ=="
export TRANSFER_TOKEN_SALT="ZZVS3FPyCa5lcMbz2/x3Yg=="
export ENCRYPTION_KEY="9eVWtXqKUMJW13KQgzdd6Q=="
export JWT_SECRET="3RNXt1a0wC37byikQsGhmQ=="

echo "✅ Environment variables set successfully!"
echo "🚀 You can now run: npm run develop (for development) or npm run start (for production)"
