<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import HardbreadShip from '$lib/games/hardbread-ship/HardbreadShip.svelte';
	import hardbreadHeroImage from '$img/games/hardbread.png?w=2400;1600;1200;800;400&imagetools';
</script>

<svelte:head>
	<title>Hardbread delivery ship game as Svelte component - Svelper</title>
	<meta
		name="description"
		content="How long can you balance the hardbread delivery ship before it capsizes.
		- A collection fun stuff"
	/>
</svelte:head>

<Article title="Hardbread delivery" image={hardbreadHeroImage} imageColor="#0f353a">
	<section>
		<p>Balance the ship as long as you can before it capsizes.</p>
		<p>
			Check out the implementation at <a
				href="https://github.com/shadovo/svelper/blob/main/src/lib/games/HardbreadShip.svelte"
				target="_blank"
				rel="noopener noreferrer">github.com/shadovo/svelper/.../HardbreadShip.svelte</a
			>
		</p>
	</section>
	<section>
		<HardbreadShip />
	</section>
	<!-- <section>
		<p>
			This game is also available in an embed version at
			<a href="/embeds/v1/floppy-octty" target="_blank"
				>https://www.svelper.com/embeds/v1/floppy-octty</a
			>
		</p>
	</section> -->
</Article>
