import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Optional: during local development, forward /api/* calls to your live
  // site's PHP backend so the dev server shows real content. Set your domain
  // in .env -> VITE_API_TARGET=https://your-site.com  (no trailing slash).
  // When unset, /api calls just fail locally (no PHP on this machine) and the
  // pages show their "couldn't load" states — that's expected.
  const apiTarget = process.env.VITE_API_TARGET;
  const proxy = apiTarget ? { "/api": { target: apiTarget, changeOrigin: true } } : undefined;

  return {
    server: {
      host: "::",
      port: 8080,
      ...(proxy ? { proxy } : {}),
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
