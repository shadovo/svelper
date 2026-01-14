<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}

<style>
	:global(html, body) {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background: transparent;
	}
</style>
