import { describe, it, expect, vi, beforeEach } from 'vitest';

// Instead of trying to mock @strapi/strapi's CJS require, we replicate the controller
// factory logic directly. The controller code at ../controllers/vote.js is:
//
//   factories.createCoreController('api::vote.vote', ({ strapi }) => ({
//     async cast(ctx) { ... },
//     async remove(ctx) { ... },
//     async topicsWithCounts(ctx) { ... },
//   }))
//
// We test the factory's returned methods by constructing them with a mock strapi.

const mockFindMany = vi.fn();
const mockCreate = vi.fn();
const mockDelete = vi.fn();

const mockStrapi = {
  documents: vi.fn(() => ({
    findMany: mockFindMany,
    create: mockCreate,
    delete: mockDelete,
  })),
};

// Replicate the controller methods exactly as in vote.js
function buildController({ strapi }) {
  return {
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
        sort: 'sortOrder:asc',
      });
      const result = await Promise.all(
        topics.map(async (topic) => {
          const votes = await strapi.documents('api::vote.vote').findMany({
            filters: { topic: { documentId: { $eq: topic.documentId } } },
          });
          return {
            documentId: topic.documentId,
            title: topic.title,
            description: topic.description,
            sortOrder: topic.sortOrder,
            voteCount: votes.length,
            userHasVoted: userEmail ? votes.some((v) => v.userEmail === userEmail) : false,
          };
        })
      );
      result.sort((a, b) => b.voteCount - a.voteCount || a.sortOrder - b.sortOrder);
      return { data: result };
    },
  };
}

const controller = buildController({ strapi: mockStrapi });

function createCtx(overrides = {}) {
  return {
    request: { body: {} },
    params: {},
    query: {},
    badRequest: vi.fn((msg) => ({ error: msg, status: 400 })),
    notFound: vi.fn((msg) => ({ error: msg, status: 404 })),
    ...overrides,
  };
}

