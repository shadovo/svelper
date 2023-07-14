import type { Picture } from 'vite-imagetools';
import { base } from '$app/paths';
import minesweeperHeroImage from '$img/games/minesweeper.png?w=1104;900;736;600;368;300&imagetools';
import floppyOcctyHeroImage from '$img/games/floppy-octty.png?w=1104;900;736;600;368;300&imagetools';

const articles = [
	{
		title: 'Floppy Octty',
		description: 'Underwater version of the classic Flappy Bird game.',
		image: floppyOcctyHeroImage as Picture,
		imageColor: '#0f353a',
		link: `${base}/games/floppy-octty`,
	},
	{
		title: 'Minesweeper',
		description: 'The classic game Minesweeper as Svelte component.',
		image: minesweeperHeroImage as Picture,
		imageColor: '#6b3b19',
		link: `${base}/games/minesweeper`,
	},
];

export function load() {
	return {
		articles,
	};
}
