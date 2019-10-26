import { eventMap } from '../src/events';

describe('eventMap', () => {
  it('maps signatures to maps', () => {
    const signatures = {
      event1(arg1: string, arg2: number) {},
      event2(arg: boolean) {},
      event3() {},
    };

    const expectedResult = {
      event1: {
        arity: 2,
        handlers: new Map([
          [signatures.event1, false]
        ]),
      },

      event2: {
        arity: 1,
        handlers: new Map([
          [signatures.event2, false]
        ]),
      },

      event3: {
        arity: 0,
        handlers: new Map([
          [signatures.event3, false]
        ]),
      },
    };

    expect(eventMap(signatures)).toStrictEqual(expectedResult);
  });
});
