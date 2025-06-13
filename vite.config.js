import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default ({ mode }) => {
  loadEnv(mode, process.cwd());
  return defineConfig({
    define: { 'process.env': {} },
    server: { port: 3000 },
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    envPrefix: ['VITE_'],
  });
};
