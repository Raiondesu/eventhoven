import { test_eventSignatures, test_eventMap } from './common';
import { Eventhoven } from '../src';

describe('Eventhoven', () => {
  it('creates a correct class', () => {
    const eventh = new Eventhoven(test_eventSignatures);

    expect(eventh).toBeInstanceOf(Eventhoven);
  });

  it('supports inheritance', () => {
    const eventh = new Eventhoven(test_eventSignatures);

    const myeventh = new class extends Eventhoven<typeof test_eventSignatures> {
      constructor() {
        super(test_eventSignatures);
      }
    };

    expect(eventh).toBeInstanceOf(Eventhoven);
    expect(myeventh).toBeInstanceOf(Eventhoven);
  });

  it('proxies events properly', async () => {
    const handler = jest.fn();
    const handler2 = jest.fn();
    const eventh = new Eventhoven(test_eventSignatures);

    await eventh.emit('event3');

    expect(handler).not.toHaveBeenCalled();

    eventh.on('event3', handler);
    await eventh.emit('event3');

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler2).not.toHaveBeenCalled();

    // If we want to re-assign another handler to an event - just pipe the calls
    eventh
      .off('event3', handler)
      .on('event3', handler2);
    await eventh.emit('event3');

    expect(handler2).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('correctly flattens FP API in static methods', () => {
    const handlerClass = jest.fn();
    const handlerMap = jest.fn();
    const test_eventClass = new Eventhoven(test_eventSignatures);

    Eventhoven.on(test_eventClass, 'event3', handlerClass);
    Eventhoven.emit(test_eventClass, 'event3'/* , no third argument since this event has no parameters */);

    expect(handlerClass).toHaveBeenCalledTimes(1);

    Eventhoven.off(test_eventClass, 'event3', handlerClass);
    Eventhoven.emit(test_eventClass, 'event3'/* , no third argument since this event has no parameters */);

    // Since the `off` method should have worked, the handler shouldn't have been called
    expect(handlerClass).toHaveBeenCalledTimes(1);


    Eventhoven.on(test_eventMap, 'event3', handlerMap);
    Eventhoven.emit(test_eventMap, 'event3'/* , no third argument since this event has no parameters */);

    expect(handlerMap).toHaveBeenCalledTimes(1);

    Eventhoven.off(test_eventMap, 'event3', handlerMap);
    Eventhoven.emit(test_eventMap, 'event3'/* , no third argument since this event has no parameters */);

    expect(handlerMap).toHaveBeenCalledTimes(1);
  });
});
