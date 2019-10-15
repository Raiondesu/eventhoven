import { on } from './subscribe';
import { off } from './unsubscribe';
import { metaEventMap, TMetaHandlerMap } from './meta-events';

const onMeta = on(metaEventMap);
const offMeta = off(metaEventMap);

const handler: TMetaHandlerMap[keyof TMetaHandlerMap] = (
  map, event, argsOrHandler
) => console.log(`${
    new Date().toTimeString()
  } [EVENT "${event}"]: ${
      argsOrHandler
  } from ${map}`
);

export const debug = (enable: boolean) => {
  if (enable) {
    onMeta('*')(handler);
  } else {
    offMeta('*')(handler)
  }
}
