import { eventMap } from '../src/events';
import { test_eventSignatures } from './common';

describe('eventMap', () => {
  it('maps signatures to maps', () => {
    const expectedResult: any = {};

    for (const eventName in test_eventSignatures) {
      const handler = test_eventSignatures[eventName as keyof typeof test_eventSignatures];

      expectedResult[eventName] = {
        arity: handler.length,
        handlers: new Map([[
          handler,
          false
        ]]),
      };
    }

    expect(eventMap(test_eventSignatures)).toStrictEqual(expectedResult);
  });
});
