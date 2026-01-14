<script lang="ts">
	import { page } from '$app/state';
	import BreathingTechnique, { type BreathConfig } from '$lib/tools/BreathingTechnique.svelte';

	let breathInTime = $state(4000);
	let breathInHold = $state(700);
	let breathOutTime = $state(6000);
	let breathOutHold = $state(700);

	let breathInConfig: BreathConfig = $derived({
		duration: breathInTime,
		delay: breathInHold,
	});
	let breathOutConfig: BreathConfig = $derived({
		duration: breathOutTime,
		delay: breathOutHold,
	});

	$effect(() => {
		if (page.url.searchParams.has('breathInTime')) {
			breathInTime = Number(page.url.searchParams.get('breathInTime'));
		}
		if (page.url.searchParams.has('breathInHold')) {
			breathInHold = Number(page.url.searchParams.get('breathInHold'));
		}
		if (page.url.searchParams.has('breathOutTime')) {
			breathOutTime = Number(page.url.searchParams.get('breathOutTime'));
		}
		if (page.url.searchParams.has('breathOutHold')) {
			breathOutHold = Number(page.url.searchParams.get('breathOutHold'));
		}
	});
</script>

<svelte:head>
	<title>Beathing tecnique embed - Svelper</title>
	<meta
		name="description"
		content="An embed version of the Svelper breathing technique widget. - A collection fun stuff"
	/>
</svelte:head>

<BreathingTechnique {breathInConfig} {breathOutConfig} />

<style>
	:global(body) {
		padding: 4px;
	}
</style>
