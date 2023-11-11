<script lang="ts">
	import Navigation from './Navigation.svelte';
</script>

<div class="content">
	<Navigation />
	<main>
		<slot />
	</main>
	<footer>
		<p>
			Thanks for checking out the site! Feel free to use any and all parts of the code available at <a
				target="_blank"
				href="https://github.com/shadovo/svelper">github</a
			> ♥ Oscar.
		</p>
	</footer>
</div>

<style lang="scss">
	.content {
		background-image:
		 /* linear-gradient(180deg in lab, transparent 50%, var(--surface-1) 80%), */ radial-gradient(
				ellipse at top left in lab,
				oklch(0.54 0.31 293.09),
				transparent 50%
			),
			radial-gradient(ellipse at top right in lab, oklch(0.85 0.19 201.28 / 0.89), transparent 50%),
			radial-gradient(
				ellipse at center right in lab,
				oklch(0.47 0.31 270.09 / 0.8),
				transparent 50%
			),
			radial-gradient(ellipse at center left in lab, oklch(0.85 0.2 194.58 / 0.97), transparent 50%);
		background-size: 100% 120vh;
		/* background-size: 100% clamp(900px, 70vw, 120vh); */
		background-attachment: fixed;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex-grow: 1;
	}

	footer {
		font-size: 0.8rem;
		padding: var(--gap-2) var(--gap);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--surface-2);

		p {
			max-width: 860px;
			display: inline-block;
		}
	}

	@media (width < 768px) {
		footer {
			border: none;
		}
	}
</style>
