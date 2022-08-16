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
		<h1>
			<a href={base || '/'}>
				<svg
					aria-labelledby="svelper-title"
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;fill:currentColor"
					viewBox="0 0 649 230"
				>
					<title id="svelper-title">Svelper, the Svelte helper site</title>
					<path
						d="M.245.018a.259.259 0 0 1-.111-.022.162.162 0 0 1-.1-.153.166.166 0 0 1 .068-.137.127.127 0 0 1 .07-.021c.023 0 .043.006.059.017a.076.076 0 0 1 .03.049.122.122 0 0 0-.083.027.096.096 0 0 0-.031.075c0 .029.009.052.026.069.017.017.04.026.069.026A.12.12 0 0 0 .33-.087a.125.125 0 0 0 .034-.09.17.17 0 0 0-.026-.089.774.774 0 0 0-.078-.102.836.836 0 0 1-.081-.106.18.18 0 0 1-.028-.098c0-.035.01-.066.029-.094a.2.2 0 0 1 .08-.065.266.266 0 0 1 .115-.024c.054 0 .097.013.129.038a.12.12 0 0 1 .049.102.104.104 0 0 1-.021.068.068.068 0 0 1-.055.026.071.071 0 0 1-.061-.031.091.091 0 0 0 .03-.037.113.113 0 0 0 .011-.048.069.069 0 0 0-.019-.051.07.07 0 0 0-.052-.019.082.082 0 0 0-.065.028.107.107 0 0 0-.026.073c0 .027.008.051.023.074a.666.666 0 0 0 .072.089c.027.029.048.053.065.074a.35.35 0 0 1 .042.071.234.234 0 0 1 .017.088.2.2 0 0 1-.036.116.234.234 0 0 1-.096.082.31.31 0 0 1-.137.03Z"
						style="fill-rule:nonzero"
						transform="translate(-7.76 172.322) scale(228.242)"
					/>
					<path
						d="M.114.006c-.039 0-.069-.01-.09-.03-.022-.019-.033-.049-.033-.088A.26.26 0 0 1-.004-.16L.068-.5h.144L.14-.16a.264.264 0 0 0-.005.036c0 .022.011.033.034.033.031 0 .059-.019.086-.058a.516.516 0 0 0 .063-.138.488.488 0 0 0 .024-.138c-.001.003-.006.006-.013.007a.074.074 0 0 1-.019.003C.299-.415.29-.42.283-.431a.07.07 0 0 1-.009-.035.05.05 0 0 1 .016-.039C.3-.515.315-.52.336-.52c.022 0 .038.008.048.024.01.017.015.038.015.063a.65.65 0 0 1-.031.192.455.455 0 0 1-.095.175.205.205 0 0 1-.159.072Z"
						style="fill-rule:nonzero"
						transform="translate(122.338 172.322) scale(228.242)"
					/>
					<path
						d="M.143.006a.16.16 0 0 1-.115-.039c-.027-.025-.041-.065-.041-.12 0-.046.009-.097.027-.152a.358.358 0 0 1 .088-.144.212.212 0 0 1 .155-.06c.073 0 .11.032.11.096a.182.182 0 0 1-.032.103.25.25 0 0 1-.085.076.294.294 0 0 1-.113.032l-.002.04c0 .033.006.055.017.066.011.012.03.018.055.018A.166.166 0 0 0 .3-.103a.495.495 0 0 0 .084-.076h.034C.344-.056.252.006.143.006ZM.145-.25a.132.132 0 0 0 .071-.026.187.187 0 0 0 .054-.061.168.168 0 0 0 .02-.078c0-.027-.008-.041-.025-.041-.024 0-.047.021-.07.063a.484.484 0 0 0-.05.143Z"
						style="fill-rule:nonzero"
						transform="translate(216.83 172.322) scale(228.242)"
					/>
					<path
						d="M.099.006a.106.106 0 0 1-.078-.03c-.019-.02-.029-.05-.029-.09 0-.017.003-.038.008-.065L.107-.68.255-.7.14-.16a.112.112 0 0 0-.004.032c0 .013.003.023.01.028.006.006.016.009.031.009a.075.075 0 0 0 .054-.025.131.131 0 0 0 .036-.063h.042c-.025.072-.056.121-.095.146a.206.206 0 0 1-.115.039Z"
						style="fill-rule:nonzero"
						transform="translate(304.474 172.322) scale(228.242)"
					/>
					<path
						d="M.076-.537H.22l-.016.075a.171.171 0 0 1 .117-.043c.037 0 .067.012.089.037.022.025.033.065.033.121a.582.582 0 0 1-.023.159.306.306 0 0 1-.078.137.193.193 0 0 1-.145.057C.154.006.126-.006.112-.03L.06.214-.091.25l.167-.787Zm.09.456a.095.095 0 0 0 .08-.045.312.312 0 0 0 .046-.108.547.547 0 0 0 .014-.116c0-.055-.017-.083-.05-.083A.06.06 0 0 0 .22-.42a.115.115 0 0 0-.033.036l-.059.28c.005.015.018.023.038.023Z"
						style="fill-rule:nonzero"
						transform="translate(365.415 172.322) scale(228.242)"
					/>
					<path
						d="M.143.006a.16.16 0 0 1-.115-.039c-.027-.025-.041-.065-.041-.12 0-.046.009-.097.027-.152a.358.358 0 0 1 .088-.144.212.212 0 0 1 .155-.06c.073 0 .11.032.11.096a.182.182 0 0 1-.032.103.25.25 0 0 1-.085.076.294.294 0 0 1-.113.032l-.002.04c0 .033.006.055.017.066.011.012.03.018.055.018A.166.166 0 0 0 .3-.103a.495.495 0 0 0 .084-.076h.034C.344-.056.252.006.143.006ZM.145-.25a.132.132 0 0 0 .071-.026.187.187 0 0 0 .054-.061.168.168 0 0 0 .02-.078c0-.027-.008-.041-.025-.041-.024 0-.047.021-.07.063a.484.484 0 0 0-.05.143Z"
						style="fill-rule:nonzero"
						transform="translate(472.232 172.322) scale(228.242)"
					/>
					<path
						d="M.068-.5h.144l-.013.062a.408.408 0 0 1 .062-.046A.111.111 0 0 1 .32-.5c.021 0 .038.007.051.022a.081.081 0 0 1 .018.053.075.075 0 0 1-.019.051.065.065 0 0 1-.053.022c-.015 0-.024-.004-.029-.011a.07.07 0 0 1-.012-.03.085.085 0 0 0-.006-.019C.268-.416.264-.418.259-.418a.063.063 0 0 0-.035.009.182.182 0 0 0-.038.029L.106 0h-.144l.106-.5Z"
						style="fill-rule:nonzero"
						transform="translate(559.877 172.322) scale(228.242)"
					/>
				</svg>
			</a>
		</h1>
	</svelte:fragment>
	<svelte:fragment slot="article">
		<slot />
	</svelte:fragment>
	<div class="footer" slot="footer">
		<p>
			Thanks for checking out the site! Feel free to use any and all parts of the code available at <a
				href="https://github.com/shadovo/svelper">github</a
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
						<li>
							<h2>Navigation</h2>
							<ul>
								<li>
									<a href={base || '/'}>Home</a>
								</li>
							</ul>
						</li>
						<li>
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
						<li>
							<h3>Animations</h3>
							<ul>
								<li>
									<a href="{base}/animations/annoying-bounce">Annoying bounce</a>
								</li>
								<li>
									<a href="{base}/animations/attention-shake">Attention shake</a>
								</li>
							</ul>
						</li>
						<li>
							<h3>Copy/paste</h3>
							<ul>
								<li>
									<a href="{base}/copy-paste/gh-pages">GitHub pages action</a>
								</li>
							</ul>
						</li>
						<li>
							<h3>Libraries</h3>
							<ul>
								<li>
									<a href="{base}/libraries/ress-css">CSS Ress</a>
								</li>
								<li>
									<a href="{base}/libraries/prism">Prism - highlighting</a>
								</li>
								<li>
									<a href="{base}/libraries/sveltekit">SvelteKit</a>
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
		--font-code: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco,
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
		--prism-string: #3a5700;
		--prism-url: #9a6e3a;
		--prism-variable: #f8f8f2;
		--prism-atrule: #005478;
		--prism-keyword: #005478;
		--prism-function: #8a2e41;
		--prism-regex: #e90;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--c-text: #f2f2f2;
			--c-background: #202020;
			--c-background-code: #131313;
			--c-accent: #39b2bd;
			--shadow-color: 220 40% 2%;
			--shadow-strength: 25%;

			--prism-background: none;
			--prism-text: #f8f8f2;
			--prism-text-shadow: 0 1px rgba(0, 0, 0, 0.3);
			--prism-selection-background: none;
			--prism-comment: #83a3bf;
			--prism-punctuation: #f8f8f2;
			--prism-tag: #ff8bb5;
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
		overflow-y: scroll;
	}

	:global(h1, h2, h3, h4, h5) {
		font-family: var(--font-accent);
		line-height: 1.2;
		margin-bottom: var(--gap-half);
	}

	:global(p) {
		line-height: 1.6;
	}

	:global(ul) {
		margin-bottom: var(--gap);
		list-style: none;
	}

	:global(.list) {
		list-style: disc;
		margin-left: var(--gap-2);
		margin-top: var(--gap-half);
	}

	:global(li) {
		margin-bottom: var(--gap-quarter);
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
		margin-top: var(--gap-2);
		margin-bottom: 0;
		color: var(--c-accent);
		line-height: 1;

		svg {
			height: 100%;
			max-height: 150px;
			max-width: 70%;
		}
	}

	.navigation {
		padding-top: var(--gap);

		h2,
		h3 {
			font-size: 1.3rem;
			margin: 0;
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
		overflow-y: auto;
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
