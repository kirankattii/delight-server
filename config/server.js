module.exports = ({ env }) => {
  const port = env.int('PORT', 1337);
  const host = env('HOST', '0.0.0.0');
  const nodeEnv = env('NODE_ENV', 'development');
  
  console.log(`🚀 Starting server on ${host}:${port}`);
  console.log(`🌍 Environment: ${nodeEnv}`);
  console.log(`🔗 Database client: ${env('DATABASE_CLIENT', 'sqlite')}`);
  
  return {
    host,
    port,
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    // Production configuration
    url: env('PUBLIC_URL', nodeEnv === 'production' ? `https://manjudelight.onrender.com` : `http://localhost:${port}`),
    proxy: true,
    cron: {
      enabled: false,
    },
    // Ensure the server starts even if database connection fails initially
    emitErrors: false,
    // Production-specific settings
    ...(nodeEnv === 'production' && {
      // Enable compression for production
      compression: true,
      // Security headers
      security: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', 'https:'],
            'media-src': ["'self'", 'data:', 'blob:', 'https:'],
            'object-src': ["'none'"],
            'script-src': ["'self'"],
            'style-src': ["'self'", "'unsafe-inline'"],
          },
        },
      },
    }),
  };
};
