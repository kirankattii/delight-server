# Render Deployment Guide for ManjuDelight Strapi

This guide will help you deploy your Strapi application to Render and fix the common deployment issues.

## Issues Fixed

### 1. Port Binding Issue
- **Problem**: "No open ports detected"
- **Solution**: Updated `config/server.js` to properly bind to `0.0.0.0` and use Render's `PORT` environment variable

### 2. Database Connection Issue
- **Problem**: IPv6 connection failure to PostgreSQL
- **Solution**: Updated database configuration to handle Render's PostgreSQL connection string and SSL requirements

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Required Variables
```
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=<your-postgres-connection-string>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

### Security Variables (Generate these)
```
JWT_SECRET=<generate-random-string>
ADMIN_JWT_SECRET=<generate-random-string>
APP_KEYS=<generate-random-string>
API_TOKEN_SALT=<generate-random-string>
TRANSFER_TOKEN_SALT=<generate-random-string>
```

### Optional Variables
```
WEBHOOKS_POPULATE_RELATIONS=false
HOST=0.0.0.0
PORT=1337
```

## Deployment Steps

### 1. Create a PostgreSQL Database on Render
1. Go to your Render dashboard
2. Click "New +" → "PostgreSQL"
3. Choose a name (e.g., "manju-delight-db")
4. Note the connection details

### 2. Create a Web Service
1. Connect your GitHub repository
2. Use these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
   - **Environment**: Node
   - **Node Version**: 18.x or higher

### 3. Set Environment Variables
Add all the required environment variables listed above in your Render service settings.

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Configuration Files Added/Modified

### Modified Files
- `config/server.js` - Added Render-specific server configuration
- `config/database.js` - Updated to handle Render's PostgreSQL connection
- `package.json` - Added Render-specific scripts

### New Files
- `render.yaml` - Render service configuration (optional)
- `src/api/health/routes/health.js` - Health check endpoint
- `src/api/health/controllers/health.js` - Health check controller
- `config/database.render.js` - Alternative database config for Render

## Troubleshooting

### If you still get port binding errors:
1. Ensure `HOST=0.0.0.0` is set in environment variables
2. Check that `PORT` environment variable is being used (Render sets this automatically)

### If you get database connection errors:
1. Verify `DATABASE_URL` is correctly set
2. Ensure `DATABASE_SSL=true` and `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
3. Check that your PostgreSQL database is running and accessible

### If you get build errors:
1. Ensure Node.js version is 18.x or higher
2. Check that all dependencies are properly installed
3. Verify build command is `npm install`

## Health Check

Your application will have health check endpoints at:
- `https://your-app.onrender.com/health`
- `https://your-app.onrender.com/_health`

## Additional Notes

- The application automatically detects if it's running on Render using the `RENDER` environment variable
- SSL is automatically configured for Render's PostgreSQL databases
- The health check endpoint helps Render monitor your application status
- Cron jobs are disabled by default to prevent issues on Render

## Support

If you encounter any issues:
1. Check the Render logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure your database is running and accessible
4. Check that your build completed successfully
