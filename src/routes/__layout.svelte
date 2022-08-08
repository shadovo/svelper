<script lang="ts">
	import 'ress';
	import { base } from '$app/paths';
	import { beforeNavigate } from '$app/navigation';
	import MainWithAside from '$lib/components/MainWithAside.svelte';
	import srcOscar from '$img/oscar-head.svg';

	let showAside = false;
	beforeNavigate(() => {
		showAside = false;
	});
</script>

<MainWithAside bind:showAside>
	<svelte:fragment slot="header">
		<h1>Level up!</h1>
	</svelte:fragment>
	<svelte:fragment slot="article">
		<slot />
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<p>Footer</p>
	</svelte:fragment>
	<svelte:fragment slot="aside">
		<slot name="navigation">
			<nav>
				<div class="flex">
					<img width="217" height="217" src={srcOscar} alt="Avatar of the author" />
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
			</nav>
		</slot>
	</svelte:fragment>
</MainWithAside>

<style lang="scss">
	:global(:root) {
		--font-title: ui-serif, serif;
		--font-text: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans,
			sans-serif, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
		--font-accent: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco,
			Droid Sans Mono, Source Code Pro, monospace;
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
		/* --c-accent: #0c8894; */
		--c-accent: #0b828d;
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
		font-family: var(--font-accent);
	}

	:global(p) {
		line-height: 1.6;
	}

	:global(ul) {
		list-style: none;
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
		font-family: var(--font-accent);
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
		font-family: var(--font-accent);
		font-weight: bold;
	}

	:global(.hero) {
		padding: var(--gap) 0;
	}

	h1 {
		font-family: var(--font-title);
		font-size: 8.2rem;
		font-size: clamp(2rem, 12vw, 8.2rem);
	}

	.navigation {
		padding-top: var(--gap);

		h2 {
			font-size: 1.3rem;
		}
	}

	nav {
		display: block;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		border-left: 5px solid var(--c-text);
		padding: 0 var(--gap-2);
	}

	@media (max-width: 768px) {
		nav {
			padding: var(--gap);
		}

		img {
			margin: 0 auto;
			width: 150px;
			height: 150px;
		}
	}
</style>
