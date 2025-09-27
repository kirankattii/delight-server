const { createStrapi } = require('@strapi/strapi');

let strapi;

const startStrapi = async () => {
  if (!strapi) {
    try {
      strapi = await createStrapi({
        distDir: './dist',
        appDir: './src',
      });
      await strapi.start();
    } catch (error) {
      console.error('Failed to start Strapi:', error);
      throw error;
    }
  }
  return strapi;
};

module.exports = async (req, res) => {
  try {
    const strapiInstance = await startStrapi();
    return strapiInstance.server.app(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