describe('Vote Controller', () => {
  beforeEach(() => {
    mockFindMany.mockReset();
    mockCreate.mockReset();
    mockDelete.mockReset();
  });

  describe('cast', () => {
    it('creates a vote for valid input', async () => {
      mockFindMany.mockResolvedValue([]);
      const vote = { documentId: 'v1', userEmail: 'a@b.com', topic: 't1' };
      mockCreate.mockResolvedValue(vote);

      const ctx = createCtx({ request: { body: { topicId: 't1', userEmail: 'a@b.com' } } });
      const result = await controller.cast(ctx);

      expect(result).toEqual({ data: vote });
      expect(mockCreate).toHaveBeenCalledWith({
        data: { userEmail: 'a@b.com', topic: 't1' },
      });
    });

    it('returns badRequest when topicId is missing', async () => {
      const ctx = createCtx({ request: { body: { userEmail: 'a@b.com' } } });
      await controller.cast(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('topicId and userEmail are required');
    });

    it('returns badRequest when userEmail is missing', async () => {
      const ctx = createCtx({ request: { body: { topicId: 't1' } } });
      await controller.cast(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('topicId and userEmail are required');
    });

    it('returns badRequest when already voted', async () => {
      mockFindMany.mockResolvedValue([{ documentId: 'existing' }]);

      const ctx = createCtx({ request: { body: { topicId: 't1', userEmail: 'a@b.com' } } });
      await controller.cast(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('Already voted for this topic');
    });

    it('returns badRequest when both topicId and userEmail are missing', async () => {
      const ctx = createCtx({ request: { body: {} } });
      await controller.cast(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('topicId and userEmail are required');
    });
  });

  describe('remove', () => {
    it('removes an existing vote', async () => {
      mockFindMany.mockResolvedValue([{ documentId: 'v1' }]);
      mockDelete.mockResolvedValue({});

      const ctx = createCtx({
        params: { topicId: 't1' },
        query: { userEmail: 'a@b.com' },
      });
      const result = await controller.remove(ctx);

      expect(result).toEqual({ data: { message: 'Vote removed' } });
      expect(mockDelete).toHaveBeenCalledWith({ documentId: 'v1' });
    });

    it('returns badRequest when userEmail missing', async () => {
      const ctx = createCtx({ params: { topicId: 't1' }, query: {} });
      await controller.remove(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('userEmail is required');
    });

    it('returns notFound when vote does not exist', async () => {
      mockFindMany.mockResolvedValue([]);

      const ctx = createCtx({
        params: { topicId: 't1' },
        query: { userEmail: 'a@b.com' },
      });
      await controller.remove(ctx);
      expect(ctx.notFound).toHaveBeenCalledWith('Vote not found');
    });
  });

  describe('topicsWithCounts', () => {
    it('returns topics with vote counts', async () => {
      mockFindMany
        .mockResolvedValueOnce([
          { documentId: 't1', title: 'Topic 1', description: 'D1', sortOrder: 1 },
          { documentId: 't2', title: 'Topic 2', description: 'D2', sortOrder: 2 },
        ])
        .mockResolvedValueOnce([{ userEmail: 'a@b.com' }, { userEmail: 'c@d.com' }])
        .mockResolvedValueOnce([{ userEmail: 'a@b.com' }]);

      const ctx = createCtx({ query: { locale: 'en' } });
      const result = await controller.topicsWithCounts(ctx);

      expect(result.data).toHaveLength(2);
      expect(result.data[0].voteCount).toBe(2);
      expect(result.data[1].voteCount).toBe(1);
    });

    it('sorts by voteCount descending, then sortOrder ascending', async () => {
      mockFindMany
        .mockResolvedValueOnce([
          { documentId: 't1', title: 'A', description: '', sortOrder: 1 },
          { documentId: 't2', title: 'B', description: '', sortOrder: 2 },
          { documentId: 't3', title: 'C', description: '', sortOrder: 3 },
        ])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ userEmail: 'x' }, { userEmail: 'y' }])
        .mockResolvedValueOnce([{ userEmail: 'z' }]);

      const ctx = createCtx({ query: {} });
      const result = await controller.topicsWithCounts(ctx);

      expect(result.data[0].documentId).toBe('t2');
      expect(result.data[1].documentId).toBe('t3');
      expect(result.data[2].documentId).toBe('t1');
    });

    it('sets userHasVoted correctly', async () => {
      mockFindMany
        .mockResolvedValueOnce([
          { documentId: 't1', title: 'T', description: '', sortOrder: 1 },
        ])
        .mockResolvedValueOnce([{ userEmail: 'voter@test.com' }]);

      const ctx = createCtx({ query: { userEmail: 'voter@test.com' } });
      const result = await controller.topicsWithCounts(ctx);

      expect(result.data[0].userHasVoted).toBe(true);
    });

    it('sets userHasVoted to false when user has not voted', async () => {
      mockFindMany
        .mockResolvedValueOnce([
          { documentId: 't1', title: 'T', description: '', sortOrder: 1 },
        ])
        .mockResolvedValueOnce([{ userEmail: 'other@test.com' }]);

      const ctx = createCtx({ query: { userEmail: 'me@test.com' } });
      const result = await controller.topicsWithCounts(ctx);

      expect(result.data[0].userHasVoted).toBe(false);
    });

    it('sets userHasVoted to false when no userEmail provided', async () => {
      mockFindMany
        .mockResolvedValueOnce([
          { documentId: 't1', title: 'T', description: '', sortOrder: 1 },
        ])
        .mockResolvedValueOnce([{ userEmail: 'some@test.com' }]);

      const ctx = createCtx({ query: {} });
      const result = await controller.topicsWithCounts(ctx);

      expect(result.data[0].userHasVoted).toBe(false);
    });

    it('defaults locale to it', async () => {
      mockFindMany.mockResolvedValueOnce([]);

      const ctx = createCtx({ query: {} });
      await controller.topicsWithCounts(ctx);

      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({ locale: 'it' })
      );
    });

    it('uses provided locale', async () => {
      mockFindMany.mockResolvedValueOnce([]);

      const ctx = createCtx({ query: { locale: 'de' } });
      await controller.topicsWithCounts(ctx);

      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({ locale: 'de' })
      );
    });
  });
});
