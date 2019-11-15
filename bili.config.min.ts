import { Config } from 'bili';

export default {
  input: ['src/emit.ts', 'src/events.ts', 'src/subscribe.ts', 'src/unsubscribe.ts'],
  output: {
    moduleName: 'eventhoven',
    fileName: 'minimal.js',
    format: 'umd-min',
    target: 'browser',
  },
  plugins: {
    typescript2: true,
  },
} as Config;
