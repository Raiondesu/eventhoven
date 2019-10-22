import { onAll } from './subscribe';
import { offAll } from './unsubscribe';
import { metaEvents } from './meta-events';
import { TEventMap, TEventHandler } from './events';

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

export const debug = (enable: boolean) => (
  enable ? onMeta : offMeta
)(log);
