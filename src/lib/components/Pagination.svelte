<script lang="ts">
	type T = $$Generic;
	interface $$Slots {
		default: {
			item: T;
		};
	}
	export let items: T[] = [];
	export let filteredItems: T[] = [];
	export let page = 0;
	export let itemsPerPage = 5;

	let maxPage = 1;

	$: maxPage = Math.ceil(items.length / itemsPerPage);
	$: filteredItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
</script>

<div class="pagination">
	<div class="pagination-list">
		{#each filteredItems as item}
			<slot {item} />
		{/each}
	</div>
	<div class="pagination-controlls">
		<button class:hidden={page <= 0} on:click={() => (page = page - 1)}>&lt;</button>
		<div class="pagination-page-buttons">
			<div class:hidden={page - 2 <= 0} class="pagination-more">...</div>
			<button class:hidden={page - 1 <= 0} on:click={() => (page = page - 2)}>{page - 1}</button>
			<button class:hidden={page <= 0} on:click={() => (page = page - 1)}>{page}</button>
			<button disabled>{page + 1}</button>
			<button class:hidden={page + 2 > maxPage} on:click={() => (page = page + 1)}
				>{page + 2}</button
			>
			<button class:hidden={page + 3 > maxPage} on:click={() => (page = page + 2)}
				>{page + 3}</button
			>
			<div class:hidden={page + 4 > maxPage} class="pagination-more">...</div>
		</div>
		<button class:hidden={page + 1 >= maxPage} on:click={() => (page = page + 1)}>&gt;</button>
	</div>
</div>

<style>
	.pagination-controlls {
		display: flex;
		gap: var(--gap-half);
		justify-content: space-between;
		align-items: center;
	}

	.pagination-page-buttons {
		display: flex;
		gap: var(--gap-quarter);
	}

	.pagination-more {
		font-weight: bold;
		font-size: 3rem;
		line-height: 1;
		padding: 0 var(--gap-half);
		user-select: none;
	}
	.hidden {
		visibility: hidden;
	}
</style>
