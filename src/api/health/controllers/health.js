'use strict';

module.exports = {
  async index(ctx) {
    try {
      // Simple health check
      ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      };
      ctx.status = 500;
    }
  },
};
