import { test_eventMap } from './common';
import { debug, log } from '../src/debug';
import { emit } from '../src/emit';
import { metaEvents } from '../src/meta-events';
import { on } from '../src/subscribe';

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
    const expectedLogs = 3;
    const callEvents = async () => {
      await emit(test_eventMap)('event3')();
      await emit(test_eventMap)('event2')(false);
      await emit(test_eventMap)('event1')('asd', 0);
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
});
