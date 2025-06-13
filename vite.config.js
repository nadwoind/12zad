import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
    },
    envPrefix: ['VITE_'],
  });
};