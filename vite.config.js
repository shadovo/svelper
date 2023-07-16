import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

const supportedExtensions = ['png', 'jpg', 'jpeg'];

export default defineConfig(() => {
	const config = {
		plugins: [
			imagetools({
				defaultDirectives: (url) => {
					const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
					if (supportedExtensions.includes(extension)) {
						return new URLSearchParams({
							format: 'webp;' + extension,
							as: 'picture',
						});
					}
					return new URLSearchParams();
				},
			}),
			sveltekit(),
		],
	};
	return config;
});
