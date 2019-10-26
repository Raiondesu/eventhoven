import { metaEvents, TMetaEvents } from './meta-events';
import { TEventMap, TEventHandler } from './events';
import { ISubscribeOptions, onAll } from './subscribe';
import { offAll } from './unsubscribe';

const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);

/**
 * Default logging function
 */
export const log = (
  { event }: ISubscribeOptions<TMetaEvents, keyof TMetaEvents>,
  _map: TEventMap,
  eventName: keyof TEventMap,
  argsOrHandler: any[] | TEventHandler
) => console.log(
  `${
    new Date().toISOString().match(/T(.*?)Z/)![1]
  } [EVENT ${event.toUpperCase()} "${String(eventName)}"] - ${
    Array.isArray(argsOrHandler)
      ? argsOrHandler.join(', ')
      : argsOrHandler
  }`
);

export type TLogHandler = typeof log;
export interface IDebugOptions {
  enable: boolean;
  log?: TLogHandler;
}

/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export const debug = ({ enable, log: logEvent }: IDebugOptions) => (
  enable ? onMeta : offMeta
)(logEvent || log);
