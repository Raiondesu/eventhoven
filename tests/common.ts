import { eventMap } from '../src/events';

export const test_eventSignatures = {
  event1(arg1: string, arg2: number) {},
  event2(arg: boolean) {},
  event3() {},
};

export const test_eventMap = eventMap(test_eventSignatures);
