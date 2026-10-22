import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(projectRoot, "../backend");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, "");
  const backendEnv = loadEnv(mode, backendRoot, "");
  const configuredTarget = env.VITE_API_PROXY_TARGET;
  const backendPort = backendEnv.PORT || process.env.PORT || "5000";
  const target = configuredTarget?.startsWith("http")
    ? configuredTarget.replace(/\/api\/?$/, "")
    : backendPort
      ? `http://127.0.0.1:${backendPort}`
      : null;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: target ? { "/api": { target, changeOrigin: true } } : {},
    },
  };
});
