import { test_promiseDelayMS } from './common';
import { once } from '../src';

describe('once', () => {
  it('calls "unsubscribe" before executing a handler', () => {
    const unsubscribe = jest.fn();
    const someHandler = jest.fn();
    const oncedHandler = once(someHandler);

    oncedHandler({ event: 'any', unsubscribe });

    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(someHandler).toHaveBeenCalledTimes(1);
  });

  it('doesn\'t let handler be executed again', async () => {
    let executed = false;
    const unsubscribe = jest.fn(() => executed = true);
    const someHandler = jest.fn(() => new Promise<void>(r => setTimeout(r, test_promiseDelayMS)));

    const oncedHandler = once(someHandler);

    const result = oncedHandler({ event: 'any', unsubscribe });

    expect(executed).toBe(true);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(someHandler).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Promise);
    expect(result).resolves.toBeUndefined();

    await result;
  });
});
