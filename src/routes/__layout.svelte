<script lang="ts">
	import { base } from '$app/paths';
	import Navigation from '$lib/Navigation.svelte';
	import srcOscar from '$lib/static/img/oscar-head.svg';
</script>

<div class="wrapper">
	<header>
		<h1>Level up!</h1>
	</header>
	<main>
		<article>
			<slot />
		</article>
		<aside>
			<Navigation>
				<div slot="header" class="flex">
					<img src={srcOscar} alt="Avatar of the author" />
					<p>
						<span class="accent">Hi!</span> Welcome to my collection of things I always forget or am
						too lazy to look up when I need them.
					</p>
				</div>
				<div class="navigation flex">
					<ul>
						<li class="flex">
							<h2>Navigation</h2>
							<ul>
								<li>
									<a href={base || '/'}>Home</a>
								</li>
							</ul>
						</li>
						<li class="flex">
							<h2>Svelte components</h2>
							<ul>
								<li>
									<a href="{base}/components/dialog">Dialog</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</Navigation>
		</aside>
	</main>
	<footer>Footer</footer>
</div>

<style lang="scss">
	:global(:root) {
		--font-title: var(--font-mono);
		--font-text: var(--font-sans);
		--font-accent: var(--font-serif);
		--font-weight-bold: 700;

		--font-size-base: 16px;

		--gap-quarter: 0.25rem;
		--gap-half: 0.5rem;
		--gap: 1rem;
		--gap-2: 1.5rem;
		--gap-3: 2rem;

		--layer-1: 1;
		--layer-2: 2;
		--layer-3: 3;
		--layer-4: 4;
		--layer-5: 5;
		--layer-important: 2147483647;

		--c-text: #0d0d0d;
		--c-background: #ffffff;
		--c-accent: #0c8894;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--c-text: #f2f2f2;
			--c-background: #333333;
			--c-accent: #39b2bd;
		}
	}

	:global(html) {
		background-color: var(--c-background);
		font-family: var(--font-text);
		color: var(--c-text);
	}

	:global(h1, h2, h3, h4, h5) {
		font-family: var(--font-title);
		margin: unset;
	}

	:global(p) {
		line-height: 1.6;
	}

	:global(ul) {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	:global(li) {
		margin-bottom: var(--gap-half);
	}

	:global(a) {
		color: var(--c-accent);
		text-decoration: none;
		font-weight: bold;

		&:hover {
			text-decoration: underline;
		}
	}

	:global(.flex) {
		display: flex;
		flex-direction: column;
		gap: var(--gap-half);
	}

	:global(button) {
		display: flex;
		padding: var(--gap-half) var(--gap);
		background-color: var(--c-background);
		border: 5px solid var(--c-text);
		color: var(--c-text);
		font-family: var(--font-mono);
		font-weight: var(--font-weight-bold);
		font-size: 1.25rem;
		flex-shrink: 0;

		&:hover {
			background-color: rgba(125, 125, 125, 0.2);
		}
	}

	:global(.button-icon) {
		border-radius: var(--radius-round);
		padding: var(--gap-quarter);
		aspect-ratio: 1;
		flex-shrink: 0;
		align-items: center;
		justify-items: center;
		place-items: center;
		stroke: currentColor;
		stroke-width: 3px;
		border-width: 3px;
		background-color: transparent;
	}

	:global(.accent) {
		font-family: var(--font-mono);
		font-weight: bold;
	}

	:global(.hero) {
		padding: var(--gap) 0;
	}

	.wrapper {
		max-width: 1024px;
		margin: 0 auto;
		padding: var(--gap);
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		min-height: 100vmin;
	}

	header {
		h1 {
			font-family: var(--font-serif);
			font-size: 8.2rem;
			/* font-size: 10rem; */
			/* margin-left: -16px; */
		}
	}

	main {
		display: grid;
		grid-template-columns: 1fr 250px;
		grid-template-rows: 1fr;
		gap: var(--gap-2);
	}

	aside {
		grid-column: 2 / span 1;
		grid-row: 1 / span 1;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		align-items: center;
		border-left: 5px solid var(--c-text);
		padding-left: var(--gap-2);
	}

	footer {
		margin: auto 0 0;
	}

	.navigation {
		padding-top: var(--gap);
		/* border-top: 3px solid var(--c-text); */

		h2 {
			font-size: 1.3rem;
		}
	}
</style>
