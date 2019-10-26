import cloneDeep from 'lodash.clonedeep';

import { emit } from '../src/emit';
import { test_eventMap, test_promiseDelaySEC, msInSec } from './common';


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
