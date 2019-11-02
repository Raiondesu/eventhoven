import { off, on } from '../src';
import { test_eventMap, test_eventSignatures, hasHandler } from './common';

describe('unsubscribe', () => {
  it('removes a handler from the event', () => {
    const event = 'event3';
    const handler = test_eventSignatures[event];

    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(true);

    off(test_eventMap)(event)(handler);

    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(false);

    //cleanup

    on(test_eventMap)(event)(handler);
  });

  it('removes all handlers from the event, if none are passed', () => {
    const event = 'event3';

    expect(
      test_eventMap[event].size
    ).toBeGreaterThan(0);

    off(test_eventMap)(event)();

    expect(
      test_eventMap[event].size
    ).toBe(0);

    //cleanup

    on(test_eventMap)(event)(test_eventSignatures[event]);
  });

  it(`doesn't unsubscribe invalid handlers`, () => {
    const someHandler = () => {};

    const expectedAmount = test_eventMap.event3.size;

    off(test_eventMap)('event3')(someHandler);

    expect(test_eventMap.event3.size).toBe(expectedAmount);
  });

  it(`doesn't fail on invalid events`, () => {
    const event: any = `event${Math.random()}`;

    let failed = false;

    try {
      off(test_eventMap)(
        // intentionally wrong event
        event
      )();
    } catch (e) {
      failed = true;
    }

    expect(failed).toBe(false);

    expect(test_eventMap[event]).toBeUndefined();
  });
});
