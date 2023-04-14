<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import soundboardHeroImage from '$img/tools/soundboard.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';
	import breathHeroImage from '$img/tools/breath.png?w=1098;936;750;732;624;500;366;312;275;250&imagetools';
	const imageSizes = `
		(min-width: 1024px)	312px,
		(min-width: 769px)	calc((100vw - 388px) / 2),
		(min-width: 481px)	calc(50vw - 28px),
		calc(100vw - 48px)`;
</script>

<svelte:head>
	<title>Tools built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<section class="content-width">
	<h2>Tools built in Svelte</h2>
	<div class="grid">
		<a class="card" href="/tools/soundboard">
			<div class="img">
				<Image
					alt=""
					role="presentation"
					background="#1d6a64"
					src={soundboardHeroImage}
					sizes={imageSizes}
					aspectRatio="3/1"
				/>
			</div>
			<h3>Soundboard</h3>
			<p>Soundboard with WebAudio&nbsp;API.</p>
		</a>
		<a class="card" href="/tools/breath">
			<div class="img">
				<Image
					alt=""
					role="presentation"
					background="#202b3f"
					src={breathHeroImage}
					sizes={imageSizes}
					aspectRatio="3/1"
				/>
			</div>
			<h3>Breathing technique</h3>
			<p>Breathing timer as Svelte component.</p>
		</a>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		gap: var(--gap);
	}

	.card {
		background: var(--color-bg);
		box-shadow: 0 2px 3px 1px rgb(0, 0, 0, 0.3);
		padding: 1rem;
		background: var(--c-table-row);
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: var(--color-text);
		transform-origin: center;

		&:hover {
			transform: scale(1.02);
			box-shadow: 0 3px 6px 1px rgb(0, 0, 0, 0.3);
		}

		> .img {
			margin: calc(-1 * var(--gap));
			margin-bottom: var(--gap);
			padding: 0;
		}

		h3 {
			margin-bottom: 0.5rem;
			font-weight: bold;
		}
		p {
			font-weight: normal;
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}
</style>
