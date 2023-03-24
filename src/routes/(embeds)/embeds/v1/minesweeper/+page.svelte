<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Minesweeper from '$lib/games/Minesweeper.svelte';

	let columns: string | undefined;
	let rows: string | undefined;
	let mines: string | undefined;

	if (browser) {
		columns = $page.url.searchParams.get('columns') ?? undefined;
		rows = $page.url.searchParams.get('rows') ?? undefined;
		mines = $page.url.searchParams.get('mines') ?? undefined;
	}
</script>

<svelte:head>
	<title>Minesweeper embed - Svelper</title>
	<meta
		name="description"
		content="An embed version of the Svelper minesweeper widget. - A collection fun stuff"
	/>
</svelte:head>

{#if browser}
	<Minesweeper {columns} {rows} {mines} />
{/if}
