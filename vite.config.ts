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
    cssCodeSplit: true,
    // assetsInlineLimit: 1024 * 4 * 4,
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    rollupOptions: {
      // 指定生成静态资源的存放路径
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
        assetFileNames: '[ext]/[name].[ext]',
      },
    },
  },
});
