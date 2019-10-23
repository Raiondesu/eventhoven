import { onAll } from './subscribe.js';
import { offAll } from './unsubscribe.js';
import { metaEvents } from './meta-events.js';
import { TEventMap, TEventHandler } from './events.js';

const onMeta = onAll(metaEvents);
const offMeta = offAll(metaEvents);

const log = (
  map: TEventMap,
  event: keyof TEventMap,
  argsOrHandler: any[] | TEventHandler
) => console.log(
  `${
    new Date().toTimeString()
  } [EVENT "${String(event)}"]: ${
      argsOrHandler
  } from ${map}`
);

/**
 * Enable or disable the debug mode.
 *
 * When debug mode is enabled - every event is logged to the console
 * with a timestamp and other information.
 *
 * @param {boolean} enable - whether to enable the debug mode
 * - `true` to enable, `false` to disable
 */
export const debug = (enable: boolean) => (
  enable ? onMeta : offMeta
)(log);
