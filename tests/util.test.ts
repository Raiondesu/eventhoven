import { mapObject } from '../src/util';

describe('util', () => {
  describe('mapObject', () => {
    it('maps props correctly', () => {
      const src = {
        a: 'a',
        b: 'b',
        c: 'c',
      };

      const destTest = {
        a: 'A',
        b: 'B',
        c: 'C',
      };

      const dest = mapObject(src, (key) => src[key].toUpperCase());

      expect(dest).toEqual(destTest);
    });
  });
});
