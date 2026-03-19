'use strict';

/**
 * temps-fort service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::temps-fort.temps-fort');
