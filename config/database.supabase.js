const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  console.log(`🔧 Database configuration:`);
  console.log(`   Client: ${client}`);
  console.log(`   RENDER env: ${env('RENDER')}`);
  console.log(`   DATABASE_URL exists: ${!!env('DATABASE_URL')}`);
  
  if (env('DATABASE_URL')) {
    console.log(`   DATABASE_URL: ${env('DATABASE_URL').substring(0, 30)}...`);
    console.log(`   Using connectionString: true`);
  }

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: (() => {
        if (env('DATABASE_URL')) {
          console.log('   ✅ Using DATABASE_URL connection string');
          
          let connectionString = env('DATABASE_URL');
          
          // Handle Supabase IPv6 issue by using IPv4 pooler
          if (connectionString.includes('supabase') || connectionString.includes('pooler')) {
            console.log('   🔧 Detected Supabase connection, using IPv4 pooler');
            
            // Extract connection details from the URL
            const url = new URL(connectionString);
            const hostname = url.hostname;
            const port = url.port || '5432';
            const database = url.pathname.substring(1);
            const username = url.username;
            const password = url.password;
            
            // Use Supabase's IPv4 pooler endpoint
            const ipv4Hostname = hostname.replace(/\.supabase\.co$/, '.pooler.supabase.co');
            
            // Reconstruct connection string with IPv4 pooler
            connectionString = `postgresql://${username}:${password}@${ipv4Hostname}:${port}/${database}`;
            
            console.log(`   🔄 Converted to IPv4 pooler: ${ipv4Hostname}`);
          }
          
          return {
            connectionString: connectionString,
            ssl: {
              rejectUnauthorized: false,
              require: true,
            },
            // Force IPv4 connection
            family: 4,
            // Additional connection options for better reliability
            keepAlive: true,
            keepAliveInitialDelayMillis: 0,
            // Connection timeout settings
            connectionTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
            // Query timeout
            query_timeout: 60000,
          };
        } else {
          console.log('   ⚠️  DATABASE_URL not found, using individual parameters');
          const config = {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            schema: env('DATABASE_SCHEMA', 'public'),
            // Force IPv4 connection
            family: 4,
          };
          
          // Add SSL for production
          if (env('RENDER') || env.bool('DATABASE_SSL', false)) {
            config.ssl = {
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
              require: true,
            };
            console.log('   🔒 SSL enabled for database connection');
          }
          
          return config;
        }
      })(),
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10),
        acquireTimeoutMillis: env.int('DATABASE_ACQUIRE_TIMEOUT', 60000),
        createTimeoutMillis: env.int('DATABASE_CREATE_TIMEOUT', 30000),
        destroyTimeoutMillis: env.int('DATABASE_DESTROY_TIMEOUT', 5000),
        idleTimeoutMillis: env.int('DATABASE_IDLE_TIMEOUT', 30000),
        reapIntervalMillis: env.int('DATABASE_REAP_INTERVAL', 1000),
        createRetryIntervalMillis: env.int('DATABASE_CREATE_RETRY_INTERVAL', 200),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
