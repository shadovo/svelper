import type { Picture } from 'vite-imagetools';
import type { Tag } from '../../data/tags';

export type ArticlePromo = {
	url: string;
	promotion: {
		title: string;
		description: string;
		imageData?: Picture;
	};
	meta: {
		publishedDate?: string;
		tags: Tag[];
	};
	origin: {
		author: {
			name: string;
			profilePicture: Picture;
		};
		publication: string;
	};
};
