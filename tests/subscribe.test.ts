import { on, emit } from '../src';
import { test_eventMap } from './common';

describe('subscribe', () => {
  it('adds handler to the event pool and removes it', () => {
    const handler = jest.fn();
    const event = 'event3';

    const cleanup = on(test_eventMap)(event)(handler);

    // expect handler to be there
    expect(
      test_eventMap[event].has(handler)
    ).toBe(true);

    // expect handler to not be "once"
    expect(
      test_eventMap[event].get(handler)
    ).toBe(false);

    cleanup();

    // expect handler to be gone
    expect(
      test_eventMap[event].has(handler)
    ).toBe(false);
  });

  it('adds a once-handler to the event pool and removes it upon event invocation', async () => {
    const handler = jest.fn();
    const event = 'event3';

    on(test_eventMap)({
      event,
      once: true,
    })(handler);

    // expect handler to be there
    expect(
      test_eventMap[event].has(handler)
    ).toBe(true);

    // expect handler to be "once"
    expect(
      test_eventMap[event].get(handler)
    ).toBe(true);

    await emit(test_eventMap)(event)();

    // expect handler to be gone
    expect(
      test_eventMap[event].has(handler)
    ).toBe(false);
  });
});
