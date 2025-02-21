import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Define a task to load dummy data from dummy-data.ts.
      on('task', {
        // This task returns the dummy candidatos from your TS file.
        getDummyCandidatos() {
          // Use require with a relative path. Adjust the path if needed.
          // Note: Make sure dummy-data.ts is compiled or use ts-node.
          const { dummyCandidatos } = require(path.resolve(__dirname, "src/lib/dummy-data"));
          return dummyCandidatos;
        }
      });
      return config;
    },
  },
});
