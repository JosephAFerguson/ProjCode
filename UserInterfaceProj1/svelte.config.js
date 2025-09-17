
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
