import { on, emit } from '../src';
import { test_eventMap, hasHandler, Context } from './common';

describe('subscribe', () => {
  it('adds handler to the event pool and removes it', () => {
    const handler = jest.fn();
    const event = 'event3';

    const cleanup = on(test_eventMap)(event)(handler);

    // expect handler to be there
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(true);

    cleanup();

    // expect handler to be gone
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(false);
  });

  it('adds a once-handler to the event pool and removes it upon event invocation', async () => {
    const handler = jest.fn(({ unsubscribe }: Context) => {
      unsubscribe();
    });
    const event = 'event3';

    on(test_eventMap)(event)(handler);

    // expect handler to be there
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(true);

    await emit(test_eventMap)(event)();

    // expect handler to be gone
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(false);
  });
});
