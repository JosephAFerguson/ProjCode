import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}

import adapter from '@sveltejs/adapter-netlify';

    /** @type {import('@sveltejs/kit').Config} */
    export const config = {
      kit: {
        adapter: adapter({
          // Optional: Enable Edge Functions
          edge: false, 
          // Optional: Split app into multiple functions for better performance
          split: false 
        })
      }
    };
