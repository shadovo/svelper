import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import * as path from 'path';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

export default defineConfig(() => {
	const config = {
		plugins: [
			imagetools({
				defaultDirectives: (url) => {
					const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
					if (supportedExtensions.includes(extension)) {
						const upscaledWidths = (url.searchParams.get('scale-width') || '')
							.split(';')
							.map((w) => parseInt(w, 10))
							.reduce((acc, w) => {
								acc.push(w);
								acc.push(w * 2);
								acc.push(w * 3);
								return acc;
							}, [])
							.flat()
							.sort((a, b) => b - a)
							.join(';');
						return new URLSearchParams({
							format: 'webp;' + extension,
							picture: true,
							...(upscaledWidths.length > 0 ? { w: upscaledWidths } : {}),
						});
					}
					return new URLSearchParams();
				},
			}),
			sveltekit(),
		],
		resolve: {
			alias: {
				$img: path.resolve('src/images'),
			},
		},
	};
	return config;
});
