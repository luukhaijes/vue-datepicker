import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/VueDatePicker', import.meta.url)),
    },
  },
  esbuild: {
    minify: true,
  },
  build: {
    minify: 'terser',
    emptyOutDir: false,
    lib: {
      formats: ['es', 'umd'],
      entry: resolve(__dirname, 'src', 'Datepicker.vue'),
      name: 'VueDatepicker',
      fileName: (format) => `vue-datepicker.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'date-fns'],
      output: {
        globals: {
          vue: 'Vue',
          'date-fns': 'dateFns',
        },
      },
    },
    terserOptions: {
      output: {
        ecma: 5,
      },
    },
  },
});
