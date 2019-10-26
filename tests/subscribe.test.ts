import { on } from '../src/subscribe';
import { test_eventMap } from './common';

describe('subscribe', () => {
  it('adds handler to the event pool and removes it', () => {
    const handler = jest.fn();
    const event = 'event3';

    const cleanup = on(test_eventMap)(event)(handler);

    // expect handler to be there
    expect(
      test_eventMap[event].handlers.has(handler)
    ).toBe(true);

    // expect handler to not be once
    expect(
      test_eventMap[event].handlers.get(handler)
    ).toBe(false);

    cleanup();

    // expect handler to be there
    expect(
      test_eventMap[event].handlers.has(handler)
    ).toBe(false);
  });
});
