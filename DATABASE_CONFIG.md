# Database Configuration for ManjuDelight Strapi

This document outlines the database configuration for the ManjuDelight Strapi application using Render PostgreSQL.

## Environment Variables

The application is configured to use the following environment variables for database connection:

### Database Connection
- `DATABASE_CLIENT=postgres`
- `DATABASE_HOST=dpg-d3cf16q4d50c73cgf8sg-a.oregon-postgres.render.com`
- `DATABASE_PORT=5432`
- `DATABASE_NAME=strapi_server_r7u6`
- `DATABASE_USERNAME=strapi_server_r7u6_user`
- `DATABASE_PASSWORD=2zGSG367nuMotLzndpeZYsTlDIedYuRd`
- `DATABASE_URL=postgresql://strapi_server_r7u6_user:2zGSG367nuMotLzndpeZYsTlDIedYuRd@dpg-d3cf16q4d50c73cgf8sg-a.oregon-postgres.render.com:5432/strapi_server_r7u6`

### SSL Configuration
- `DATABASE_SSL=true`
- `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
- `DATABASE_SCHEMA=public`

### Connection Pool
- `DATABASE_POOL_MIN=1`
- `DATABASE_POOL_MAX=20`

### Application Secrets
- `APP_KEYS="lzd3dXtTM3jQEOgIMPiWPQ==,elZ40smNNdSwylqTAf6PuA==,flo88eXpRyLPXurwyADUfw==,cZUkz3bTF9iQTvUYd7Njdw=="`
- `API_TOKEN_SALT="GHm8pNE7EwAnHS/j16/eZw=="`
- `ADMIN_JWT_SECRET="+Jo4pLRoYKHp0JEG4HjOdQ=="`
- `TRANSFER_TOKEN_SALT="ZZVS3FPyCa5lcMbz2/x3Yg=="`
- `ENCRYPTION_KEY="9eVWtXqKUMJW13KQgzdd6Q=="`
- `JWT_SECRET="3RNXt1a0wC37byikQsGhmQ=="`

## Configuration Files

### 1. Database Configuration (`config/database.js`)
- Configured for PostgreSQL with Render-specific optimizations
- Includes IPv4 connection handling
- SSL configuration for production
- Connection pooling with Render-optimized settings
- Timeout and retry configurations

### 2. Server Configuration (`config/server.js`)
- Production-ready server settings
- Security headers and CSP configuration
- Compression enabled for production
- Proper URL configuration for Render deployment

### 3. Start Script (`start.js`)
- Enhanced startup script with Render PostgreSQL detection
- Automatic environment variable configuration
- IPv4 connection preference
- Error handling and logging

### 4. Render Configuration (`render.yaml`)
- Complete deployment configuration for Render
- All environment variables pre-configured
- Database connection settings
- Health check endpoint

## Local Development Setup

### Option 1: Using the setup script
```bash
# Make the script executable (already done)
chmod +x setup-env.sh

# Source the environment variables
source setup-env.sh

# Start development server
npm run develop
```

### Option 2: Manual environment setup
```bash
# Set environment variables manually
export NODE_ENV=production
export DATABASE_CLIENT=postgres
export DATABASE_URL=postgresql://strapi_server_r7u6_user:2zGSG367nuMotLzndpeZYsTlDIedYuRd@dpg-d3cf16q4d50c73cgf8sg-a.oregon-postgres.render.com:5432/strapi_server_r7u6
# ... (add all other variables)

# Start the application
npm run develop
```

## Production Deployment

The application is configured for deployment on Render with the following features:

1. **Automatic Environment Detection**: The application detects Render PostgreSQL connections and applies optimized settings
2. **Connection Pooling**: Configured with min=1, max=20 connections for optimal performance
3. **SSL/TLS**: Properly configured for secure database connections
4. **IPv4 Preference**: Forces IPv4 connections to avoid IPv6 issues
5. **Health Checks**: Configured health check endpoint at `/_health`

## Troubleshooting

### Common Issues

1. **Connection Timeout**: Check if the database URL is correct and the database is accessible
2. **SSL Issues**: Ensure `DATABASE_SSL_REJECT_UNAUTHORIZED=false` is set
3. **Pool Exhaustion**: Monitor connection pool usage and adjust `DATABASE_POOL_MAX` if needed
4. **IPv6 Issues**: The configuration forces IPv4 connections to avoid common IPv6 connectivity issues

### Logs to Check

The application provides detailed logging for database connections:
- Connection string (with masked password)
- Database client detection
- SSL configuration status
- Pool configuration

## Security Notes

- Database credentials are stored in environment variables
- SSL is enabled for all database connections
- Connection strings are logged with masked passwords
- All secrets are properly configured for production use

## Performance Optimization

- Connection pooling is configured for Render's PostgreSQL limits
- Timeout settings are optimized for cloud database connections
- Keep-alive settings are enabled for better connection stability
- Query timeouts are set to prevent long-running queries from blocking the pool
