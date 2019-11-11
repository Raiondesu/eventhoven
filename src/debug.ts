import { metaEvents, TMetaEvents } from './meta-events';
import { onAll, offAll } from './all';
import { TEventMap, TEventContext, TEventHandler } from './types';

const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);

/**
 * Default logging function
 */
const log = (
  { event }: TEventContext<TMetaEvents>,
  map: TEventMap,
  eventName: keyof TEventMap,
  argsOrHandler: any[] | TEventHandler
) => console.log(
  // tslint:disable-next-line: no-magic-numbers - because these *are* magic
  new Date().toJSON().substr(14, 9),

  `[${event} "${String(eventName)}"${eventName in map ? '' : ' (INVALID)'}] -`,

  argsOrHandler
);

export type TLogHandler = typeof log;

/**
 * Custom debugger factory
 *
 * Creates a function that toggles debug mode using the provided `logEvent` function.
 *
 * @param logEvent - a custom logging function
 * * Overrides the default
 * * When debug mode is enabled - the `logEvent` function is called for all meta-events
 *
 * @returns a debug toggler function
 */
export const customDebug = (logEvent: TLogHandler) => (enable: boolean) => (
  enable ? onMeta : offMeta
)(logEvent);

/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param enable - whether to enable the debug mode
 * * `true` to enable, `false` to disable
 */
export const debug = customDebug(log);
