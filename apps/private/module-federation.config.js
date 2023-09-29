module.exports = {
  name: 'private',
  exposes: {
    './Module': 'apps/private/src/app/remote-entry/entry.module.ts',
  },
};
