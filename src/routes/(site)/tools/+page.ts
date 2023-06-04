import { base } from '$app/paths';
import soundboardHeroImage from '$img/tools/soundboard.png?w=1104;900;736;600;368;300&imagetools';
import breathHeroImage from '$img/tools/breath.png?w=1104;900;736;600;368;300&imagetools';

const articles = [
	{
		title: 'Soundboard',
		description: 'Soundboard with WebAudio API.',
		image: soundboardHeroImage,
		imageColor: '#1d6a64',
		link: `${base}/tools/soundboard`,
	},
	{
		title: 'Breathing technique',
		description: 'Breathing timer as Svelte component.',
		image: breathHeroImage,
		imageColor: '#202b3f',
		link: `${base}/tools/breath`,
	},
];

export function load() {
	return {
		articles,
	};
}
