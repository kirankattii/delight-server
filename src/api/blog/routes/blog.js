'use strict';

const middlewares = require('../../../../config/middlewares');

/**
 * blog router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::blog.blog',{
    config: {
        find: {
            middlewares: ['api::blog.blog-populate'],
        },
        findOne: {
            middlewares: ['api::blog.blog-populate'],
        }
    }
});
