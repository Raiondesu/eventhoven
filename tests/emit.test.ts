import cloneDeep from 'lodash.clonedeep';

import { emit, emitAll } from '../src/emit';
import { test_eventMap, test_promiseDelaySEC, msInSec } from './common';
import { eventMap } from '../src/events';

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
