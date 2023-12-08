import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
  plugins: [react()],
  envDir: "./src/environment",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/")) {
            if (id.includes("/node_modules/react/")) {
              return "react"
            }

            const modulesManualChunks = [
              "msw",
              "graphql",
              "lodash",
              "date-fns",
              "redux",
            ]
            let chunkName = ""
            for (let i = 0; i < modulesManualChunks.length; i++) {
              if (id.includes(modulesManualChunks[i])) {
                chunkName = modulesManualChunks[i]
                break
              }
            }
            return chunkName || "vendor"
          }
          if (id.includes("/src/views/")) {
            const componentName = id.split("/")
            if (componentName.length > 0) {
              return `${componentName[componentName.length - 2]}`
            }
          }
        },
      },
    },
  },
})
