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
});
