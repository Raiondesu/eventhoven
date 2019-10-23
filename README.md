# eventhoven

> Compose events effortlessly 🎵

[![npm](https://img.shields.io/npm/v/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "NPM package page")
[![npm](https://img.shields.io/npm/dm/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/vue-simple-suggest "Downloads per month, but who cares?")
[![size](https://img.shields.io/bundlephobia/minzip/eventhoven@next?style=flat-square)](https://bundlephobia.com/result?p=eventhoven@next "minzipped size")

## What is this?
It's a simple type-safe event manager library for browser and node, less than 1KB (gzipped).

It provides a powerful set of tools for creating and composing event managers.\
In other words, it manages event managers!

A main list of features includes (but not limited to):
- Full tree-shaking
- Functional-style API
- Multiple event arguments
- Event names can also be symbols (private events)
- Versatile plugin system (using [meta-events](#meta-events))
- Fully type-safe - each event-map remembers its event names and type signature (no need for hacky enums)
- All functions are curried and point-free, which makes them easier to use in functional environment
  (for example, with [`ramda`](github.com/ramda/ramda) and similar tools)
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all funcions are easily substitutable using dependency injection
    as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- Code-generation-friendly:\
  Due to the SRP, all functions have a very limited number of ways of invocation.\
  This allows to automatically generate efficient code (for example, CRUD events) for this library without concerns about its stability.
- **KISS** and **DRY** ([kinda](https://github.com/raiondesu-experiments/eventhoven/blob/f22bef199e0a053bd62f4c28761c1519f6166a7c/src/collections.ts#L21))

## Disclaimer

`eventhoven`'s main concern is type-safety at every step, so all the code examples will be written in [typescript](https://www.typescriptlang.org).

## Table of Contents

- [eventhoven](#eventhoven)
  - [What is this?](#what-is-this)
  - [Disclaimer](#disclaimer)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Importing](#importing)
    - [Simple usage examples](#simple-usage-examples)
  - [API](#api)
    - [`eventMap`](#eventmap)
    - [`emit`](#emit)


## Installation

**npm**:
```bash
npm i -S eventhoven
```

**module**: see [importing](#importing)

Currently, only installation through [`npm`](https://www.npmjs.com/package/eventhoven) or `script[type=module]` is supported.\
No single-file bundles just yet.

### Importing

```ts
// TS-module (pure typescript),
// allows compilation settings to be set from the project config
import { emit, on, off } from 'eventhoven/src';

// ES-module (node, typescript)
import { emit, on, off } from 'eventhoven';

// ESNext (no polyfills for esnext)
import { emit, on, off } from 'eventhoven/dist/esnext';

// ES-module (browser)
import { emit, on, off } from 'https://unpkg.com/eventhoven/dist/es';

// Classic node commonjs
const { emit, on, off } = require('eventhoven/dist/js');
```

### Simple usage examples


<details>
<summary><b>Example 1</b></summary>

```ts
// Essential imports
import { eventMap, emit, on, off } from 'eventhoven';

const emojiEvents = eventMap({
  '👩'(emoji: '👨' | '👩') {},
  '🌈'(emoji: '🦄' | '🌧') {},
  '🎌':(emoji: '👘' | '🍣' | '🚗', amount: number) {},
});

on(emojiEvents)('🎌')(
  (emoji, amount) => console.log(`Yay!, ${amount} of ${emoji}-s from japan!`)
);

on(emojiEvents)('🎌')(
  // Returning promises is also allowed (example API from http://www.sushicount.com/api)
  (emoji, amount) => fetch('http://api.sushicount.com/add-piece-of-sushi/')
    .then(_ => _.json())
    .then(resp => console.log(`Yay!, ${resp.pieces_of_sushi} of ${emoji}-s loaded from sushicount!`))
);

// It's possible to await execution of all event handlers too
await emit(emojiEvents)(
  // Autocomplete for event names here!
  '🎌'
)(
  // Autocomplete for arguments here!
  '🍣', 10
);
// Console output:
// => Yay!, 10 🍣-s from japan!
// => Yay!, 11 🍣-s loaded from sushicount!
```
</details>

<details>
<summary><b>Example 2</b></summary>

```ts
import { eventMap, emit, on, off } from 'eventhoven';

type Todo = { done: boolean; text: string; };

const todos: Todo[] = [];

// Event-map declaration
const todoEvents = eventMap({
  // key - event name,
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  'todo-added'(newTodo: Todo, todos: Todo[]) {},
  'done-change'(todo: Todo, newDone: boolean) {},
  'text-change'(todo: Todo, newText: string) {},
});

const unsubFromAddTodo = on(todoEvents)('todo-added')(
  (todo, todos) => todos.push(todo)
);

// `addingTodos` is a promise that resolves
// when all event subscribers are done executing
const addingTodos = emit(todoEvents)('todo-added')(
  { done: false, text: 'new todo' },
  todos
);
// Now, `todos` contains the new todo
```
</details>

---

## API

General exports are the following:

name | type | description
-----|------|--------------------
[`eventMap`](#eventmap) | `function` | Event-map factory
[`emit`](#emit) | `function` | Event emitter factory
[`subscribe`](#subscribe) | `function` | Event subscriber factory
[`subscribeToAll`](#subscribetoall) | `function` | Event subscriber factory for all events in a collection
[`on`](#subscribe) | `function` | Alias for [`subscribe`](#subscribe)
[`onAll`](#subscribetoall) | `function` | Alias for [`subscribeAll`](#subscribetoall)
[`unsubscribe`](#unsubscribe) | `function` | Event unsubscriber factory
[`unsubscribeFromAll`](#unsubscribefromall) | `function` | Event unsubscriber factory
[`off`](#unsubscribe) | `function` | Alias for [`unsubscribe`](#unsubscribe)
[`offAll`](#unsubscribefromall) | `function` | Alias for [`unsubscribeFromAll`](#unsubscribefromall)
[`emitCollection`](#emitcollection) | `function` | Creates a collection of event-emitters from an event-map
[`subscribeCollection`](#subscribecollection) | `function` | Creates a collection of event-subscribers from an event-map
[`unsubscribeCollection`](#unsubscribecollection) | `function` | Creates a collection of event-unsubscribers from an event-map
[`eventCollection`](#eventcollection) | `function` | Creates a collection of the three previous collections from an event-map
[`debug`](#debug) | `function` | Sets the debug mode (if enabled - logs all events to the console)
[`metaEvents`](#metaevents) | `object` | A meta-event-map. Can be used to subscribe to the internal eventhoven's events
[`emitMeta`](#emitmeta) | `function` | A meta-event emitter. An [`emit`](#emit) function created for [`metaEvents`](#metaevents)


### `eventMap`
> Creates an event-map from event signatures

**Parameters**:

name | type | description
-----|------|---------------
`events` | [`TEventSignatures`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L25) | a collection of event signatures

**Returns**: [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8)

This function is the main "entry point" to the whole event management pipeline.
It constructs a base storage for events and their handlers, which is then used by all of the other functions.

In other words, to start working with events in `eventhoven` you start by creating an event-map:
```ts
import { eventMap } from 'eventhoven';

// `keyboardEvents` should now be used for all event interactions
const keyboardEvents = eventMap({
  keyup(e: KeyboardEvent) {},
  keydown(e: KeyboardEvent) {},
  keypress(e: KeyboardEvent, modifier?: string) {
    // This is a default handler for the event, it's always executed
    console.log('modifier:', modifier);
  },
});
```

In this example, keys in `keyboardEvents` correspond to event names ('keyup', 'keydown', etc.) and values contain handler maps and amount of arguments for a given event.

<details>
<summary>Here, `keyboardEvents`</summary> is equal to the following object:

```ts
const keyboardEvents = {
  // Name of the event
  keyup: {
    // Amount of arguments for the event handlers
    arity: 1,

    // Collection of the event handlers
    handlers: new Map([
      // Notice the default event handler from the event-map
      (e: KeyboardEvent) => {},

      // Do we execute this event handler only once?
      false
    ])
  },
  keydown: {
    arity: 1,
    handlers: new Map([(e: KeyboardEvent) => {}, false])
  },
  keypress: {
    arity: 2,
    handlers: new Map([
      // Notice the default event handler from the event-map
      (e: KeyboardEvent, modifier?: string) => { console.log('modifier:', modifier); },
      false
    ])
  },
}
```
</details>

It's also possible to add new events to the event-map at runtime (by creating a new event-map 😁):

```ts
const inputEvents = {
  ...keyboardEvents,
  ...eventMap({
    'mouse-click'(e: MouseEvent) {},
  }),
}

// Still have type inference here!
emit(inputEvents)('mouse-click')
```

### `emit`

> Creates event emitters for an event-map

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to emit events from
`event` | `string | number | symbol` | An event name to emit for a given event-map
`...args` | `any` | Arguments for the specific event, spread

**Returns**: `Promise<void>` - a promise that is resolved when all event handlers have finished their execution

> ⚠ **DISCLAIMER** ⚠
>
> Note, that the function is curried, which means that it should be called partially, like this:\
> ```emit(eventMap)(event)(...args)```\
> and **not** like this:\
> ```emit(eventMap, event, ...args)```


⚠ More coming soon ⚠
