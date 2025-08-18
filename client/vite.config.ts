import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "#app": "/app",
      "#components": "/app/components",
      "#constants": "/app/constants",
      "#context": "/app/context",
      "#hooks": "/app/hooks",
      "#internals": "/app/internals",
      "#pages": "/app/pages",
      "#layouts": "/app/pages/layouts",
      "#router": "/app/router",
      "#theme": "/app/theme",
      "#types": "/app/types",
      "#utils": "/app/utils",
      "#public": "/public",
      "#assets": "/public/assets",
      "#src": "/src",
    },
  },
});
