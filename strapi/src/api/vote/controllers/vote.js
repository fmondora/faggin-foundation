const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::vote.vote', ({ strapi }) => ({
  async cast(ctx) {
    const { topicId, userEmail } = ctx.request.body;
    if (!topicId || !userEmail) {
      return ctx.badRequest('topicId and userEmail are required');
    }
    const existing = await strapi.documents('api::vote.vote').findMany({
      filters: { userEmail: { $eq: userEmail }, topic: { documentId: { $eq: topicId } } },
    });
    if (existing.length > 0) {
      return ctx.badRequest('Already voted for this topic');
    }
    const vote = await strapi.documents('api::vote.vote').create({
      data: { userEmail, topic: topicId },
    });
    return { data: vote };
  },

  async remove(ctx) {
    const { topicId } = ctx.params;
    const { userEmail } = ctx.query;
    if (!userEmail) {
      return ctx.badRequest('userEmail is required');
    }
    const existing = await strapi.documents('api::vote.vote').findMany({
      filters: { userEmail: { $eq: userEmail }, topic: { documentId: { $eq: topicId } } },
    });
    if (existing.length === 0) {
      return ctx.notFound('Vote not found');
    }
    await strapi.documents('api::vote.vote').delete({ documentId: existing[0].documentId });
    return { data: { message: 'Vote removed' } };
  },

  async topicsWithCounts(ctx) {
    const { locale = 'it', userEmail } = ctx.query;
    const topics = await strapi.documents('api::topic.topic').findMany({
      locale,
      populate: { votes: true },
      sort: 'sortOrder:asc',
    });
    const result = topics.map((topic) => ({
      documentId: topic.documentId,
      title: topic.title,
      description: topic.description,
      sortOrder: topic.sortOrder,
      voteCount: topic.votes?.length || 0,
      userHasVoted: userEmail ? topic.votes?.some((v) => v.userEmail === userEmail) || false : false,
    }));
    return { data: result };
  },
}));
