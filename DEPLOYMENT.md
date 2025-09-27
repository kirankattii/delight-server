# Vercel Deployment Guide for Strapi

This guide will help you deploy your Strapi application to Vercel.

## Prerequisites

1. A Vercel account
2. A PostgreSQL database (recommended for production)
3. Node.js 18+ installed locally

## Database Setup

### Option 1: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the Storage tab
4. Create a new Postgres database
5. Note down the connection details

### Option 2: External PostgreSQL Database
- Use services like:
  - Supabase
  - PlanetScale
  - Railway
  - Neon
  - AWS RDS
  - Google Cloud SQL

## Environment Variables

Set the following environment variables in your Vercel project:

### Required Variables
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

### App Security (Generate these values)
```bash
# Generate APP_KEYS (run 4 times)
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

# Generate API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Database Configuration
```
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://username:password@host:port/database_name
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

### Optional Variables
```
WEBHOOKS_POPULATE_RELATIONS=false
FLAG_NPS=true
FLAG_PROMOTE_EE=true
```

## Deployment Steps

### 1. Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 2. Set Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add all the required environment variables
5. Redeploy your project

### 3. Build and Deploy
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## Important Notes

### File Uploads
- Vercel has a 50MB limit for serverless functions
- For file uploads, consider using:
  - Cloudinary
  - AWS S3
  - Cloudflare R2
  - Vercel Blob Storage

### Database Migrations
- Run migrations manually after deployment
- Use the Strapi admin panel or CLI

### Admin Panel Access
- Access your admin panel at: `https://your-domain.vercel.app/admin`
- Create your first admin user through the setup wizard

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all environment variables are set
   - Ensure database connection is working
   - Check Vercel function logs

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check SSL settings
   - Ensure database allows connections from Vercel IPs

3. **File Upload Issues**
   - Consider using external storage
   - Check file size limits

### Monitoring
- Use Vercel's built-in monitoring
- Check function logs in Vercel dashboard
- Monitor database performance

## Production Checklist

- [ ] Environment variables configured
- [ ] Database properly set up
- [ ] SSL certificates configured
- [ ] File upload strategy implemented
- [ ] Admin user created
- [ ] Content types configured
- [ ] API endpoints tested
- [ ] CORS settings configured (if needed)

## Support

For issues specific to:
- Strapi: [Strapi Documentation](https://docs.strapi.io/)
- Vercel: [Vercel Documentation](https://vercel.com/docs)
