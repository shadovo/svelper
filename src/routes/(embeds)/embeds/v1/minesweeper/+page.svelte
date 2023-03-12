<script>
	import { page } from '$app/stores';
	import Minesweeper from '$lib/games/Minesweeper.svelte';

	const columns = $page.url.searchParams.get('columns') ?? undefined;
	const rows = $page.url.searchParams.get('rows') ?? undefined;
	const mines = $page.url.searchParams.get('mines') ?? undefined;
</script>

<Minesweeper {columns} {rows} {mines} />
