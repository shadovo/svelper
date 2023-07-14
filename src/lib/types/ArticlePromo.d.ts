import type { Picture } from 'vite-imagetools';

export type ArticlePromo = {
	url: string;
	promotion: {
		title: string;
		description: string;
		imageData?: Picture;
	};
	meta: {
		publishedDate?: string;
		tags: string[];
	};
	origin: {
		author: {
			name: string;
			profilePicture: Picture;
		};
		publication: string;
	};
};
