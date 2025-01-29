import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  cacheDir: './.vite-cache', // ✅ Moves cache outside `node_modules` to avoid permission issues
  optimizeDeps: {
    include: ["jwt-decode", "@fortawesome/fontawesome-svg-core"], // ✅ Ensures dependencies load correctly
  },
  build: {
    rollupOptions: {
      external: [], // ✅ Ensures nothing critical is excluded from the build
    }
  },
  server: {
    watch: {
      usePolling: true, // ✅ Ensures file changes are detected properly on Windows
    }
  }
});
