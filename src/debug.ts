import { metaEvents, TMetaEvents } from './meta-events.js';
import { TEventMap, TEventHandler } from './events.js';
import { subscribeCollection, unsubscribeCollection } from './collections.js';
import { mapObject } from './util.js';

const metaSub = subscribeCollection(metaEvents);
const metaUnsub = unsubscribeCollection(metaEvents);

const log = (
  type: keyof TMetaEvents,
) => (
  _map: TMetaEvents,
  event: keyof TEventMap,
  argsOrHandler: any[] | TEventHandler
) => console.log(
  `${
    new Date().toLocaleTimeString()
  } [EVENT ${type.toUpperCase()} "${String(event)}"]: ${
    Array.isArray(argsOrHandler)
      ? argsOrHandler.join(', ')
      : argsOrHandler
  }`
);

export type TLogHandler = typeof log;

/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param {boolean} enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export const debug = (enable: boolean, logEvent: TLogHandler = log) => {
  mapObject(
    metaEvents,
    (name) => (enable ? metaSub : metaUnsub)[
      name
    ](logEvent(name))
  );
};
