# Supabase IPv6 Connection Fix for Render

## Problem
Your Strapi application deployed on Render is failing to connect to Supabase PostgreSQL database with the error:
```
connect ENETUNREACH 2406:da1a:6b0:f61d:4902:bf00:4604:fc7:5432 - Local (:::0)
```

This is an IPv6 connectivity issue where Render's environment cannot reach Supabase's IPv6 addresses.

## Root Cause
- Supabase provides both IPv4 and IPv6 connection endpoints
- Render's network environment has limited IPv6 support
- Your connection string is resolving to an IPv6 address that's unreachable

## Solution Applied

### 1. Updated Database Configuration
Modified `config/database.js` to:
- Force IPv4 connections using `family: 4`
- Detect Supabase connections and use IPv4 pooler
- Add better connection timeout and retry settings

### 2. Enhanced Startup Script
Updated `start.js` to:
- Force Node.js to prefer IPv4 DNS resolution
- Add better error handling for connection issues
- Provide helpful debugging information

### 3. Created Supabase-Specific Config
Added `config/database.supabase.js` with:
- Automatic IPv4 pooler detection and conversion
- Better connection string parsing
- Enhanced SSL and timeout configurations

## Environment Variables to Set in Render

Make sure these are set in your Render dashboard:

```bash
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/[database]
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Force IPv4 (add this)
NODE_OPTIONS=--dns-result-order=ipv4first

# Other required variables
NODE_ENV=production
HOST=0.0.0.0
RENDER=true
```

## Alternative Solutions

### Option 1: Use Supabase IPv4 Pooler (Recommended)
Update your `DATABASE_URL` to use Supabase's IPv4 pooler:
```bash
# Instead of: postgresql://postgres:[password]@[project].supabase.co:5432/postgres
# Use: postgresql://postgres:[password]@[project].pooler.supabase.co:5432/postgres
```

### Option 2: Use Direct Connection String
If you have the individual connection parameters, use them instead of `DATABASE_URL`:
```bash
DATABASE_HOST=[your-supabase-host]
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[your-password]
```

### Option 3: Switch to Render PostgreSQL
Consider using Render's built-in PostgreSQL database instead of Supabase for better compatibility.

## Testing the Fix

1. Deploy the updated code to Render
2. Check the logs for these messages:
   - `🔧 Detected Supabase connection, forcing IPv4`
   - `🔄 Converted to IPv4 pooler: [hostname]`
   - `✅ Using DATABASE_URL connection string`

3. If you still see IPv6 errors, try the alternative solutions above.

## Troubleshooting

### If the issue persists:

1. **Check your Supabase connection string**:
   - Make sure it's using the correct format
   - Try using the pooler endpoint instead of direct connection

2. **Verify environment variables**:
   - Ensure `NODE_OPTIONS=--dns-result-order=ipv4first` is set
   - Check that `DATABASE_SSL=true` and `DATABASE_SSL_REJECT_UNAUTHORIZED=false`

3. **Test connection locally**:
   ```bash
   # Test if your connection string works locally
   psql "your-database-url-here"
   ```

4. **Check Supabase settings**:
   - Ensure your Supabase project allows connections from Render's IP ranges
   - Check if there are any firewall rules blocking connections

## Files Modified

- `config/database.js` - Updated with IPv4 forcing and Supabase detection
- `start.js` - Added IPv4 DNS resolution and better error handling
- `config/database.supabase.js` - New Supabase-specific configuration

## Additional Notes

- This fix specifically addresses the IPv6 connectivity issue with Supabase on Render
- The solution maintains backward compatibility with other database providers
- Connection pooling is enabled for better performance and reliability
- SSL is properly configured for secure connections

## Support

If you continue to experience issues:
1. Check Render's logs for detailed error messages
2. Verify your Supabase connection string format
3. Ensure all environment variables are correctly set
4. Consider using Render's PostgreSQL database as an alternative
