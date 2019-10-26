# eventhoven

> Compose events effortlessly 🎵

[![travis](https://img.shields.io/travis/com/raiondesu-experiments/eventhoven?style=flat-square)](https://travis-ci.com/raiondesu-experiments/eventhoven "Latest Travis CI build")
[![npm](https://img.shields.io/npm/v/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "NPM package page")
[![npm](https://img.shields.io/npm/dm/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "Downloads per month, but who cares?")
[![size](https://img.shields.io/bundlephobia/minzip/eventhoven?style=flat-square)](https://bundlephobia.com/result?p=eventhoven "minzipped size")
[![coveralls](https://img.shields.io/coveralls/github/raiondesu-experiments/eventhoven?style=flat-square)](https://coveralls.io/github/raiondesu-experiments/eventhoven "Code coverage")
[![code quality](https://img.shields.io/codefactor/grade/github/raiondesu-experiments/eventhoven?style=flat-square)](https://www.codefactor.io/repository/github/raiondesu-experiments/eventhoven "Code quality")

## Table of Contents
- [eventhoven](#eventhoven)
  - [Table of Contents](#table-of-contents)
  - [What is this?](#what-is-this)
  - [Disclaimer](#disclaimer)
    - [SemVer](#semver)
    - [TypeScript](#typescript)
    - [Currying](#currying)
    - [External state >>> Internal state](#external-state--internal-state)
    - [OK, but why not %event-manager-package%?](#ok-but-why-not-event-manager-package)
  - [Installation](#installation)
    - [Importing](#importing)
    - [Simple usage examples](#simple-usage-examples)
  - [API](#api)
    - [`eventMap`](#eventmap)
      - [Event context](#event-context)
    - [`emit`](#emit)
    - [`emitAll`](#emitall)
    - [`subscribe`](#subscribe)
    - [`subscribeToAll`](#subscribetoall)
    - [`unsubscribe`](#unsubscribe)
    - [`unsubscribeFromAll`](#unsubscribefromall)
    - [`wait`](#wait)
    - [`harmonicWait`](#harmonicwait)
    - [`debug`](#debug)
    - [Collections](#collections)
    - [Plugin API](#plugin-api)
  - [Contribute](#contribute)

## What is this?
It's a simple type-safe event manager library for browser and node, less than 1KB (gzipped, tree-shakeable).

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
  (for example, with [`ramda`](https://github.com/ramda/ramda) and similar tools)
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all funcions are easily substitutable as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- Code-generation-friendly:\
  Due to the SRP, all functions have a very limited number of ways of invocation.\
  This allows to automatically generate efficient code (for example, CRUD events) for this library without concerns about its stability.
- **KISS** and **DRY**

Something's missing or found a bug?\
Feel free to [create an issue](https://github.com/raiondesu-experiments/eventhoven/issues/new)! 😉

---

## Disclaimer
> and some ground principles

### SemVer

This project will utilize SemVer after a 1.0.0 release!\
Until then - breaking changes are possilbe during minor updates!

### TypeScript

`eventhoven`'s main concern is type-safety at every step,
so all the code examples will be written in [typescript](https://www.typescriptlang.org).

It was written in a "type-first, implementation-later" way,
and will be kept that way to ensure that runtime types always match the static ones.

### Currying

"Why curry functions?" you may ask. Great question! It has many answers on the web already, but I'd recommend reading [this](https://medium.com/@iquardt/currying-the-underestimated-concept-in-javascript-c95d9a823fc6) and [this](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/ch04.html).

`eventhoven` uses the concept of currying to elevate the abstraction
and allow for a much wider and precise usage of it's API in return for sometimes writing `)(` instead of usual `, `,
which is not too much of a price to pay for this feature.

It also allows `eventhoven` to be used effortlessly with other functional libraries like [`ramda`](https://github.com/ramda/ramda) and many others.

Not all `eventhoven` function are curried. Those, which are, however, will have the following disclaimer:

> Note, that the function is [curried](#currying), which means that it must be called partially

### External state >>> Internal state

`eventhoven` doesn't store anything internally, it's a completely stateless, pure and side-effect-free library.\
It only has side-effects from closures on an *external* state that a user provides.\
So, there it is - no private fields, no hidden implementation details, no complications.\
This allows for easier testing *and* simpler usage.

Thanks to this rule, `eventhoven` is a higher abstraction above other event-managers. A Higher-Order-Event-Manager, if you like.\
That is, any other event manager's API can be built on top of what `eventhoven` gives you, providing a nearly endless set of possibilities.

### OK, but why not %event-manager-package%?

`eventhoven` is not in direct comparison to other event managers.
As stated in the main description - its main purpose is to **compose** events and event managers.

In production, it's a fairly typical scenario that multiple libraries
with multiple event systems exist and function in the same project at the same time.\
Front-end libraries do that all the time - `vue`, `react`, `angular` - all have own separate event systems - even from the DOM!
`eventhoven` aims to provide a connecting bridge for different event managing strategies,
by **providing instruments** for unifying the event management API.\
In other words, it allows to **unify** event management.

It just so happens that it can do event management very efficiently too. 😉

---

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

// Event-map declaration
const emojiEvents = eventMap({
  // key - event name,
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  '👩'(ctx, emoji: '👨' | '👩') {},
  '🌈'(ctx, emoji: '🦄' | '🌧') {},
  '🎌'(ctx, emoji: '👘' | '🍣' | '🚗', amount: number) {},
});

on(emojiEvents)('🎌')(
  (emoji, amount) => console.log(`Yay!, ${amount} of ${emoji}-s from japan!`)
);

on(emojiEvents)('🎌')(
  // Returning promises is also allowed (example API from http://www.sushicount.com/api)
  (ctx, emoji, amount) => fetch('http://api.sushicount.com/add-piece-of-sushi/')
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
  // first argument (ctx) - event contxext
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  'todo-added'(ctx, newTodo: Todo, todos: Todo[]) {
    // typically, a default handler is used
    // to compose events from other event managers here
  },
  'done-change'(ctx, todo: Todo, newDone: boolean) {},
  'text-change'(ctx, todo: Todo, newText: string) {},
});

const unsubFromAddTodo = on(todoEvents)('todo-added')(
  (ctx, todo, todos) => todos.push(todo)
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
[`onAll`](#subscribetoall) | `function` | Alias for [`subscribeToAll`](#subscribetoall)
[`unsubscribe`](#unsubscribe) | `function` | Event unsubscriber factory
[`unsubscribeFromAll`](#unsubscribefromall) | `function` | Event unsubscriber factory
[`off`](#unsubscribe) | `function` | Alias for [`unsubscribe`](#unsubscribe)
[`offAll`](#unsubscribefromall) | `function` | Alias for [`unsubscribeFromAll`](#unsubscribefromall)
[`emitCollection`](#emitcollection) | `function` | Creates a collection of event-emitters from an event-map
[`subscribeCollection`](#subscribecollection) | `function` | Creates a collection of event-subscribers from an event-map
[`unsubscribeCollection`](#unsubscribecollection) | `function` | Creates a collection of event-unsubscribers from an event-map
[`eventCollection`](#eventcollection) | `function` | Creates a collection of the three previous collections from an event-map
[`wait`](#wait) | `function` | Waits for an event to be executed
[`harmonicWait`](#harmonicwait) | `function` | Same as [`wait`](#wait) but has an arity of 3, just as all the other event-handling functions
[`debug`](#debug) | `function` | Sets the debug mode (if enabled - logs all events to the console)
[`metaEvents`](#metaevents) | `object` | A meta-event-map. Can be used to subscribe to the internal eventhoven's events
[`emitMeta`](#emitmeta) | `function` | A meta-event emitter. An [`emit`](#emit) function created for [`metaEvents`](#metaevents)

---

### `eventMap`

Creates an event-map from event signatures.

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
  keyup(ctx, e: KeyboardEvent) {},
  keydown(ctx, e: KeyboardEvent) {},
  keypress(ctx, e: KeyboardEvent, modifier?: string) {
    // This is a default handler for the event,
    // it's always executed when the event is invoked
    console.log('modifier:', modifier);
  },
});
```

In this example, keys in `keyboardEvents` correspond to event names ('keyup', 'keydown', etc.) and values contain handler maps and amount of arguments for a given event.

<details>
<summary>
The decision to use plain functions as event signatures comes down to 3 advantages
</summary>

1. It's easier to make type inference that way.\
   Since a handler and the event signature are both functions,\
   there's no need to convert types from event signature to event handler.

2. It allows to compose event managers easier.\
   Having an event signature be a default event handler\
   allows to emit other managers' event directly in the event declaration, for example.

   Also, it is a common practice to add a default handler for the event\
   right after its declaration, which produces lines like this:
   ```ts
    import { Manager } from 'some-event-manager';

    const manager = new Manager([ 'event' ]);
    // Boilerplate code:
    manager.on('event', () => console.log('I want to debug all invocations of this event!'));
   ```
   `eventhoven` allows to never have to do that.

3. It allows code analysis tools detect which events are never being emitted.\
   Since the event signatures are executable pieces of code, which are **always** executed on their respective events,\
   code analysis tools (code coverages, testing frameworks) can detect and count the amount of executions\
   of these signatures. And this amount is equivalent to the amount of emits of a particular event.\
   This allows, in turn, to always know which events are never emitted and should be deleted from the event-map.


Here, `keyboardEvents` is equal to the following object:

```ts
const keyboardEvents = {
  // Name of the event
  keyup:
    // Collection of the event handlers
    new Map([
      // Notice the default event handler from the event-map
      (ctx, e: KeyboardEvent) => {},

      // Do we execute this event handler only once?
      false
    ]),
  keydown: new Map([(ctx, e: KeyboardEvent) => {}, false]),
  keypress: new Map([
    // Notice the default event handler from the event-map
    // It's even the same function reference!
    (ctx, e: KeyboardEvent, modifier?: string) => { console.log('modifier:', modifier); },
    false
  ]),
}
```
</details>

It's also possible to add new events to the event-map at runtime (by creating a new event-map 😁):

```ts
const inputEvents = {
  ...keyboardEvents,
  ...eventMap({
    'mouse-click'(ctx, e: MouseEvent) {},
  }),
}

// Still have type inference here!
emit(inputEvents)('mouse-click')
```

#### Event context

You've probably noticed by now, that all event handlers have a first `ctx` parameter.

This is the event context, and it is an object of the following signature:
key | type | description
----|------|-----------------
`event` | `PropertyKey` | An event that triggered this handler.
`once` | `boolean` | Whether the handler is "once", menaing it will unsibscribe immediately after invocation.

---

### `emit`

Creates event emitters for an event-map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to emit events from
`event` | `PropertyKey` | An event name to emit for a given event-map (can be a symbol too)
`...args` | `any (contextual)` | Arguments for the specific event, spread

**Returns**: `Promise<void>` - a promise that is resolved when all event handlers have finished their execution

---

### `emitAll`

Emits **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to subscribe to.
`eventArgs` | [`TEventParamsMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/emit.ts#L52) | Parameters for all events in an event map.

**Returns**: `Record<keyof M, Promise<void>>` - a map for all events' emits promises (each will resolve upon all event handlers' resolution).


---

### `subscribe`

Creates event subscribers for an event in an event-map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to get events from.
`event` | `PropertyKey` | An event name to subscribe to for a given event-map (can be a symbol too).
`...handlers` | `function[]` | Handlers to execute on the event, spread. If emtpy, no subscribing is done.

**Returns**: `() => void` - a function that unsubscribes the handler from the event

**Alias**: `on`


### `subscribeToAll`

Subscribes handler(s) to **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to subscribe to.
`...handlers` | `function[]` | Handlers to execute on the events, spread. If emtpy, no subscribing is done.

**Returns**: `void`

**Alias**: `onAll`

---

### `unsubscribe`

Unsubscribes handlers from events of an event-map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to unsubscribe handlers from.
`event` | `PropertyKey` | An event name to unsub from for a given event-map (can be a symbol too).
`...handlers` | `function[]` | Handlers to unsubscribe from the event, spread. If empty - all currently subbed handlers will be unsubscribed.

**Returns**: `void`

**Alias**: `off`


### `unsubscribeFromAll`

Unsubscribes handler(s) from **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to unsubscribe from.
`...handlers` | `function[]` | Handlers to unsubscribe from the events, spread. If empty - all currently subbed handlers will be unsubscribed.

**Returns**: `void`

**Alias**: `offAll`

---

### `wait`

Allows to wait for an event without the need for callbacks.

> Note, that the function is [curried](#currying), which means that it must be called partially

Basically, promise-style `subscribe` with the `once` flag.\
It is a way to block execution flow until some event occurs.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to wait events from.
`event` | `PropertyKey` | An event name to wait for in a given event-map (can be a symbol too).

**Returns**: `Promise<Array<unknown>> (contextual)` - a promise with array of parameters passed to the event.

<details>
<summary>Simple example</summary>

```ts
import { wait } from 'eventhoven';

const keydown = wait(keyboardEvents)('keydown');

//... some time later in async context

const [_ctx, e] = await keydown; // Resolves upon the first 'keydown' event emit
console.log(e);
// => KeyboardEvent {}
```
</details>

---

### `harmonicWait`

Same as [`wait`](#wait), but returns a promise factory instead of a plain promise.

> Note, that the function is [curried](#currying), which means that it must be called partially

Useful due to having the same signature as [`emit`](#emit), [`subscribe`](#subscribe) and [`unsubscribe`](#unsubscribe),
which allows for an easier composition of waiters.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to wait events from.
`event` | `PropertyKey` | An event name to wait for in a given event-map (can be a symbol too).

**Returns**: `() => Promise<Array<unknown>> (contextual)` - a promise factory with array of parameters passed to the event.

<details>
<summary>Simple example</summary>

```ts
import { harmonicWait } from 'eventhoven';

// Function that initiates a waiter
const waitForKeydown = harmonicWait(keyboardEvents)('keydown');

//... some time later in async context

// Resolves upon the first 'keydown' event emit
// since the call of the `waitForKeydown`
const [_ctx, e] = await waitForKeydown();
console.log(e);
// => KeyboardEvent {}
```
</details>

---

### `debug`

Sets a debug mode.

**options** (object):

name | type | description
-----|------|---------------
`enabled` | `boolean` | Whether to enable the debug mode or disable it.
`log` <sup>v0.4.0</sup> | `function` (optional) | A custom logging function.

**Returns**: `void`

When debug mode is enabled, all emits, subscribes and unsubscribes are logged to the console
in a following format (default):

```
HH:MM:SS [EVENT {event-name}]: {event-handler-or-params}
```
where `{event-name}` is the name of the event\
and `{event-handler-or-params}` is the handler for the event (when subscribing or unsubscribing) or its params (when emitting).

Example:
```ts
debug({ enable: true });

emit(emojiEvents)('🎌')('🍣', 10);

// logs:
// 12:59:05 [EVENT EMIT 🎌]: 🍣, 10
```

If you want coloring or some other features - pass a custom logging function:
```ts
// Let's say we want warnings instead of logs...
const customLog = (type) => (...args) => console.warn(type, ...args);

debug({
  enable: true,
  log: customLog
});
```
---

### Collections

`eventhoven` provides a way to group your event-managing needs using `collections`.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/events.ts#L8) | An event-map to wait events from.

**Return**: A map of event names to the action for that event name.

Currently available `collections` are:

name | action | description
-----|--------|------------------
`emitCollection` | [`emit`](#emit) | Creates a an object, where each property is a function that emits a prescribed event
`subscribeCollection` | [`subscribe`](#subscribe) | Creates a an object, where each property is a function that subscribes to a prescribed event
`unsubscribeCollection` | [`unsubscribe`](#unsubscribe) | Creates a an object, where each property is a function that unsubscribes from a prescribed event
`eventCollection` | all of the above | Creates an object that contains all three collections in itself. Can be used to create a singleton that manages all events in an event-map.

---

### Plugin API

It's also possible to write custom plugins for `eventhoven` thanks to meta-events!

Meta-events is a simple [`event-map`](#eventmap) with events for internal `eventhoven` actions, like [`emit`](#emit).\
One can subscribe to these events to execute some actions or emit these events to emulate them for the `eventhoven`.

The simplest possible plugin is already written for you - the [`debug`](https://github.com/raiondesu-experiments/eventhoven/blob/master/src/debug.ts) plugin.\
It can be used as an example for writing your own plugins for `eventhoven`!

Current list of all meta-events is as follows:

 name  | emitted when
-------|------------------
`emit` | Any event is emitted, except itself.
`subscribe` | Any event is subscribed to, except itself.
`unsubscribe` | Any event is unsubscribed from, except itself.

Simple example:

```ts
import { metaEvents, on } from 'eventhoven';

on(metaEvents)('emit')(
  (ctx, eventMap, eventName, eventArgs) => console.log(
    `This handler will be executed when ANY event is emitted, for example ${eventName}!`
  )
);
```

---

## Contribute

First, fork the repo and clone it:
```
git clone https://github.com/%your-github-username%/eventhoven.git
```

Then:
```
npm install
```

Then:
```
npm run dev
```

Then propose a PR!\
I'll be happy to review it!

---

Something's missing or found a bug?\
Feel free to [create an issue](https://github.com/raiondesu-experiments/eventhoven/issues/new)! 😉
