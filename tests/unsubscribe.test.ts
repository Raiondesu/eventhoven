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
      test_eventMap[event].length
    ).toBeGreaterThan(0);

    off(test_eventMap)(event)();

    expect(
      test_eventMap[event].length
    ).toBe(0);

    //cleanup

    on(test_eventMap)(event)(test_eventSignatures[event]);
  });
});
