// https://nuxt.com/docs/api/configuration/nuxt-config
import favicon from "./config/favicon";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "nuxt-icons", "@vueuse/nuxt", "@nuxtjs/device"],
  runtimeConfig: {
    // Server-side variables (not exposed to the browser)
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,

    // Variables exposed to the browser
    public: {
      SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, // Expose API key to the browser
    },
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { name: "pinterest", content: "nopin" },
        { name: "google", content: "notranslate" },
        // ...favicon.meta,
      ],
      // link: [...favicon.links],
      script: [{ src: "/js/InertiaPlugin.min.js" }],
    },
  },
  css: ["@/assets/sass/style.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: "modern-compiler",
          silenceDeprecations: [
            "legacy-js-api",
            "mixed-decls",
            "color-functions",
            "global-builtin",
            "import",
          ],
          additionalData: '@import "@/assets/sass/app.scss";',
        },
      },
    },
  },
});
