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
 *
 * @param [log] - a custom logging function
 * - overrides the default
 */
export const debug = ({ enable, log: logEvent = log }: IDebugOptions) => (
  enable ? onMeta : offMeta
)(logEvent);
