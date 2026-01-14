<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		items?: T[];
		page?: number;
		itemsPerPage?: number;
		children?: Snippet<[T]>;
	}

	let { items = [], page = $bindable(0), itemsPerPage = 5, children }: Props = $props();

	let maxPage = $derived(Math.ceil(items.length / itemsPerPage) - 1);
	let filteredItems = $derived(items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage));
</script>

<div class="pagination">
	<div class="pagination-list">
		{#each filteredItems as item (item)}
			{@render children?.(item)}
		{/each}
	</div>
	<div class="pagination-controlls">
		<!-- arrow previous -->
		<button
			aria-label="previous page"
			class="button-icon arrow"
			class:hidden={page === 0}
			onclick={() => (page = page - 1)}
		>
			<svg width="24" height="24" viewBox="0 0 24 24">
				<polyline fill="none" points="16,6 8,12 16,18" />
			</svg>
		</button>
		<div class="pagination-page-buttons">
			<!-- first page -->
			<button
				aria-label="first page"
				class="first pagination-button"
				class:shown={page > 2}
				onclick={() => (page = 0)}>1</button
			>

			<!-- ... -->
			<div class:shown={page > 3} class="pagination-button pagination-more">...</div>

			<!-- previous previous page -->
			<button
				aria-label="Go to page {page - 1}"
				class="pagination-button"
				class:shown={page > 1 && page < 4}
				onclick={() => (page = page - 2)}>{page - 1}</button
			>

			<!-- previous page -->
			<button
				aria-label="Go to page {page}"
				class="pagination-button"
				class:shown={page > 0}
				onclick={() => (page = page - 1)}>{page}</button
			>

			<!-- current page -->
			<button aria-label="current page" class="pagination-button shown" disabled>{page + 1}</button>

			<!-- next page -->
			<button
				aria-label="Go to page {page + 2}"
				class="pagination-button"
				class:shown={page < maxPage}
				onclick={() => (page = page + 1)}>{page + 2}</button
			>

			<!-- next next page -->
			<button
				aria-label="Go to page {page + 3}"
				class="pagination-button"
				class:shown={page > maxPage - 4 && page < maxPage - 1}
				onclick={() => (page = page + 2)}>{page + 3}</button
			>

			<!-- ... -->
			<div class:shown={page < maxPage - 3} class="pagination-button pagination-more">...</div>

			<!-- last page -->
			<button
				aria-label="last page"
				class="pagination-button last"
				class:shown={page < maxPage - 2}
				onclick={() => (page = maxPage)}>{maxPage + 1}</button
			>
		</div>

		<!-- arrow next -->
		<button
			aria-label="next page"
			class="button-icon arrow"
			class:hidden={page === maxPage}
			onclick={() => (page = page + 1)}
		>
			<svg width="24" height="24" viewBox="0 0 24 24">
				<polyline fill="none" points="8,6 16,12 8,18" />
			</svg>
		</button>
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

	.arrow,
	.pagination-button {
		min-width: 45px;
		font-size: 1rem;
		text-align: center;
		padding: var(--gap-half);
		justify-content: center;
	}

	.arrow {
		stroke: currentColor;
	}

	.pagination-button {
		display: none;
	}

	.pagination-more {
		font-weight: bold;
		font-size: 2rem;
		line-height: 44px;
		padding: 0 var(--gap-half);
		user-select: none;
	}
	.hidden {
		visibility: hidden;
	}

	.shown {
		display: block;
	}

	@media (width < 768px) {
		.pagination-controlls {
			gap: var(--gap-quarter);
		}
		.arrow,
		.pagination-button {
			min-width: 32px;
			height: 32px;
			border-width: 4px;
			flex-grow: 0;
			padding: var(--gap-quarter);
			font-size: 1rem;
			line-height: 1;
		}
		.pagination-more {
			padding: var(--gap-quarter);
		}
	}
</style>
