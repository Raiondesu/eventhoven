import { eventMap } from '../src';
import { test_eventSignatures } from './common';

describe('eventMap', () => {
  it('maps signatures to maps', () => {
    const expectedResult: any = {};

    for (const eventName in test_eventSignatures) if (
      test_eventSignatures.hasOwnProperty(eventName)
    ) {
      const handler = test_eventSignatures[eventName as keyof typeof test_eventSignatures];

      expectedResult[eventName] = new Map([[
        handler,
        false
      ]]);
    }

    expect(eventMap(test_eventSignatures)).toStrictEqual(expectedResult);
  });
});
