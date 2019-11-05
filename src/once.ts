import { TEventMap, THandlerOf, TEventContext, TLastParams } from './types';

/**
 * Makes a handler to be called only once,
 * by unsubscribing it right at its execution
 *
 * @param handler - a handler to transform
 *
 * @returns a transformed handler
 */
export const once = <
  M extends TEventMap,
  E extends keyof M
>(handler: THandlerOf<M, E>) => <THandlerOf<M, E>> ((
  _: TEventContext<M>,
  ...args: TLastParams<THandlerOf<M, E>>
) => (_.unsubscribe(), handler(_, ...args)));
