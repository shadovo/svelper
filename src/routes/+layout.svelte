<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../styles/app.scss';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
