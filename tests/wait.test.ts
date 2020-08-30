import { emit, wait, harmonicWait, TEventMap } from '../src';
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
    const expectedAmount = test_eventMap[event].size + 1;
    const execution = _wait(test_eventMap, event);

    expect(test_eventMap[event].size).toBe(expectedAmount);

    await execution;

    expect(test_eventMap[event].size).toBe(expectedAmount - 1);
  });
};

describe('wait', () => {
  waitTests((map, event) => wait(map)(event));
});

describe('harmonic wait', () => {
  waitTests((map, event) => harmonicWait(map)(event)());
});
