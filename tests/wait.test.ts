import { emit, wait, harmonicWait, TEventMap, eventMap } from '../src';
import { test_eventMap, getCurrentSeconds, msInSec } from './common';

const waitTests = (_wait: (map: TEventMap, event: PropertyKey) => Promise<any[]>) => {
  const event = 'promisedEvent';
  const delay = 100;
  const delayInSec = delay / msInSec;

  beforeEach(() => {
    setTimeout(() => {
      emit(test_eventMap)(event)();
    }, delay);
  });

  it('awaits emit correctly', async () => {
    const timeBefore = getCurrentSeconds();

    await _wait(test_eventMap, event);

    const timeAfter = getCurrentSeconds();

    expect(timeAfter).toBeCloseTo(timeBefore + delayInSec, 1);
  });

  it('removes handler from the map', async () => {
    const expectedAmount = test_eventMap[event].length + 1;
    const execution = _wait(test_eventMap, event);

    expect(test_eventMap[event].length).toBe(expectedAmount);

    await execution;

    expect(test_eventMap[event].length).toBe(expectedAmount - 1);
  });
};

describe('wait', () => {
  waitTests((map, event) => wait(map)(event));
});

describe('harmonic wait', () => {
  waitTests((map, event) => harmonicWait(map)(event)());
});
