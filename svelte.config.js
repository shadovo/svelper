import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer()],
		},
	}),
	vitePlugin: {
		inspector: {
			holdMode: true,
			toggleButtonPos: 'bottom-right',
		},
	},
	kit: {
		inlineStyleThreshold: 10000,
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true,
		}),
	},
};

export default config;
