import { eventMap, TEventMap, ISubscribeOptions } from '../src';

export const test_promiseDelayMS = 1000;
export const msInSec = 1000;
export const test_promiseDelaySEC = test_promiseDelayMS / msInSec;

/**
 * Gets current time in seconds
 */
export const getCurrentSeconds = () => new Date().getTime() / msInSec;

export type Context = ISubscribeOptions<TEventMap>;

export const test_eventSignatures = {
  event1(ctx: Context, arg1: string, arg2: number) {},
  event2(ctx: Context, arg: boolean) {},
  event3(ctx: Context) {},
  promisedEvent(ctx: Context) {
    return new Promise<void>((r) => setTimeout(r, test_promiseDelayMS));
  },
};

export const test_eventMap = eventMap(test_eventSignatures);
