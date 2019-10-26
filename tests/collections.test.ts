import { eventCollection, emitCollection, subscribeCollection, unsubscribeCollection } from '../src';
import { test_eventMap } from './common';

describe('eventCollection', () => {
  const eventCol = eventCollection(test_eventMap);

  it('collects events', () => {
    const collection: Record<keyof typeof test_eventMap, Function> = {
      event1: expect.any(Function),
      event2: expect.any(Function),
      event3: expect.any(Function),
      promisedEvent: expect.any(Function),
    };

    expect(eventCol.emit).toMatchObject(collection);
    expect(eventCol.subscribe).toMatchObject(collection);
    expect(eventCol.unsubscribe).toMatchObject(collection);
  });

  
});
