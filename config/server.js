module.exports = ({ env }) => {
  const port = env.int('PORT', 1337);
  const host = env('HOST', '0.0.0.0');
  
  console.log(`🚀 Starting server on ${host}:${port}`);
  console.log(`🌍 Environment: ${env('NODE_ENV', 'development')}`);
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
    // Render-specific configuration
    url: env('PUBLIC_URL', `http://localhost:${port}`),
    proxy: true,
    cron: {
      enabled: false,
    },
    // Ensure the server starts even if database connection fails initially
    emitErrors: false,
  };
};
