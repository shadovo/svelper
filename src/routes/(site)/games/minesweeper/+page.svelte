<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import Minesweeper from '$lib/games/Minesweeper.svelte';
	import minesweeperHeroImage from '$img/games/minesweeper.png?w=398;688;796;1194;1376;2064&imagetools';
</script>

<svelte:head>
	<title>Minesweeper as Svelte component - Svelper</title>
	<meta
		name="description"
		content="A simple implementation of the classic game
		Minesweeper as Svelte component. - A collection fun stuff"
	/>
</svelte:head>

<section>
	<div class="hero">
		<Image src={minesweeperHeroImage} alt="Minesweeper" aspectRatio="3/1" />
		<h2>Minesweeper</h2>
	</div>
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
		<a href="/embeds/v1/minesweeper" target="_blank"
			>https://www.svelper.com/embeds/v1/minesweeper</a
		>
	</p>
</section>

<style lang="scss">
</style>
