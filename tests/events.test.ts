import { eventMap, emit } from '../src';
import { test_eventSignatures } from './common';

describe('eventMap', () => {
  it('maps signatures to maps', () => {
    const expectedResult: any = {};

    [
      ...Object.keys(test_eventSignatures),
      ...Object.getOwnPropertySymbols(test_eventSignatures)
    ].forEach(eventName => {
      const handler = test_eventSignatures[eventName as keyof typeof test_eventSignatures];

      expectedResult[eventName] = new Map([[
        handler,
        expect.any(Function)
      ]]);
    });

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

  test('it processes symbols too', async () => {
    const event = Symbol('event');

    const options = {
      [event]: jest.fn(),
    };

    const map = eventMap(options);

    expect(map[event].size).toBe(1);

    expect(map[event]).toEqual(new Map([[options[event], expect.any(Function)]]));

    await emit(map)(event)();

    expect(options[event]).toHaveBeenCalled();
    expect(options[event].mock.calls.length).toBe(1);
  });
});
