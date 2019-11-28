import { test_eventSignatures } from './common';
import { Eventhoven } from '../src';

describe('Eventhoven', () => {
  it('creates a correct class', () => {
    const eventh = new Eventhoven(test_eventSignatures);

    expect(eventh).toBeInstanceOf(Eventhoven);
  });

  it('supports inheritance', () => {
    const eventh = new Eventhoven(test_eventSignatures);

    const myeventh = new class extends Eventhoven<typeof test_eventSignatures> {
      constructor() {
        super(test_eventSignatures);
      }
    };

    expect(eventh).toBeInstanceOf(Eventhoven);
    expect(myeventh).toBeInstanceOf(Eventhoven);
  });

  it('proxies events properly', async () => {
    const handler = jest.fn();
    const eventh = new Eventhoven(test_eventSignatures);

    await eventh.emit('event3');

    expect(handler).not.toHaveBeenCalled();

    eventh.on('event3', handler);
    await eventh.emit('event3');

    expect(handler).toHaveBeenCalledTimes(1);

    eventh.off('event3', handler);
    await eventh.emit('event3');

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
