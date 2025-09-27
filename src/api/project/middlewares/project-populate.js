'use strict';

/**
 * `projects-populate` middleware
 */

const populate = {
  // Cover images for different devices
  desktopCoverImg: {
    fields: ['url', 'alternativeText'],
  },
  tabCoverImg: {
    fields: ['url', 'alternativeText'],
  },
  mobileCoverImg: {
    fields: ['url', 'alternativeText'],
  },
  // Image slider component
  imgSlider: {
    populate: {
      imagesSlides: {
        fields: ['url', 'alternativeText'],
      },
    },
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
  // YouTube videos component
  youtubVideos: {
    fields: ['name', 'title', 'youtubeLink'],
  },
  // Master plan component
  masterPlan: {
    fields: ['title', 'description'],
    populate: {
      fileUpload: {
        fields: ['url', 'alternativeText'],
      },
      planeMap: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
  // Project steps component
  projectSteps: {
    fields: ['title1', 'title2'],
    populate: {
      activities: {
        fields: ['title'],
        populate: {
          image: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
      projectSteps: {
        fields: ['title', 'description'],
      },
    },
  },
  // Activities component
  activities: {
    fields: ['title'],
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
  },
  // Canvas style component
  canvasStyle: {
    fields: ['title', 'description', 'visitUs'],
    populate: {
      visitSteps: {
        fields: ['title', 'description'],
      },
      projectHighlights: {
        fields: ['projectHighlights'],
        populate: {
          activities: {
            fields: ['title'],
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
        },
      },
    },
  },
  // Bellevuee style component
  bellevueeStyle: {
    fields: ['title', 'description'],
    populate: {
      activities: {
        fields: ['title'],
        populate: {
          image: {
            fields: ['url', 'alternativeText'],
          },
        },
      },
    },
  },
};


module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In projects-populate middleware.');

    await next();
  };
};
