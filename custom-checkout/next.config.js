module.exports = {
  headers() {
    return [{
      source: '/purchase',
      headers: [{
        key: 'Cache-Control',
        value: 'public, s-maxage=2, stale-while-revalidate=60, stale-if-error=86400',
      }],
    }];
  }
};
