<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
	import lorem from '$lib/utils/lorem-ipsum';

	const smallItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

	const largeItems = lorem.slice(0, 60).map((p, i) => ({
		id: i,
		title: `Item ${i + 1}`,
		text: p.substring(0, 250),
	}));
</script>

<svelte:head>
	<title>Pagination component - Svelper</title>
	<meta
		name="description"
		content="A svelte component for pagination - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<Article title="Pagination Svelte component">
	<section>
		<p>This is a component that lets you paginate content.</p>
		<p>
			The <code>&lt;Pagination&gt;</code> accepts a list of items as the <code>items</code>
			attribute. It will then expose the them as <code>item</code> for each item that should currently
			be shown.
		</p>
		<div class="padded sidescroll-container">
			<div class="grid-table">
				<div class="attribute">Attribute</div>
				<div class="type">Type</div>
				<div class="default">Default</div>
				<div class="description">Description</div>

				<div class="attribute"><code>items</code></div>
				<div class="type"><code>Array of &lt;T&gt;</code></div>
				<div class="default"><code>[]</code></div>
				<div class="description">The list of items to paginate</div>

				<div class="attribute"><code>item</code></div>
				<div class="type"><code>&lt;T&gt;</code></div>
				<div class="default"><code>undefined</code></div>
				<div class="description">The item that should currently be shown</div>

				<div class="attribute"><code>itemsPerPage</code></div>
				<div class="type"><code>Number</code></div>
				<div class="default"><code>5</code></div>
				<div class="description">The number of items that should be shown per page.</div>

				<div class="attribute"><code>page</code></div>
				<div class="type"><code>Number</code></div>
				<div class="default"><code>0</code></div>
				<div class="description">
					The selected page. Either as a one time start value or with <code>bind:page</code> to have
					updates synced to the parent as well.
				</div>
			</div>
		</div>
		<p>
			Check out the code at <a
				href="https://github.com/shadovo/svelper/blob/main/src/lib/components/Pagination.svelte"
				target="_blank"
				rel="noopener noreferrer">github.com/shadovo/svelper/../Pagination.svelte</a
			>
		</p>
	</section>
	<section>
		<h3>Paginate list of strings</h3>
		<SyntaxHighlighting language="javascript"
			>{`
		const smallItems = [
			'Item 1',
			'Item 2',
			//...
			'Item 20',
		]
	`}</SyntaxHighlighting
		>
		<SyntaxHighlighting language="html"
			>{`	
	<Pagination items={smallItems} itemsPerPage={4} let:item>
		<p>{item}</p>
	</Pagination>	
	`}</SyntaxHighlighting
		>
		<Pagination items={smallItems} itemsPerPage={4} let:item>
			<p>{item}</p>
		</Pagination>
	</section>
	<section>
		<h3>Paginate list of objects</h3>
		<SyntaxHighlighting language="javascript"
			>{`	
		const items = [{
			title: 'Item 1',
			text: 'Lorem ipsum...'
		},{
			title: 'Item 2',
			text: 'Vivamus mattis...'
		},{
			// ...
		},{
			title: 'Item 30',
			text: 'Sed malesuada...'
		}]
	`}</SyntaxHighlighting
		>
		<SyntaxHighlighting language="html"
			>{`
		<Pagination {items} itemsPerPage={4} let:item>
			<div class="row">
				<h4>{item.title}</h4>
				<p>{item.text}</p>
			</div>
		</Pagination>
	`}</SyntaxHighlighting
		>

		<Pagination items={largeItems} itemsPerPage={4} let:item>
			<div class="row">
				<h4>{item.title}</h4>
				<p>{item.text}</p>
			</div>
		</Pagination>
	</section>
</Article>

<style lang="scss">
	.row {
		margin-bottom: var(--gap);
		padding-bottom: var(--gap);
		border-bottom: 3px solid var(--c-text);

		&:last-child {
			margin-bottom: var(--gap-2);
			padding-bottom: 0;
			border-bottom: 0;
		}
	}

	.sidescroll-container {
		max-width: 100%;
		overflow-x: auto;
	}

	.grid-table {
		display: grid;
		grid-template-columns: max-content max-content max-content 1fr;
		grid-template-rows: auto;
		grid-template-areas: 'Attribute Type Default Description';
		margin-bottom: var(--gap);
		border: 2px solid var(--c-table-border);
		min-width: 620px;
		> div {
			padding: var(--gap-half);
			border: 1px solid var(--c-table-border);
		}

		> div:nth-child(-n + 4) {
			font-weight: bold;
		}
		> div:nth-child(8n + 5),
		> div:nth-child(8n + 6),
		> div:nth-child(8n + 7),
		> div:nth-child(8n + 8) {
			background-color: var(--c-table-row);
		}
	}
</style>
