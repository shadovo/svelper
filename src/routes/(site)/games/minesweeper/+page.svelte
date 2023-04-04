<script lang="ts">
	import Minesweeper from '$lib/games/Minesweeper.svelte';
</script>

<svelte:head>
	<title>Minesweeper as Svelte component - Svelper</title>
	<meta
		name="description"
		content="A simple implementation of the classic game
		Minesweeper as Svelte component. - A collection fun stuff"
	/>
</svelte:head>

<section class="content-width">
	<h2>Minesweeper as Svelte component</h2>
	<p>A simple implementation of the classic game Minesweeper as Svelte component.</p>
	<p>
		Check out the implementation at <a
			href="https://github.com/shadovo/svelper/blob/main/src/lib/games/Minesweeper.svelte"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../Minesweeper.svelte</a
		>
	</p>
</section>
<section class="content-width">
	<Minesweeper columns="9" rows="10" mines="10" />
</section>
<section class="content-width">
	<p>
		This game is also available in an embed version at
		<a href="/embeds/v1/minesweeper" target="_blank"
			>https://www.svelper.com/embeds/v1/minesweeper</a
		>
	</p>
</section>

<style lang="scss">
</style>
