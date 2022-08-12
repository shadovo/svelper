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
	<div class="footer" slot="footer">
		<p>
			Thanks for checking out the site! Feel free to use any and all parts of the code available at <a
				href="https://github.com/shadovo/level-up">github</a
			> ♥ Oscar.
		</p>
	</div>
	<svelte:fragment slot="aside">
		<slot name="navigation">
			<nav>
				<div class="flex">
					<img width="217" height="217" src={srcOscar} alt="Avatar of the author" />
					<p>
						<span class="accent">Hi!</span> Welcome to my collection of things built in Svelte, helpful
						libraries, frameworks and copy/paste utils.
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
							<h3>Svelte components</h3>
							<ul>
								<li>
									<a href="{base}/components/dialog">Dialog</a>
								</li>
								<li>
									<a href="{base}/components/syntax-highlighting">SyntaxHighlight</a>
								</li>
							</ul>
						</li>
						<li class="flex">
							<h3>Copy/paste</h3>
							<ul>
								<li>
									<a href="{base}/copy-paste/gh-pages">GitHub pages action</a>
								</li>
							</ul>
						</li>
						<li class="flex">
							<h3>Libraries</h3>
							<ul>
								<li>
									<a href="{base}/libraries/sveltekit">SvelteKit</a>
								</li>
								<li>
									<a href="{base}/libraries/ress-css">CSS Ress</a>
								</li>
								<li>
									<a href="{base}/libraries/prism">Prism - highlighting</a>
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

		--shadow-color: 220 3% 15%;
		--shadow-strength: 1%;

		--c-text: #0d0d0d;
		--c-background: #ffffff;
		--c-background-code: #ebeef5;
		--c-accent: #0b828d;

		--prism-background: none;
		--prism-text: #000000;
		--prism-text-shadow: 0 1px white;
		--prism-selection-background: #b3d4fc;
		--prism-comment: #708090;
		--prism-punctuation: #999999;
		--prism-tag: #905;
		--prism-number: #905;
		--prism-string: #690;
		--prism-url: #9a6e3a;
		--prism-variable: #f8f8f2;
		--prism-atrule: #07a;
		--prism-keyword: #07a;
		--prism-function: #dd4a68;
		--prism-regex: #e90;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--c-text: #f2f2f2;
			--c-background: #333333;
			--c-background-code: #242424;
			--c-accent: #39b2bd;
			--shadow-color: 220 40% 2%;
			--shadow-strength: 25%;

			--prism-background: none;
			--prism-text: #f8f8f2;
			--prism-text-shadow: 0 1px rgba(0, 0, 0, 0.3);
			--prism-selection-background: none;
			--prism-comment: #535e68;
			--prism-punctuation: #f8f8f2;
			--prism-tag: #f92672;
			--prism-number: #ae81ff;
			--prism-string: #a6e22e;
			--prism-url: #8a8a2b;
			--prism-variable: #f8f8f2;
			--prism-atrule: #e6db74;
			--prism-keyword: #66d9ef;
			--prism-function: #e6db74;
			--prism-regex: #fd971f;
		}
	}

	:global(html) {
		background-color: var(--c-background);
		font-family: var(--font-text);
		color: var(--c-text);
	}

	:global(h1, h2, h3, h4, h5) {
		font-family: var(--font-accent);
		line-height: 1.6;
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

	:global(article) {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);

		:global(h3) {
			border-top: 1px solid var(--c-text);
			padding-top: var(--gap-2);
		}
	}

	:global(code) {
		background-color: var(--c-background-code);
		padding: 0 4px;
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

	:global(.row) {
		display: flex;
		flex-direction: row;
		gap: var(--gap);
		align-items: center;
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

	.footer {
		font-size: 0.8rem;
		padding: var(--gap-2) 0 0;
		border-top: 3px solid var(--c-text);
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

		.footer {
			border: none;
		}
	}
</style>
