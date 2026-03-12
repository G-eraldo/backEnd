'use strict';

/**
 * voyage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::voyage.voyage');
