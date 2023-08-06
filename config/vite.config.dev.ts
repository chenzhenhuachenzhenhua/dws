import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
// http://localhost:8080
export default mergeConfig(
  {
    mode: 'development',
    server: {
      port: '3000',
      open: true,
      fs: {
        strict: true,
      },
      //反向代理
      proxy: {
        '/api': {
          target: 'https://dev.qisi.cc/api',
          changeOrigin: true,
          // 将api替换成''
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
