<script lang="ts">
	import FloppyOctty from '$lib/games/FloppyOctty.svelte';
</script>

<svelte:head>
	<title>Floppy Octty as Svelte component - Svelper</title>
	<meta
		name="description"
		content="A simple game inspired by the classic Flappy Bird game built as a Svelte component using
		canvas and emojies 🐙.
		- A collection fun stuff"
	/>
</svelte:head>

<section>
	<h2>FLOPPY OCTTY!</h2>
	<p>
		A simple game inspired by the classic Flappy Bird game built as a Svelte component using
		<code>&lt;canvas&gt;</code> and emojies 🐙.
	</p>
</section>
<section>
	<FloppyOctty />
</section>
