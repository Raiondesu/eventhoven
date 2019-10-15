import { eventMap } from './events';
import { on } from 'subscribe';
import { emit } from './emit';

const searchEvents = eventMap<{
  search(text: string): void;
  searchEnter(text: string): void;
  searchMove(x: number, y: string): void;
}>('search', 'searchEnter');

const onSearchEvent = on(searchEvents);

const s = onSearchEvent({
  name: 'search',
  handlers: (text) => {

  },
});

s(text => console.log(text));

const emitSearch = emit(searchEvents)('search');

