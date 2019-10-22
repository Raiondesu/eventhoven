# eventhoven

> Compose events effortlessly 🎵

[![npm](https://img.shields.io/npm/v/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "NPM package page")
[![npm](https://img.shields.io/npm/dt/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/vue-simple-suggest "Downloads per month, but who cares?")

## What is this?
It's a simple type-safe event manager library, less than 1KB (gzipped).

It provides a powerful set of tools for creating and composing event managers.\
In other words, it manages event managers!

A main list of features includes (but not limited to):
- Full tree-shaking
- Functional-style API
- Versatile plugin system (using [meta-events](#meta-events))
- Fully type-safe - each event remembers its type signature
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all funcions are easily substitutable using dependency injection
    as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- **DRY** and **KISS**

## API

### TLDR

<details><summary>Click to expand</summary>

```ts
import {
  eventMap,
  emit,
  subscribe,
  unsubscribe,
  emitCollection
} from 'eventhoven';

// Create event map
const domEvents = eventMap({
  // key - event name,
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  keyup(e: KeyboardEvent) {
    // In this example, the handler dispatches the events
    window.dispatchEvent(e);
  },
  keydown(e: KeyboardEvent) { window.dispatchEvent(e); },
  click(e: MouseEvent) { window.dispatchEvent(e); },
  // ..some other events
});

// Create an event emitter collection
const dom = emitCollection(domEvents);

// Emits the `click` event from `domEvents`
dom.click(
  // Typed arguments here
  new MouseEvent('click')
);

dom.click(
  // TS error here
  new KeyboardEvent('enter')
);

// A shorthand for a single emitter
const emitDom = emit(domEvents);

const emitKeyup = emitDom(
  // Autocomplete on events here
  'keyup'
);

// Type-safe keyup emit
emitKeyup(new KeyboardEvent('enter'));

// Subscribe and unsubscribe work the same way:
const clickHandler = (e) => console.log('clicked something!', e);

const onDomEvent = subscribe(domEvents);

const onDomClick = onDomEvent('click');
const unsubFromDomClick = onDomClick(clickHandler);

dom.click(new MouseEvent('click'));
// `clickHandler` is invoked here

const offDomEvent = unsubsccribe(domEvents);
const offDomClick = offDomEvent('click');

offDomClick(clickHandler); // unsubscribed `clickHandler` from the event

// `subscribe` and `unsubscribe` have shorthands:
import { on, off } from 'eventhoven';

// Meta-events are events that are emitted on internal eventhoven actions
import { metaEvents, meta } from 'eventhoven';

on(metaEvents)('subscribe')((eventMap, eventName, handler) => console.log(
  `somebody subscribed to ${eventName} with ${handler}`
));

// "simulate" subscribtion to an event using a meta-event `subscribe`
meta.subscribe(dom, 'click', console.log);

// Meta-events can be used for plugins, like the `debug` plugin:
import { debug } from 'eventhoven';

debug(true);
// Now all emits, subs and unsubs are logged to the console!

debug(false);
// Now they aren't
```

</details>
