import { eventMap, emit } from '../src';
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
        expect.any(Function)
      ]]);
    }

    expect(eventMap(test_eventSignatures)).toStrictEqual(expectedResult);
  });

  test('it is impossible to unsub the default handler from within itself', async () => {
    const options = {
      event({ unsubscribe }) {
        unsubscribe();
      },
    };
    const map = eventMap(options);

    expect(map.event.size).toBe(1);

    await emit(map)('event')();

    expect(map.event.size).toBe(1);
  });
});
