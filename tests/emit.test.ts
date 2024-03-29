import cloneDeep from 'lodash.clonedeep';

import { emit, emitAll, eventMap, on } from '../src';
import { test_eventMap, test_promiseDelaySEC, Context, getCurrentSeconds } from './common';

describe('emit', () => {
  it(`doesn't affect the event-map`, () => {
    const prevEventMap = cloneDeep(test_eventMap);

    emit(test_eventMap)('event3')();

    expect(test_eventMap).toStrictEqual(prevEventMap);
  });

  it(`awaits the handlers correctly`, async () => {
    const timeBefore = getCurrentSeconds();

    await emit(test_eventMap)('promisedEvent')();

    const timeAfter = getCurrentSeconds();

    expect(timeAfter).toBeCloseTo(timeBefore + test_promiseDelaySEC, 1);
  });

  it('forwards correct context to handlers', async () => {
    const event = 'event3';

    const handler = jest.fn((ctx: Context) => {
      expect(ctx.event).toBe(event);
      expect(typeof ctx.unsubscribe).toBe('function');
    });
    const handlerOnce = jest.fn((ctx: Context) => {
      expect(ctx.event).toBe(event);
      expect(typeof ctx.unsubscribe).toBe('function');

      expect(test_eventMap[event].has(handlerOnce)).toBe(true);

      ctx.unsubscribe();

      expect(test_eventMap[event].has(handlerOnce)).toBe(false);
    });

    const onEvent = on(test_eventMap)(event);

    const amountWithoutHandlers = test_eventMap[event].size;
    const handlersAmount = 2;
    const amountOnce = 1;

    onEvent(handler, handlerOnce);

    expect(test_eventMap[event].size)
      .toBe(amountWithoutHandlers + handlersAmount);

    await emit(test_eventMap)(event)();

    expect(test_eventMap[event].size)
      .toBe(amountWithoutHandlers + handlersAmount - amountOnce);

    expect(handler.mock.calls.length).toBe(1);
    expect(handlerOnce.mock.calls.length).toBe(1);
  });

  it(`doesn't fail on invalid events`, async () => {
    const event: any = `event${Math.random()}`;

    const someHandler = () => {};

    let failed = false;

    try {
      await emit(test_eventMap)(
        // intentionally wrong event
        event
      )(someHandler);
    } catch (e) {
      console.error(e);

      failed = true;
    }

    expect(failed).toBe(false);

    expect(test_eventMap[event]).toBeUndefined();
  });

  it('processes return values correctly', async () => {
    const expectedNumberResults = 2;
    const expectedStringResults = 2;
    const expectedVoidResults = 1;

    const testMap = eventMap({
      randomNumer: () => Math.random(),
      string: () => 'default',
      void: (): void => {},
    });

    const testNumber = 42;
    const testString = 'test string';

    on(testMap)('randomNumer')(() => testNumber);
    on(testMap)('string')(() => testString);

    const numbers: number[] = await emit(testMap)('randomNumer')();
    const strings: string[] = await emit(testMap)('string')();
    const voids: void[] = await emit(testMap)('void')();

    expect(numbers.length).toBe(expectedNumberResults);
    expect(numbers).toContain(testNumber);
    expect(numbers.every(_ => typeof _ === 'number')).toBe(true);

    expect(strings.length).toBe(expectedStringResults);
    expect(strings).toContain(testString);
    expect(strings.every(_ => typeof _ === 'string')).toBe(true);

    expect(voids.length).toBe(expectedVoidResults);
    expect(voids.every(_ => typeof _ === 'undefined')).toBe(true);
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
