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
    
          const isSupabase = env('DATABASE_URL').includes('supabase.co');
    
          if (isSupabase) {
            console.log('   🔧 Detected Supabase connection, using connection string with IPv4');
    
            return {
              connectionString: env('DATABASE_URL'),
              ssl: {
                rejectUnauthorized: false,
                require: true,
              },
              family: 4, // ✅ force IPv4
            };
          }
    
          return {
            connectionString: env('DATABASE_URL'),
            ssl: {
              rejectUnauthorized: false,
              require: true,
            },
            family: 4,
          };
        }
      })(),
      pool: { min: 2, max: 10 },
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