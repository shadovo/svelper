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

	$: maxPage = Math.ceil(items.length / itemsPerPage) - 1;
	$: filteredItems = items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
</script>

<div class="pagination">
	<div class="pagination-list">
		{#each filteredItems as item}
			<slot {item} />
		{/each}
	</div>
	<div class="pagination-controlls">
		<!-- arrow previous -->
		<button class="arrow" class:hidden={page === 0} on:click={() => (page = page - 1)}>&lt;</button>
		<div class="pagination-page-buttons">
			<!-- first page -->
			<button class="first pagination-button" class:shown={page > 2}>1</button>

			<!-- ... -->
			<div class:shown={page > 3} class="pagination-button pagination-more">...</div>

			<!-- previous previous page -->
			<button
				class="pagination-button"
				class:shown={page > 1 && page < 4}
				on:click={() => (page = page - 2)}>{page - 1}</button
			>

			<!-- previous page -->
			<button class="pagination-button" class:shown={page > 0} on:click={() => (page = page - 1)}
				>{page}</button
			>

			<!-- current page -->
			<button class="pagination-button shown" disabled>{page + 1}</button>

			<!-- next page -->
			<button
				class="pagination-button"
				class:shown={page < maxPage}
				on:click={() => (page = page + 1)}>{page + 2}</button
			>

			<!-- next next page -->
			<button
				class="pagination-button"
				class:shown={page > maxPage - 4 && page < maxPage - 1}
				on:click={() => (page = page + 2)}>{page + 3}</button
			>

			<!-- ... -->
			<div class:shown={page < maxPage - 3} class="pagination-button pagination-more">...</div>

			<!-- last page -->
			<button class="pagination-button last" class:shown={page < maxPage - 2}>{maxPage + 1}</button>
		</div>

		<!-- arrow next -->
		<button class="arrow" class:hidden={page === maxPage} on:click={() => (page = page + 1)}
			>&gt;</button
		>
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

	.pagination-button {
		min-width: 55px;
		text-align: center;
		display: none;
	}
	.shown {
		display: block;
	}

	@media (max-width: 768px) {
		.pagination-controlls {
			gap: var(--gap-quarter);
		}
		.arrow,
		.pagination-button {
			min-width: unset;
			flex-grow: 0;
			padding: var(--gap-quarter) var(--gap-half);
			font-size: 1rem;
			line-height: 1;
		}
		.pagination-more {
			padding: var(--gap-quarter);
		}
	}
</style>
