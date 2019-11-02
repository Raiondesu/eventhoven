import { eventMap, TEventMap, TEventContext } from '../src';

export const test_promiseDelayMS = 200;
export const msInSec = 1000;
export const test_promiseDelaySEC = test_promiseDelayMS / msInSec;

/**
 * Gets current time in seconds
 */
export const getCurrentSeconds = () => new Date().getTime() / msInSec;

export type Context = TEventContext<TEventMap>;

export const symbolEvent = Symbol('event');

export const test_eventSignatures = {
  event1(ctx: Context, arg1: string, arg2: number) {},
  event2(ctx: Context, arg: boolean) {},
  event3(ctx: Context) {},
  [symbolEvent](ctx: Context) {},
  promisedEvent(ctx: Context) {
    return new Promise<void>((r) => setTimeout(r, test_promiseDelayMS));
  },
};

export const test_eventMap = eventMap(test_eventSignatures);

export const hasHandler = <T extends TEventMap>(map: T, event: keyof T, handler) => map[event].has(handler);
