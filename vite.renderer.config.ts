import autoprefixer from 'autoprefixer';
import path from 'path';
import react from '@vitejs/plugin-react';
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';

// https://vitejs.dev/config
export default defineConfig(env => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    plugins: [pluginExposeRenderer(name), react()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@elements': path.resolve(__dirname, './src/elements'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
    clearScreen: false,
  } as UserConfig;
});
