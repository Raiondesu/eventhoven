import { on } from './subscribe';
import { off } from './unsubscribe';
import { metaEventMap } from './meta-events';
import { TEventMap, TEventHandler } from './events';

const onMeta = on(metaEventMap)('*');
const offMeta = off(metaEventMap)('*');

const log = (
  map: TEventMap,
  event: keyof TEventMap,
  argsOrHandler: any[] | TEventHandler
) => console.log(
  `${
    new Date().toTimeString()
  } [EVENT "${event}"]: ${
      argsOrHandler
  } from ${map}`
);

export const debug = (enable: boolean) => (
  enable ? onMeta : offMeta
)(log);
