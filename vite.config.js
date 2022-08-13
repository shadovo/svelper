import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import * as path from 'path';

export default defineConfig(() => {
	const config = {
		plugins: [sveltekit()],
		resolve: {
			alias: {
				$img: path.resolve('src/images'),
			},
		},
	};
	return config;
});
