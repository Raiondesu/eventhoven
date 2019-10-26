import cloneDeep from 'lodash.clonedeep';

import { emit, emitAll } from '../src/emit';
import { test_eventMap, test_promiseDelaySEC, msInSec, Context } from './common';
import { eventMap } from '../src/events';
import { on } from '../src/subscribe';

describe('emit', () => {
  it(`doesn't affect the event-map`, () => {
    const prevEventMap = cloneDeep(test_eventMap);

    emit(test_eventMap)('event3')();

    expect(test_eventMap).toStrictEqual(prevEventMap);
  });

  it(`awaits the handlers correctly`, async () => {
    /**
     * Gets current time in seconds
     */
    const getCurrentSeconds = () => new Date().getTime() / msInSec;

    const timeBefore = getCurrentSeconds();

    await emit(test_eventMap)('promisedEvent')();

    const timeAfter = getCurrentSeconds();

    expect(timeAfter).toBeCloseTo(timeBefore + test_promiseDelaySEC, 1);
  });

  it('forwards correct context to handlers', async () => {
    const event = 'event3';

    const handler = jest.fn((ctx: Context) => {
      expect(ctx.event).toBe(event);
      expect(ctx.once).toBe(false);
    });
    const handlerOnce = jest.fn((ctx: Context) => {
      expect(ctx.event).toBe(event);
      expect(ctx.once).toBe(true);
    });

    on(test_eventMap)(event)(handler);
    on(test_eventMap)(event, true)(handlerOnce);

    await emit(test_eventMap)(event)();

    expect(handler.mock.calls.length).toBe(1);
    expect(handlerOnce.mock.calls.length).toBe(1);
  });
});

describe('emitAll', () => {
  it('emits all events in a map', async () => {
    const mockEvent1 = jest.fn();
    const mockEvent2 = jest.fn();
    const mockEvent3 = jest.fn();

    const map = eventMap({
      event1() {
        mockEvent1();
      },
      event2() {
        mockEvent2();
      },
      event3() {
        mockEvent3();
      },
    });

    await Promise.all(
      Object.values(
        emitAll(map)({
          event1: [],
          event2: [],
          event3: [],
        })
      )
    );

    // Expect all handlers to be called once
    expect(mockEvent1.mock.calls.length).toBe(1);
    expect(mockEvent2.mock.calls.length).toBe(1);
    expect(mockEvent3.mock.calls.length).toBe(1);
  });
});
