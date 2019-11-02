import { Config } from 'bili';

export default {
  input: 'src/index.ts',
  output: {
    moduleName: 'eventhoven',
    fileName: 'umd.js',
    format: 'umd-min',
    target: 'browser',
  },
  plugins: {
    typescript2: true,
  },
} as Config;
