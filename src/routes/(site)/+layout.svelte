<script lang="ts">
	import type { Snippet } from 'svelte';
	import Navigation from './Navigation.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="content">
	<div class="background"></div>
	<Navigation />
	<main>
		{@render children?.()}
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
	.background {
		background-image:
		 /* linear-gradient(180deg in lab, transparent 50%, var(--surface-1) 80%), */
			radial-gradient(ellipse at top left in lab, oklch(0.54 0.31 293.09), transparent 50%),
			radial-gradient(ellipse at top right in lab, oklch(0.85 0.19 201.28 / 0.89), transparent 50%),
			radial-gradient(
				ellipse at center right in lab,
				oklch(0.47 0.31 270.09 / 0.8),
				transparent 50%
			),
			radial-gradient(ellipse at center left in lab, oklch(0.85 0.2 194.58 / 0.97), transparent 50%);
		background-size: 100% 120vh;
		background-repeat: no-repeat;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		position: fixed;
		z-index: -1;
	}

	.content {
		position: relative;
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
