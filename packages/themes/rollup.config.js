import pkg from './package.json';
import common from '../../rollup.config.js';
import replace from '@rollup/plugin-replace';
import {sizeSnapshot} from 'rollup-plugin-size-snapshot';

const isNative =
  typeof process.env.IS_NATIVE !== 'undefined' &&
  process.env.IS_NATIVE === 'true';

const plugins = isNative
  ? [
      replace({
        'styled-components': 'styled-components/native',
      }),
    ]
  : [];

const output = isNative
  ? [
      {
        file: pkg['react-native'],
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ]
  : [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ];

const config = {
  input: 'lib/index.ts',
  output,
  plugins: [...plugins, ...common.plugins, sizeSnapshot()],
  external: [
    // ...Object.keys(pkg.dependencies || {}),
    // ...Object.keys(pkg.peerDependencies || {}),
    'react-native',
    'react-native-web',
  ],
};

export default Object.assign(common, config);
