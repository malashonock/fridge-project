import { group } from './group.util';

describe('group', () => {
  it('should return a capturing group', () => {
    expect(group('[A-Z]+')).toBe('([A-Z]+)');
  });
});
