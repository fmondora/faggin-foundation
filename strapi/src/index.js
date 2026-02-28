'use strict';

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    // 1. Create admin user if none exists
    const adminCount = await strapi.db
      .query('admin::user')
      .count();

    if (adminCount === 0) {
      const superAdminRole = await strapi.db
        .query('admin::role')
        .findOne({ where: { code: 'strapi-super-admin' } });

      if (superAdminRole) {
        const hashedPassword = await strapi.service('admin::auth').hashPassword('Admin1234!');
        await strapi.db.query('admin::user').create({
          data: {
            firstname: 'Admin',
            lastname: 'Faggin',
            email: 'admin@faggin.local',
            password: hashedPassword,
            isActive: true,
            blocked: false,
            roles: [superAdminRole.id],
          },
        });
        strapi.log.info('[bootstrap] Admin user created: admin@faggin.local / Admin1234!');
      }
    }

    // 2. Set public API permissions (allow unauthenticated reads)
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const publicActions = [
        // Collection types - find & findOne
        'api::book.book.find',
        'api::book.book.findOne',
        'api::bio-section.bio-section.find',
        'api::bio-section.bio-section.findOne',
        'api::award.award.find',
        'api::award.award.findOne',
        'api::event.event.find',
        'api::event.event.findOne',
        'api::video.video.find',
        'api::video.video.findOne',
        'api::video-theme.video-theme.find',
        'api::video-theme.video-theme.findOne',
        'api::topic.topic.find',
        'api::topic.topic.findOne',
        'api::social-link.social-link.find',
        'api::social-link.social-link.findOne',
        // Single types - find
        'api::home-page.home-page.find',
        'api::about-page.about-page.find',
        'api::video-page.video-page.find',
        'api::events-page.events-page.find',
        'api::research-page.research-page.find',
        'api::site-config.site-config.find',
        // Custom vote routes
        'api::vote.vote.cast',
        'api::vote.vote.remove',
        'api::vote.vote.topicsWithCounts',
      ];

      for (const action of publicActions) {
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action, role: publicRole.id } });

        if (!existing) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .create({ data: { action, role: publicRole.id } });
        }
      }
      strapi.log.info('[bootstrap] Public API permissions configured');
    }

    // 3. Create full-access API token if none exists
    const tokenCount = await strapi.db
      .query('admin::api-token')
      .count();

    if (tokenCount === 0) {
      strapi.log.info('[bootstrap] No API tokens found. Create one via Strapi Admin > Settings > API Tokens');
    }
  },

  destroy() {},
};
