'use strict';

/**
 * `blog-populate` middleware
 */
const populate = {
  // Main category relation
  category: {
    fields: ['name'],
  },
  // Multiple categories relation
  categories: {
    fields: ['name'],
  },
  // Tags relation
  tags: {
    fields: ['name'],
  },
  // Cover images for different devices
  desktopCoverImage: {
    fields: ['url', 'alternativeText'],
  },
  tabCoverImage: {
    fields: ['url', 'alternativeText'],
  },
  mobileCoverImage: {
    fields: ['url', 'alternativeText'],
  },
  // SEO component
  seo: {
    fields: ['metaTitle', 'metaDescription', 'keywords'],
    populate: {
      metaImage: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
  // Additional content blocks
  additionalContent: {
    fields: ['TextBlock'],
    populate: {
      ImageBlock: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
};


module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In blog-populate middleware.');

    await next();

  };
};
