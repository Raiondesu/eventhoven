import { on, emit, once } from '../src';
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
    const event = 'event3';

    const handler = jest.fn(once(() => {}));

    on(test_eventMap)(event)(handler);

    // expect handler to be there
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(true);

    await emit(test_eventMap)(event)();

    expect(handler).toHaveBeenCalled();

    // expect handler to be gone
    expect(
      hasHandler(test_eventMap, event, handler)
    ).toBe(false);
  });

  it(`Adds a map to a new event`, () => {
    const event: any = `event${Math.random()}`;
    expect(test_eventMap[event]).toBeUndefined();

    const someHandler = () => {};

    let failed = false;

    try {
      on(test_eventMap)(
        // intentionally wrong event
        event
      )(someHandler);
    } catch (e) {
      failed = true;
    }

    expect(failed).toBe(false);

    expect(test_eventMap[event]).toBeUndefined();
  });
});
