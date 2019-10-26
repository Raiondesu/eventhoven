import cloneDeep from 'lodash.clonedeep';

import { emit } from '../src/emit';
import { test_eventMap } from './common';


describe('emit', () => {
  it(`doesn't affect the event-map`, () => {
    const prevEventMap = cloneDeep(test_eventMap);

    emit(test_eventMap)('event3')();

    expect(test_eventMap).toStrictEqual(prevEventMap);
  });
});
