module.exports = {
  name: 'auth',
  exposes: {
    './Module': 'apps/auth/src/app/modules/remote-entry/remote-entry.module.ts',
  },
};
