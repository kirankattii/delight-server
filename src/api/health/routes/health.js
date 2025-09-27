module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health',
      handler: 'health.index',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/_health',
      handler: 'health.index',
      config: {
        auth: false,
      },
    },
  ],
};
