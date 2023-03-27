<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreathingTechnique from '$lib/tools/BreathingTechnique.svelte';

	let breathInTime = 4000;
	let breathInHold = 700;
	let breathOutTime = 6000;
	let breathOutHold = 700;

	if (browser) {
		if ($page.url.searchParams.has('breathInTime')) {
			breathInTime = Number($page.url.searchParams.get('breathInTime'));
		}
		if ($page.url.searchParams.has('breathInHold')) {
			breathInHold = Number($page.url.searchParams.get('breathInHold'));
		}
		if ($page.url.searchParams.has('breathOutTime')) {
			breathOutTime = Number($page.url.searchParams.get('breathOutTime'));
		}
		if ($page.url.searchParams.has('breathOutHold')) {
			breathOutHold = Number($page.url.searchParams.get('breathOutHold'));
		}
	}

	const breathInConfig = {
		duration: breathInTime,
		delay: breathInHold,
	};
	const breathOutConfig = {
		duration: breathOutTime,
		delay: breathOutHold,
	};
</script>

<svelte:head>
	<title>Beathing tecnique embed - Svelper</title>
	<meta
		name="description"
		content="An embed version of the Svelper breathing technique widget. - A collection fun stuff"
	/>
</svelte:head>

{#if browser}
	<BreathingTechnique {breathInConfig} {breathOutConfig} />
{/if}

<style>
	:global(body) {
		padding: 1px;
	}
</style>
