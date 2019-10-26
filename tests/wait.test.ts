import { emit } from '../src/emit';
import { wait, harmonicWait } from '../src/wait';
import { test_eventMap, getCurrentSeconds, msInSec } from './common';

describe('wait', () => {
  it('awaits emit correctly', async () => {
    const event = 'promisedEvent';
    const delay = 500;
    const delayInSec = delay / msInSec;

    setTimeout(() => {
      emit(test_eventMap)(event)();
    }, delay);

    const timeBefore = getCurrentSeconds();

    await wait(test_eventMap)(event);

    const timeAfter = getCurrentSeconds();

    expect(timeAfter).toBeCloseTo(timeBefore + delayInSec, 1);
  });
});

describe('harmonic wait', () => {
  it('awaits emit correctly', async () => {
    const event = 'promisedEvent';
    const delay = 500;
    const delayInSec = delay / msInSec;

    setTimeout(() => {
      emit(test_eventMap)(event)();
    }, delay);

    const timeBefore = getCurrentSeconds();

    await harmonicWait(test_eventMap)(event)();

    const timeAfter = getCurrentSeconds();

    expect(timeAfter).toBeCloseTo(timeBefore + delayInSec, 1);
  });
});
