import { eventMap } from '../src/events';

export const test_promiseDelayMS = 1000;
export const msInSec = 1000;
export const test_promiseDelaySEC = test_promiseDelayMS / msInSec;

export const test_eventSignatures = {
  event1(arg1: string, arg2: number) {},
  event2(arg: boolean) {},
  event3() {},
  promisedEvent() {
    return new Promise<void>((r) => setTimeout(r, test_promiseDelayMS));
  },
};

export const test_eventMap = eventMap(test_eventSignatures);
