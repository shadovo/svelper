<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Navigation from './Navigation.svelte';

	let showAside = false;

	beforeNavigate(() => {
		showAside = false;
	});
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
		background-image: linear-gradient(
				180deg,
				var(--surface-1),
				rgba(32, 32, 32, 0.01) 50%,
				var(--surface-1) 100%
			),
			radial-gradient(ellipse at top left, rgb(139 0 255), transparent 50%),
			radial-gradient(ellipse at top right, rgb(0 206 214 / 89%), transparent 50%),
			radial-gradient(ellipse at center right, rgb(45 1 235 / 80%), transparent 50%),
			radial-gradient(ellipse at center left, rgb(32 255 255 / 97%), transparent 50%);
		background-size: 100% 120vh;
		background-size: 100% clamp(900px, 70vw, 120vh);
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
		padding: var(--gap-2) 0;
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
