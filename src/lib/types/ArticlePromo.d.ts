import type { ImageData } from '$lib/components/Image.svelte';

export type ArticlePromo = {
	url: string;
	promotion: {
		title: string;
		description: string;
		imageData?: ImageData;
	};
	meta: {
		publishedDate?: string;
		tags: string[];
	};
	origin: {
		author: {
			name: string;
			profilePicture: ImageData;
		};
		publication: string;
	};
};
