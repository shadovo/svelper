<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import minesweeperHeroImage from '$img/games/minesweeper.png?scale-width=200;250;312;366&imagetools';
	import floppyOcctyHeroImage from '$img/games/floppy-octty.png?scale-width=200;250;312;366&imagetools';
</script>

<svelte:head>
	<title>Games built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<section class="content-width">
	<h2>Games built in Svelte</h2>
	<div class="grid">
		<a class="card" href="/games/minesweeper">
			<div class="img">
				<Image src={minesweeperHeroImage} alt="" aspectRatio="3/1" />
			</div>
			<h3>Minesweeper</h3>
			<p>The classic game Minesweeper as Svelte component.</p>
		</a>
		<a class="card" href="/games/floppy-octty">
			<div class="img">
				<Image src={floppyOcctyHeroImage} alt="" aspectRatio="3/1" />
			</div>
			<h3>Floppy Octty</h3>
			<p>Underwater version of the classic Flappy Bird game.</p>
		</a>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		gap: var(--gap);
	}

	.card {
		background: var(--color-bg);
		box-shadow: 0 2px 3px 1px rgb(0, 0, 0, 0.3);
		padding: 1rem;
		background: var(--c-table-row);
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: var(--color-text);
		transform-origin: center;

		&:hover {
			transform: scale(1.02);
			box-shadow: 0 3px 6px 1px rgb(0, 0, 0, 0.3);
		}

		> .img {
			margin: calc(-1 * var(--gap));
			margin-bottom: var(--gap);
			padding: 0;
		}

		h3 {
			margin-bottom: 0.5rem;
			font-weight: bold;
		}
		p {
			font-weight: normal;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}
</style>
