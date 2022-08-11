import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import * as path from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true,
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true,
		}),
		paths: {
			base: dev ? '' : '/level-up',
		},
		vite: {
			resolve: {
				alias: {
					$img: path.resolve('src/images'),
				},
			},
		},
	},
};

export default config;
