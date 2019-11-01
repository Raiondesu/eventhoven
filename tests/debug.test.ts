import { test_eventMap } from './common';
import { debug, emit, on, off } from '../src';

const originalLog = console.log;
const logMock = jest.fn();

describe('debug', () => {
  beforeAll(() => {
    console.log = logMock;
  });

  afterAll(() => {
    console.log = originalLog;

    expect(console.log).toBe(originalLog);
  });

  it('toggles logs, outputs to console', async () => {
    const expectedLogs = 5;
    const callEvents = async () => {
      /* logs: */ const h = () => {};
      /* - 1 - */ on(test_eventMap)('event3')(h);
      /* - 2 - */ await emit(test_eventMap)('event3')();
      /* - 3 - */ await emit(test_eventMap)('event2')(false);
      /* - 4 - */ await emit(test_eventMap)('event1')('asd', 0);
      /* - 5 - */ off(test_eventMap)('event3')(h);
    };

    console.log = logMock;

    debug({ enable: true });

    await callEvents();

    debug({ enable: false });

    await callEvents();

    expect(logMock.mock.calls.length).toBe(expectedLogs);
  });

  it('doesn\'t fail on invalid handler', async () => {
    let failed = false;

    try {
      on(test_eventMap)('event3')(
        // Intentional invalid handler
        undefined as any
      );

      debug({ enable: true });

      await emit(test_eventMap)('event3')();
    } catch (e) {
      failed = true;
    }

    expect(failed).toBe(false);
  });

  it('logs invalid handlers on emits', async () => {
    const expectedAmount = 2;
    const logs: string[] = [];
    const logWriter = jest.fn((...args) => logs.push(args.join(' ')));

    console.log = logWriter;

    const event: any = `event${Math.random()}`;

    let failed = false;

    try {
      debug({ enable: true });

      on(test_eventMap)(
        // Intentional invalid event
        event
      )(
        // Intentional invalid handler
        undefined as any
      );

      await emit(test_eventMap)(event)();
    } catch (e) {
      failed = true;
    }

    expect(failed).toBe(false);
    expect(logWriter.mock.calls.length).toBe(expectedAmount);
    expect(logs.length).toBe(expectedAmount);
    expect(logs[0]).toMatch(new RegExp(`\[SUBSCRIBE ${event} (INVALID)\]`));
    expect(logs[1]).toMatch(new RegExp(`\[EMIT ${event} (INVALID)\]`));
  });
});
