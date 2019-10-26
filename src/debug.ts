import { metaEvents, TMetaEvents } from './meta-events';
import { TEventMap, TEventHandler } from './events';
import { subscribeCollection, unsubscribeCollection } from './collections';
import { mapObject } from './util';

const metaSub = subscribeCollection(metaEvents);
const metaUnsub = unsubscribeCollection(metaEvents);

const log = (
  type: keyof TMetaEvents
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
      : argsOrHandler.name ?? argsOrHandler
  }`
);

export type TLogHandler = typeof log;

/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param enable - whether to enable the debug mode
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
