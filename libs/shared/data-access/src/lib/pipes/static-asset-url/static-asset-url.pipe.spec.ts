import { StaticAssetUrlPipe } from './static-asset-url.pipe';

describe('StaticAssetUrlPipe', () => {
  let pipe: StaticAssetUrlPipe;
  const STATIC_ASSETS_BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    pipe = new StaticAssetUrlPipe({
      STATIC_ASSETS_BASE_URL,
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('given a non-empty url, should prepend it with the server static folder url', () => {
    const url = '/images/tiramisu.png';
    expect(pipe.transform(url)).toBe(STATIC_ASSETS_BASE_URL + url);
  });

  it('given an empty url, should return null', () => {
    expect(pipe.transform('')).toBeNull();
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform(undefined)).toBeNull();
  });
});
