<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';

	const items = [
		{
			name: 'item 1',
			id: '1',
		},
		{
			name: 'item 2',
			id: '2',
		},
		{
			name: 'item 3',
			id: '3',
		},
		{
			name: 'item 4',
			id: '4',
		},
		{
			name: 'item 5',
			id: '5',
		},
		{
			name: 'item 6',
			id: '6',
		},
		{
			name: 'item 7',
			id: '7',
		},
		{
			name: 'item 8',
			id: '8',
		},
		{
			name: 'item 9',
			id: '9',
		},
		{
			name: 'item 10',
			id: '10',
		},
		{
			name: 'item 11',
			id: '11',
		},
		{
			name: 'item 12',
			id: '12',
		},
		{
			name: 'item 13',
			id: '13',
		},
		{
			name: 'item 14',
			id: '14',
		},
		{
			name: 'item 15',
			id: '15',
		},
		{
			name: 'item 16',
			id: '16',
		},
		{
			name: 'item 17',
			id: '17',
		},
		{
			name: 'item 18',
			id: '18',
		},
		{
			name: 'item 19',
			id: '19',
		},
		{
			name: 'item 20',
			id: '20',
		},
		{
			name: 'item 21',
			id: '21',
		},
		{
			name: 'item 22',
			id: '22',
		},
		{
			name: 'item 23',
			id: '23',
		},
		{
			name: 'item 24',
			id: '24',
		},
		{
			name: 'item 25',
			id: '25',
		},
		{
			name: 'item 26',
			id: '26',
		},
		{
			name: 'item 27',
			id: '27',
		},
		{
			name: 'item 28',
			id: '28',
		},
		{
			name: 'item 29',
			id: '29',
		},
		{
			name: 'item 30',
			id: '30',
		},
		{
			name: 'item 31',
			id: '31',
		},
		{
			name: 'item 32',
			id: '32',
		},
		{
			name: 'item 33',
			id: '33',
		},
		{
			name: 'item 34',
			id: '34',
		},
		{
			name: 'item 35',
			id: '35',
		},
		{
			name: 'item 36',
			id: '36',
		},
		{
			name: 'item 37',
			id: '37',
		},
		{
			name: 'item 38',
			id: '38',
		},
		{
			name: 'item 39',
			id: '39',
		},
		{
			name: 'item 40',
			id: '40',
		},
		{
			name: 'item 41',
			id: '41',
		},
		{
			name: 'item 42',
			id: '42',
		},
		{
			name: 'item 43',
			id: '43',
		},
		{
			name: 'item 44',
			id: '44',
		},
		{
			name: 'item 45',
			id: '45',
		},
		{
			name: 'item 46',
			id: '46',
		},
		{
			name: 'item 47',
			id: '47',
		},
		{
			name: 'item 48',
			id: '48',
		},
		{
			name: 'item 49',
			id: '49',
		},
		{
			name: 'item 50',
			id: '50',
		},
	];
</script>

<svelte:head>
	<title>Pagination component - Svelper</title>
	<meta
		name="description"
		content="A svelte component for pagination - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<section>
	<h2>Pagination component</h2>

	<Pagination {items} let:item>
		<svelte:fragment>
			{#if item}
				<div>
					<p>{item.name}</p>
				</div>
			{/if}
		</svelte:fragment>
	</Pagination>
</section>
