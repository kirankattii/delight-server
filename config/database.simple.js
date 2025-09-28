const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  console.log(`🔧 Database configuration:`);
  console.log(`   Client: ${client}`);
  console.log(`   RENDER env: ${env('RENDER')}`);
  console.log(`   DATABASE_URL exists: ${!!env('DATABASE_URL')}`);
  
  if (env('DATABASE_URL')) {
    console.log(`   DATABASE_URL: ${env('DATABASE_URL').substring(0, 30)}...`);
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
          
          // For Supabase, parse the URL and use individual parameters to avoid IPv6 issues
          if (env('DATABASE_URL').includes('supabase.co')) {
            console.log('   🔧 Detected Supabase connection, parsing URL for IPv4 compatibility');
            
            try {
              const url = new URL(env('DATABASE_URL'));
              const hostname = url.hostname;
              const port = url.port || '5432';
              const database = url.pathname.substring(1);
              const username = url.username;
              const password = url.password;
              
              console.log(`   🔄 Using individual parameters: ${hostname}:${port}/${database}`);
              
              return {
                host: hostname,
                port: parseInt(port),
                database: database,
                user: username,
                password: password,
                schema: env('DATABASE_SCHEMA', 'public'),
                ssl: {
                  rejectUnauthorized: false,
                  require: true,
                },
                // Force IPv4 connection
                family: 4,
                // Connection options
                keepAlive: true,
                keepAliveInitialDelayMillis: 0,
                connectionTimeoutMillis: 30000,
                idleTimeoutMillis: 30000,
                query_timeout: 60000,
              };
            } catch (error) {
              console.log('   ⚠️  Could not parse Supabase URL, using connection string');
            }
          }
          
          // For non-Supabase databases, use connection string
          return {
            connectionString: env('DATABASE_URL'),
            ssl: {
              rejectUnauthorized: false,
              require: true,
            },
            family: 4,
            keepAlive: true,
            keepAliveInitialDelayMillis: 0,
            connectionTimeoutMillis: 30000,
            idleTimeoutMillis: 30000,
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
            family: 4,
          };
          
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
