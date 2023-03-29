<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import FloppyOctty from '$lib/games/FloppyOctty.svelte';

	let width: string | undefined;
	let height: string | undefined;

	if (browser) {
		width = $page.url.searchParams.get('width') ?? undefined;
		height = $page.url.searchParams.get('height') ?? undefined;
	}
</script>

<svelte:head>
	<title>FloppyOctty embed - Svelper</title>
	<meta
		name="description"
		content="An embed version of the Svelper FloppyOctty widget. - A collection fun stuff"
	/>
</svelte:head>

<FloppyOctty {width} {height} />
