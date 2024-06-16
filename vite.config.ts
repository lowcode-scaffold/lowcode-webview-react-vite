import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: () => 'vscode.index.js',
        // chunkFileNames: 'index.js',
        entryFileNames: 'vscode.index.js',
        assetFileNames: () => 'vscode.index.css',
      },
    },
  },
  experimental: {
    renderBuiltUrl(
      filename: string,
      type: { hostId: string; hostType: 'js' | 'css' | 'html'; type: 'public' | 'asset' }
    ) {
      if (process.env.bucket) {
        return `https://${process.env.bucket}.oss-cn-beijing.aliyuncs.com/${filename}`;
      }
      return `./${filename}`;
    },
  },
});
