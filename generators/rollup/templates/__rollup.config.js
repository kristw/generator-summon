import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/main.js',
  plugins: [
    nodeResolve(),
    babel(babelrc())
  ],
  targets: [
    {
      dest: 'dist/<%=name%>.js',
      format: 'umd',
      moduleName: '<%=name%>',
      sourceMap: true
    },
    {
      dest: 'dist/<%=name%>-es.js',
      format: 'es'
    }
  ]
}