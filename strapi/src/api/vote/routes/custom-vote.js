module.exports = {
  routes: [
    { method: 'POST', path: '/votes/cast', handler: 'vote.cast', config: { policies: [] } },
    { method: 'DELETE', path: '/votes/remove/:topicId', handler: 'vote.remove', config: { policies: [] } },
    { method: 'GET', path: '/votes/topics-with-counts', handler: 'vote.topicsWithCounts', config: { policies: [] } },
  ],
};
