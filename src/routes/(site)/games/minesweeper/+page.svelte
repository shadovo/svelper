<script lang="ts">
	import { base } from '$app/paths';
	import Article from '$lib/components/Article.svelte';
	import Minesweeper from '$lib/games/Minesweeper.svelte';
	// TODO: update sizes according to new design
	import minesweeperHeroImage from '$img/games/minesweeper.png?w=2064;1376;1194;796;688;398&imagetools';
</script>

<svelte:head>
	<title>Minesweeper as Svelte component - Svelper</title>
	<meta
		name="description"
		content="A simple implementation of the classic game
		Minesweeper as Svelte component. - A collection fun stuff"
	/>
</svelte:head>

<Article title="Minesweeper" image={minesweeperHeroImage} imageColor="#6b3b19">
	<section>
		<p>A simple implementation of the classic game Minesweeper as Svelte component.</p>
		<p>
			Check out the implementation at <a
				href="https://github.com/shadovo/svelper/blob/main/src/lib/games/Minesweeper.svelte"
				target="_blank"
				rel="noopener noreferrer">github.com/shadovo/svelper/.../Minesweeper.svelte</a
			>
		</p>
	</section>
	<section>
		<Minesweeper columns="9" rows="10" mines="10" />
	</section>
	<section>
		<p>
			This game is also available in an embed version at
			<a href="{base}/embeds/v1/minesweeper" target="_blank"
				>https://www.svelper.com/embeds/v1/minesweeper</a
			>
		</p>
	</section>
</Article>

<style lang="scss">
</style>
