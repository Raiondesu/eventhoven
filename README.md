# eventhoven [![npm](https://img.shields.io/npm/v/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "NPM package page") <!-- omit in toc -->

> Compose events effortlessly 🎵

[![travis](https://img.shields.io/travis/com/raiondesu/eventhoven?style=flat-square)](https://travis-ci.com/raiondesu/eventhoven "Latest Travis CI build")
[![npm](https://img.shields.io/npm/dm/eventhoven.svg?style=flat-square)](https://www.npmjs.com/package/eventhoven "Downloads per month, but who cares?")
[![size](https://img.shields.io/bundlephobia/minzip/eventhoven@latest?style=flat-square)](https://bundlephobia.com/result?p=eventhoven@latest "minzipped size")
[![coveralls](https://img.shields.io/coveralls/github/raiondesu/eventhoven?style=flat-square)](https://coveralls.io/github/raiondesu/eventhoven "Code coverage")
[![code quality](https://img.shields.io/codeclimate/maintainability/raiondesu/eventhoven?style=flat-square)](https://codeclimate.com/github/raiondesu/eventhoven/maintainability "Code quality")

[![code pen](https://img.shields.io/badge/playground-link-blueviolet?style=flat-square)](https://codepen.io/raiondesu/pen/qBBPPom "Link to in-browser playground")

## Table of Contents <!-- omit in toc -->
- [What is this?](#what-is-this)
- [Disclaimer](#disclaimer)
  - [TypeScript](#typescript)
  - [Currying](#currying)
  - [External state >>> Internal state](#external-state--internal-state)
  - [OK, but why not %event-manager-package%?](#ok-but-why-not-event-manager-package)
- [Installation](#installation)
  - [Importing](#importing)
  - [Simple usage examples](#simple-usage-examples)
- [API](#api)
  - [`eventMap(events)`](#eventmapevents)
    - [Event handler](#event-handler)
    - [Event context](#event-context)
  - [`emit(eventMap)(event)(...args): Promise<void>`](#emiteventmapeventargs-promisevoid)
  - [`emitAll(eventMap)(eventArgs): object`](#emitalleventmapeventargs-object)
  - [`subscribe(eventMap)(event)(...handlers): () => void`](#subscribeeventmapeventhandlers---void)
  - [`subscribeToAll(eventMap)(...handlers)`](#subscribetoalleventmaphandlers)
  - [`unsubscribe(eventMap)(event)(...handlers)`](#unsubscribeeventmapeventhandlers)
  - [`unsubscribeFromAll(eventMap)(...handlers)`](#unsubscribefromalleventmaphandlers)
  - [`once(handler): handler`](#oncehandler-handler)
  - [`wait(eventMap)(event): Promise<args[]>`](#waiteventmapevent-promiseargs)
  - [`harmonicWait(eventMap)(event)(): Promise<args[]>`](#harmonicwaiteventmapevent-promiseargs)
  - [`debug(isEnabled)`](#debugisenabled)
    - [Custom logging function](#custom-logging-function)
  - [Collections](#collections)
  - [Meta-Events (Plugin API)](#meta-events-plugin-api)
- [Contribute](#contribute)

## What is this?
It's a simple type-safe event manager library for browser and node,
less than 1KB (gzipped, tree-shakeable - [essentials are less than 500B](#api)).

It provides a powerful set of tools for creating and composing event managers.\
In other words, it manages event managers!

A main list of features includes (but not limited to):
- Full tree-shaking
- Functional-style API
- Multiple event arguments
- Event names can also be symbols (private events)
- Soft error-handling - no unexpected runtime errors!
- Versatile plugin system (using [meta-events](#meta-events-plugin-api))
- Fully type-safe - each event remembers its name and type signature
- All functions are curried and point-free, which makes them easier to use in a functional environment
  (for example, with [`ramda`](https://github.com/ramda/ramda) and similar tools)
- **SOLID**
  - **S**RP - every function does only one thing
  - **O**CP - HOFs allow to change certain behaviours without the need to rewrite code
  - **L**SP - all functions are easily substitutable as long as they adhere to the same API
  - **I**SP - all data types are the least specific versions of them
  - **D**IP - API depends only on abstractions
- Code-generation-friendly:\
  Due to the SRP, all functions have a very limited number of ways of invocation.\
  This allows to automatically generate efficient code (for example, CRUD events) for this library without concerns about its stability.
- **KISS** and **DRY**

Something's missing or found a bug?\
Feel free to [create an issue](https://github.com/raiondesu/eventhoven/issues/new)! 😉

---

## Disclaimer
> and some ground principles

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

**browser**:
```html
<!-- ES2015 -->
<script type="module">
  import { eventMap, emit, on, off } from 'https://unpkg.com/eventhoven';

  // use it here
</script>

<!-- ES5 with IE11+ general syntax polyfills, global object - `eventhoven` -->
<!-- Polyfill `window.Promise` and `Object.assign` yourself! -->
<script src="https://unpkg.com/eventhoven/dist/umd.js"></script>
```

### Importing

```ts
// TS-module (pure typescript),
// allows compilation settings to be set from the project config
import { eventMap, emit, on, off } from 'eventhoven/src';

// ES-module (npm/node, typescript)
import { eventMap, emit, on, off } from 'eventhoven';

// ESNext (no polyfills for esnext)
import { eventMap, emit, on, off } from 'eventhoven/dist/esnext';

// ES-module (browser, node)
import { eventMap, emit, on, off } from 'https://unpkg.com/eventhoven';

// Classic node commonjs
const { eventMap, emit, on, off } = require('eventhoven/dist/js');
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
  '👩'(context, emoji: '👨' | '👩') {},
  '🌈'(context, emoji: '🦄' | '🌧') {},
  '🎌'(context, emoji: '👘' | '🍣' | '🚗', amount: number) {},
});

on(emojiEvents)('🎌')(
  (context, emoji, amount) => console.log(`Yay!, ${amount} ${emoji}-s from ${context.event}!`)
);

on(emojiEvents)('🎌')(
  // Returning promises is also allowed (example API from http://www.sushicount.com/api)
  (context, emoji, amount) => fetch('http://api.sushicount.com/add-piece-of-sushi/')
    .then(_ => _.json())
    .then(resp => console.log(`Yay!, ${resp.pieces_of_sushi} ${emoji}-s loaded from sushicount!`))
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
// => Yay!, 10 🍣-s from 🎌!
// => Yay!, 11 🍣-s loaded from sushicount!
```
</details>

<details>
<summary><b>Example 2 (Todo-App)</b></summary>

```ts
import { eventMap, emit, on, off } from 'eventhoven';

type Todo = { done: boolean; text: string; };

const todos: Todo[] = [];

// Event-map declaration
const todoEvents = eventMap({
  // key - event name,
  // first argument (context) - event contxext
  // function arguments - event arguments,
  // function body - default handler for the event
  // (leave emtpy if you need to just declare the event)
  'add-todos'(context, todos: Todo[], ...newTodos: Todo[]) {
    // Typically, a default handler is used to compose events from other event managers here.
    // But we'll just implement a simple todo-app for now
    todos.push(...newTodos);
  },
  'done-change'(context, todo: Todo, newDone: boolean) {
    todo.done = newDone;
  },
  'text-change'(context, todo: Todo, newText: string) {
    todo.text = newText;
  },
});

const emitTodo = emit(todoEvents);

const unsubFromAddTodos = on(todoEvents)('add-todos')(
  // Parameter types are inferred here
  (context, todos, ...newTodos) => newTodos.forEach(todo => console.log(
    `Wow, new todo added - "${todo.text}"!`,
    todo.done ? `And it's done already!` : 'Need to do it!'
  ))
);

const addTodos = emitTodo('add-todos');

addTodos(
  todos,
  { text: 'learn fp', done: true },
  { text: 'publish a cool event manager', done: true },
);
// => Wow, new todo added - "learn fp"! And it's done already!
// => Wow, new todo added - "publish a cool event manager"! And it's done already!

// Unsubbed the wow-ing console.log from the event
unsubFromAddTodos();

addTodos(
  todos,
  { text: 'buy milk', done: false }
);
// nothing happens in the console now

console.log(todos);
// => [
//   { text: 'learn fp', done: true },
//   { text: 'publish a cool event manager', done: true },
//   { text: 'buy milk', done: false }
// ]

const changeText = emitTodo('text-change');
const changeDone = emitTodo('done-change');

changeText(todos[2], 'write documentation');

changeDone(todos[2], true);

console.log(todos);
// => [
//   { text: 'learn fp', done: true },
//   { text: 'publish a cool event manager', done: true },
//   { text: 'buy milk', done: true }
// ]
```
</details>

[**Code Pen Playground**](https://codepen.io/raiondesu/pen/qBBPPom)

---

## API

There are only 4 essential exports that are needed to use this library:

name | type | description
-----|------|--------------------
[`eventMap`](#eventmapevents) | `function` | Event-map factory
[`emit`](#emiteventmapeventargs-promisevoid) | `function` | Event emitter factory
[`on`](#subscribeeventmapeventhandlers---void) | `function` | Event subscriber factory
[`off`](#unsubscribeeventmapeventhandlers) | `function` | Event unsubscriber factory

**Together they add up to less than 500 Bytes (gzipped)!**

Everything else is just syntax sugar and boilerplate reduction.

<details>
<summary>
List of all exports is as follows
</summary>

name | type | description
-----|------|--------------------
[`eventMap`](#eventmapevents) | `function` | Event-map factory
[`emit`](#emiteventmapeventargs-promisevoid) | `function` | Event emitter factory
[`subscribe`](#subscribeeventmapeventhandlers---void) | `function` | Event subscriber factory
[`subscribeToAll`](#subscribetoalleventmaphandlers) | `function` | Event subscriber factory for all events in a collection
[`on`](#subscribeeventmapeventhandlers---void) | `function` | Alias for [`subscribe`](#subscribeeventmapeventhandlers---void)
[`onAll`](#subscribetoalleventmaphandlers) | `function` | Alias for [`subscribeToAll`](#subscribetoalleventmaphandlers)
[`unsubscribe`](#unsubscribeeventmapeventhandlers) | `function` | Event unsubscriber factory
[`unsubscribeFromAll`](#unsubscribefromalleventmaphandlers) | `function` | Event unsubscriber factory
[`off`](#unsubscribeeventmapeventhandlers) | `function` | Alias for [`unsubscribe`](#unsubscribeeventmapeventhandlers)
[`offAll`](#unsubscribefromalleventmaphandlers) | `function` | Alias for [`unsubscribeFromAll`](#unsubscribefromalleventmaphandlers)
[`once`](#oncehandler-handler) | `function` | Makes a handler be executed only once
[`emitCollection`](#collections) | `function` | Creates a collection of event-emitters from an event-map
[`subscribeCollection`](#collections) | `function` | Creates a collection of event-subscribers from an event-map
[`unsubscribeCollection`](#collections) | `function` | Creates a collection of event-unsubscribers from an event-map
[`eventCollection`](#collections) | `function` | Creates a collection of the three previous collections from an event-map
[`wait`](#waiteventmapevent-promiseargs) | `function` | Waits for an event to be executed
[`harmonicWait`](#harmonicwaiteventmapevent-promiseargs) | `function` | Same as [`wait`](#waiteventmapevent-promiseargs) but has an arity of 3, just as all the other event-handling functions
[`debug`](#debugisenabled) | `function` | Sets the debug mode (if enabled - logs all events to the console)
[`customDebug`](#custom-logging-function) | `function` | Creates a custom debugger based on a function passed to it
[`metaEvents`](#meta-events-plugin-api) | `object` | A meta-event-map. Can be used to subscribe to the internal eventhoven's events
`emitMeta` | `function` | A meta-event emitter. An [`emit`](#emiteventmapeventargs-promisevoid) function created for [`metaEvents`](#meta-events-plugin-api)
</details>



---

### `eventMap(events)`

Creates an event-map from event signatures.

**Parameters**:

name | type | description
-----|------|---------------
`events` | [`TEventSignatures`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L12) | a collection of event signatures

**Returns**: [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15)

This function is the main "entry point" to the whole event management pipeline.
It constructs a base storage for events and their handlers, which is then used by all of the other functions.

In other words, to start working with events in `eventhoven` you start by creating an event-map:
```ts
import { eventMap } from 'eventhoven';

// `keyboardEvents` should now be used for all event interactions
const keyboardEvents = eventMap({
  keyup(context, e: KeyboardEvent) {},
  keydown(context, e: KeyboardEvent) {},
  keypress(context, e: KeyboardEvent, modifier?: string) {
    // This is a default handler for the event,
    // it's always executed when the event is invoked
    console.log('modifier:', modifier);
  },
});
```

In this example, keys in `keyboardEvents` correspond to event names ('keyup', 'keydown', etc.) and values contain handler maps and amount (and types) of arguments for a given event.

<details>
<summary>
Why plain functions as event signatures?
</summary>

The decision to use plain functions as event signatures comes down to 3 advantages:
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
</details>


<details>
<summary>
How do I add new events at runtime?
</summary>

- by adding an event to a generic map:
  ```ts
  import { eventMap, TEventSignatures } from 'eventhoven';

                     // Makes event-map accept any event into itself
  const someEventMap = eventMap<TEventSignatures>({
    someEvent() {}
  });

  // Adding a new event to the map! (notice, no default handler)
  someEventMap['newEvent'] = new Map();

  // And now we can use it:
  emit(someEventMap)('newEvent')();
  ```

- by creating a new event-map 😁:
  ```ts
  const inputEvents = {
    ...keyboardEvents,
    ...eventMap({
      'mouse-click'(context, e: MouseEvent) {},
    }),
  }

  // Still have type inference here!
  emit(inputEvents)('mouse-click')
  ```

</details>


#### Event handler

As stated earlier, event signatures are read from the default **event handlers** in the event-map.

Any event handler has [a following signature](https://github.com/raiondesu/eventhoven/tree/master/src/types.d.ts#L6):

`(context: TEventContext, ...args: any[]) => unknown | Promise<unknown>`

**Parameters**:

name | type | description
------|-----|--------------
`context` | [`TEventContext`](#event-context) | a context given by `eventhovent` for every event
`...args` | `any[]` (contextual) | an event-specific array of arguments

**Returns**: any value or a promise with any value.\
The type of said value is determined by the default handler in the event-map, or remains `unknown`.

<details>
<summary>
Simple example
</summary>

```ts
const map = eventMap({
  // An event handler that returns a number
  numberEvent(context): number {
    // The default is 42
    return 42;
  }
});

// Type is usually inferred automatically
const result: number[] = await emit(map)('numberEvent')();

console.log(result); // => [42]

// Let's add another handler to the mix
on(map)('numberEvent')(ctx => 43);

const result2 = await emit(map)('numberEvent')();

console.log(result2); // => [42, 43]
```

</details>

#### Event context

You've probably noticed by now,
that all event handlers have a first `context` parameter.

This is the event context that's provided by `eventhoven`, and it is an object of the following signature:

key | type | description
----|------|-----------------
`event` | `PropertyKey` | An event that triggered this handler.
`unsubscribe` | `() => void` | A function that unsubscribes the current handler from the event.

<details>
<summary>
Simple example
</summary>

```ts
const map = eventMap({
  eventName(context) {
    console.log(context.event); // => "eventName"
    console.log(typeof context.unsubscribe); // => "function"
  }
});
```
</details>

---

### `emit(eventMap)(event)(...args): Promise<void>`

Creates event emitters for an event-map.\
If an event does not exist, it will be ignored.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to emit events from
`event` | `PropertyKey` | An event name to emit for a given event-map (can be a symbol too)
`...args` | `any (contextual)` | Arguments for the specific event, spread

**Returns**: `Promise<void>` - a promise that is resolved when all event handlers have finished their execution

---

### `emitAll(eventMap)(eventArgs): object`

Emits **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to subscribe to.
`eventArgs` | [`TEventParamsMap`](https://github.com/raiondesu/eventhoven/blob/master/src/all.ts#L31) | Parameters for all events in an event map.

**Returns**: `Record<keyof M, Promise<void>>` - a map for all events' emits promises (each will resolve upon all event handlers' resolution).


---

### `subscribe(eventMap)(event)(...handlers): () => void`

Creates event subscribers for an event in an event-map.\
If an event does not exist, it will be ignored.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to get events from.
`event` | `PropertyKey` | An event name to subscribe to for a given event-map (can be a symbol too).
`...handlers` | `function[]` | Handlers to execute on the event, spread. If emtpy, no subscribing is done.

**Returns**: `() => void` - a function that unsubscribes the handler from the event

**Alias**: `on`

### `subscribeToAll(eventMap)(...handlers)`

Subscribes handler(s) to **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to subscribe to.
`...handlers` | `function[]` | Handlers to execute on the events, spread. If emtpy, no subscribing is done.

**Returns**: `void`

**Alias**: `onAll`

---

### `unsubscribe(eventMap)(event)(...handlers)`

Unsubscribes handlers from events of an event-map.\
If an event does not exist, it will be ignored.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to unsubscribe handlers from.
`event` | `PropertyKey` | An event name to unsub from for a given event-map (can be a symbol too).
`...handlers` | `function[]` | Handlers to unsubscribe from the event, spread. If empty - all currently subbed handlers will be unsubscribed.

**Returns**: `void`

**Alias**: `off`


### `unsubscribeFromAll(eventMap)(...handlers)`

Unsubscribes handler(s) from **all** events in an event map.

> Note, that the function is [curried](#currying), which means that it must be called partially

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to unsubscribe from.
`...handlers` | `function[]` | Handlers to unsubscribe from the events, spread. If empty - all currently subbed handlers will be unsubscribed.

**Returns**: `void`

**Alias**: `offAll`

---

### `once(handler): handler`

Makes a handler being called only once upon the subscribed event invocation.\
Should be used with [`subscribe`](#subscribeeventmapeventhandlers---void) to reduce boilerplate for one-time handlers.

**Parameters**:

name | type | description
-----|------|---------------
`handler` | `function` | An event handler to be `once`-d

**Returns**: `handler` - a changed handler that was passed in

Usage example:
```ts
on(eventmap)('some-event')(once((ctx, arg) => {
  console.log('This handler will only be called once!');
}));
```

---

### `wait(eventMap)(event): Promise<args[]>`

Allows to wait for an event without the need for callbacks.

> Note, that the function is [curried](#currying), which means that it must be called partially

Basically, promise-style `subscribe` with the `once` flag.\
It is a way to block execution flow until some event occurs.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to wait events from.
`event` | `PropertyKey` | An event name to wait for in a given event-map (can be a symbol too).

**Returns**: `Promise<Array<unknown>> (contextual)` - a promise with array of parameters passed to the event.

<details>
<summary>Simple example</summary>

```ts
import { wait } from 'eventhoven';

const keydown = wait(keyboardEvents)('keydown');

//... some time later in async context

// Resolves upon the first 'keydown' event emit
// Returns a tuple of arguments that would otherwise go to the handler
// (excluding the context)
const [e] = await keydown;
console.log(e);
// => KeyboardEvent {}
```
</details>

---

### `harmonicWait(eventMap)(event)(): Promise<args[]>`

Same as [`wait`](#waiteventmapevent-promiseargs), but returns a promise factory instead of a plain promise.

> Note, that the function is [curried](#currying), which means that it must be called partially

Useful due to having the same signature as [`emit`](#emiteventmapeventargs-promisevoid), [`subscribe`](#subscribeeventmapeventhandlers---void) and [`unsubscribe`](#unsubscribeeventmapeventhandlers),
which allows for an easier composition of waiters.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to wait events from.
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
const [e] = await waitForKeydown();
console.log(e);
// => KeyboardEvent {}
```
</details>

---

### `debug(isEnabled)`

Sets the debug mode.

**Parameters**:

name | type | description
-----|------|---------------
`enabled` | `boolean` | Whether to enable the debug mode or disable it.

**Returns**: `void`

When debug mode is enabled, all emits, subscribes and unsubscribes are logged to the console
in a following format (default):

```
MM:SS.fff [{event-type} {event-name}]: {event-handler-or-params}
```

Where:
- `{event-type}` - [type of the event](https://github.com/raiondesu/eventhoven/blob/master/src/meta-events.ts)
- `{event-name}` - name of the event
- `{event-handler-or-params}`
  - the handler for the event (when subscribing or unsubscribing)
  - params of the event (when emitting)

Example:
```ts
import { emit, debug } from 'eventhoven';

debug(true);

emit(emojiEvents)('🎌')('🍣', 10);

// logs:
// 59:05.512 [EMIT "🎌"]: [🍣, 10]
```

If an event does not exist in an event-map, the log will contain `(INVALID)` mark:
```ts
import { emit, debug } from 'eventhoven';

debug(true);

// event "😎" doesn't exist in the `emojiEvents` map
emit(emojiEvents)('😎')('🍣', 10);

// logs:
// 59:05.512 [EMIT "😎" (INVALID)]: [🍣, 10]
```

#### Custom logging function

If you want coloring or some other features - pass a custom logging function to the `customDebug` factory.
It accepts a function of the same signature as any other [event handler](#event-handler):
```ts
import { customDebug, TLogHandler, emit } from 'eventhoven';

// Let's say we want warnings instead of logs
const customLogFunction: TLogHandler = (ctx, ...args) => console.warn('custom!', ctx.event, ...args);

const debug = customDebug(customLog);

// Then use your custom debug function exactly like the default one:
debug(true);

emit(emojiEvents)('🎌')('🍣', 10);

// logs:
// custom! EMIT [object Object] 🎌 [🍣, 10]
```

---

### Collections

`eventhoven` provides a way to group your event-managing needs using `collections`.

**Parameters**:

name | type | description
-----|------|---------------
`eventMap` | [`TEventMap`](https://github.com/raiondesu/eventhoven/blob/master/src/types.d.ts#L15) | An event-map to wait events from.

**Return**: A map of event names to the action for that event name.

Currently available `collections` are:

name | action | description
-----|--------|------------------
`emitCollection(eventMap)` | [`emit`](#emiteventmapeventargs-promisevoid) | Creates an object, where each property is a function that emits a prescribed event
`subscribeCollection(eventMap)` | [`subscribe`](#subscribeeventmapeventhandlers---void) | Creates an object, where each property is a function that subscribes to a prescribed event
`unsubscribeCollection(eventMap)` | [`unsubscribe`](#unsubscribeeventmapeventhandlers) | Creates an object, where each property is a function that unsubscribes from a prescribed event
`eventCollection(eventMap)` | all of the above | Creates an object that contains all three collections in itself. Can be used to create a singleton that manages all events in an event-map.

<details>
<summary>Simple example</summary>

```ts
import {
  eventMap,
  emitCollection,
  subscribeCollection,
  unsubscribeCollection,
  eventCollection
} from 'eventhoven';

const myEvents = eventMap({
  event1() {},
  event2(ctx, arg1: number, arg2: string) {},
  event3(ctx, arg: boolean) {},
});

const emit = emitCollection(myEvents);

emit.event1();// => Promise<void>
emit.event2(12, 'some string');// => Promise<void>
emit.event3(true);// => Promise<void>

const on = subscribeCollection(myEvents);
const handler = (ctx, arg: boolean) => console.log(arg);

on.event3(handler);

const off = unsubscribeCollection(myEvents);

off.event3(handler);

const myCollection = eventCollection(myEvents);
// The same as
/*
const myCollection = {
  emit: emitCollection(myEvents),
  subscribe: subscribeCollection(myEvents),
  unsubscribe: unsubscribeCollection(myEvents)
};
*/

myCollection.emit.event1();// => Promise<void>
myCollection.emit.event2(12, 'some string');// => Promise<void>
myCollection.emit.event3(true);// => Promise<void>

myCollection.subscribe.event3(handler);
myCollection.unsubscribe.event3(handler);
```
</details>

---

### Meta-Events (Plugin API)

It's also possible to write custom plugins for `eventhoven` thanks to meta-events!

Meta-events is a simple [`event-map`](#eventmapevents) with events for internal `eventhoven` actions, like [`emit`](#emiteventmapeventargs-promisevoid).\
One can subscribe to these events to execute some actions or emit these events to emulate them for the `eventhoven`.

The simplest possible plugin is already written for you - the [`debug`](https://github.com/raiondesu/eventhoven/blob/master/src/debug.ts) plugin.\
It can be used as an example for writing your own plugins for `eventhoven`!

> Note:
> - A meta-event is always emitted **before** the event itself happens.
> - Any meta-event that returns a promise is going to be executed in parallel with the handlers for the event itself.

Current list of all meta-events is as follows:

 name  | emitted when
-------|------------------
`EMIT` | Any event is emitted, except itself.
`SUBSCRIBE` | Any event is subscribed to, except itself.
`UNSUBSCRIBE` | Any event is unsubscribed from, except itself.

This list is also described as a [const enum EMetaEvents](https://github.com/raiondesu/eventhoven/blob/master/src/meta-events.ts).

Simple example:

```ts
import { metaEvents, EMetaEvents, on } from 'eventhoven';

on(metaEvents)(EMetaEvents.EMIT)(
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

Then introduce changes and propose a PR!\
I'll be happy to review it!

---

Something's missing or found a bug?\
Feel free to [create an issue](https://github.com/raiondesu/eventhoven/issues/new)! 😉
