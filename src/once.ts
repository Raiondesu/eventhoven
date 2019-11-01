import { TEventMap, THandlerOf, TEventContext, TLastParams } from './types';

export const once = <
  M extends TEventMap,
  E extends keyof M
>(handler: THandlerOf<M, E>) => (
  _: TEventContext<M>,
  ...args: TLastParams<THandlerOf<M, E>>
) => (handler(_, ...args), _.unsubscribe());
