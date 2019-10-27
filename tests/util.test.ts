import { mapObject, doForAll } from '../src/util';
import { eventMap } from '../src';

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

      const dest = mapObject(src, (key, obj) => obj[key].toUpperCase());

      expect(dest).toEqual(destTest);
    });
  });

  describe('doForAll', () => {
    it('does an action for all props in the map', () => {
      const map = eventMap({
        event1() {},
        event2() {},
      });

      const results = {
        event1: 0,
        event2: 0,
      };

      const action = jest.fn(
        (_eventMap: any) => (
          eventName: PropertyKey
        ) => (args: number) => results[eventName] = args
      );

      const result = 1;

      doForAll(action)(map)(result);

      expect(results).toEqual(mapObject(map, () => result));
    });
  });
});
