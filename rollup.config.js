import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
  input: './src/entry',
  output: {
    file: 'main.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}]