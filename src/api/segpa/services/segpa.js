'use strict';

/**
 * segpa service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::segpa.segpa');
