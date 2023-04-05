<script lang="ts">
</script>

<svelte:head>
	<title>Tools built in Svelte - Svelper</title>
	<meta name="description" content="A collection games built with Svelte." />
</svelte:head>

<section class="content-width">
	<h2>Tools built in Svelte</h2>
	<div class="grid">
		<a class="card" href="/tools/soundboard">
			<p class="icon">🎹</p>
			<h3>Soundboard</h3>
			<p>Soundboard with WebAudio&nbsp;API.</p>
		</a>
		<a class="card" href="/tools/breath">
			<p class="icon">😮‍💨</p>
			<h3>Breathing technique</h3>
			<p>Breathing timer as Svelte component.</p>
		</a>
	</div>
</section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(200px, 1fr));
		gap: var(--gap);
	}

	.card {
		background: var(--color-bg);
		box-shadow: 0 2px 3px 1px rgb(0, 0, 0, 0.3);
		padding: 1rem;
		border: 1px solid var(--c-text);
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

		.icon {
			text-align: center;
			font-size: 4rem;
			margin-bottom: 0.5rem;
			padding: var(--gap-half) 0;
		}

		h3 {
			margin-bottom: 0.5rem;
			font-weight: bold;
		}
		p {
			font-weight: normal;
		}
	}

	@media (max-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, minmax(200px, 1fr));
		}
	}

	@media (max-width: 480px) {
		.grid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
		}
	}
</style>
