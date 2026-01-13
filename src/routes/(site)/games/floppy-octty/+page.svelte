<script lang="ts">
	import { resolve } from '$app/paths';
	import Article from '$lib/components/Article.svelte';
	import FloppyOctty from '$lib/games/FloppyOctty.svelte';
	import floppyOcctyHeroImage from '$img/games/floppy-octty.png?w=2400;1600;1200;800;400&imagetools';
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

<Article title="Floppy Octty" image={floppyOcctyHeroImage} imageColor="#0f353a">
	<section>
		<p>
			A simple game inspired by the classic Flappy Bird game built as a Svelte component using
			<code>&lt;canvas&gt;</code> and emojies 🐙.
		</p>
		<p>
			Check out the implementation at <a
				href="https://github.com/shadovo/svelper/blob/main/src/lib/games/FloppyOctty.svelte"
				target="_blank"
				rel="noopener noreferrer">github.com/shadovo/svelper/.../FloppyOctty.svelte</a
			>
		</p>
	</section>
	<section>
		<FloppyOctty />
	</section>
	<section>
		<p>
			This game is also available in an embed version at
			<a href={resolve('/embeds/v1/floppy-octty')} target="_blank"
				>https://www.svelper.com/embeds/v1/floppy-octty</a
			>
		</p>
	</section>
</Article>
