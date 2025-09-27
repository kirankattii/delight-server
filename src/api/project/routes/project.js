'use strict';

/**
 * project router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::project.project',{
    config: {
        find: {
            middlewares: ['api::project.project-populate'],
        },
        findOne: {
            middlewares: ['api::project.project-populate'],
        }
    }
});
