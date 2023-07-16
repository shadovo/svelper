<script>
	import { page } from '$app/stores';
</script>

<div>
	<h1><span class="code">{$page.status}</span>{$page.error?.message}</h1>
</div>

<style>
	div {
		display: grid;
		justify-content: center;
		align-items: center;
		padding: var(--gap-3);
		text-align: center;
	}

	h1 {
		text-wrap: balance;
	}
	.code {
		display: block;
		font-weight: var(--font-weight-bold);
		font-size: 8rem;
	}
</style>
