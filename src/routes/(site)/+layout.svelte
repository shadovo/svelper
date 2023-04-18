<script lang="ts">
	import { base } from '$app/paths';
	import { beforeNavigate } from '$app/navigation';
	import MainWithAside from '$lib/components/MainWithAside.svelte';
	import srcOscar from '$img/oscar-head.svg';

	let showAside = false;
	beforeNavigate(() => {
		showAside = false;
	});
</script>

<div class="content">
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
				Thanks for checking out the site! Feel free to use any and all parts of the code available
				at <a href="https://github.com/shadovo/svelper">github</a> ♥ Oscar.
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
										<a href="{base}/components/vite-imagetools-in-sveltekit">Image</a>
									</li>
									<li>
										<a href="{base}/components/pagination">Pagination</a>
									</li>
									<li>
										<a href="{base}/components/syntax-highlighting">SyntaxHighlight</a>
									</li>
								</ul>
							</li>
							<li>
								<h3>Svelte games</h3>
								<ul>
									<li>
										<a href="{base}/games/floppy-octty">Floppy Octty</a>
									</li>
									<li>
										<a href="{base}/games/minesweeper">Minesweeper</a>
									</li>
								</ul>
							</li>
							<li>
								<h3>Tools</h3>
								<ul>
									<li>
										<a href="{base}/tools/breath">Breathing technique</a>
									</li>
									<li>
										<a href="{base}/tools/soundboard">Soundboard</a>
									</li>
								</ul>
							</li>
							<li>
								<h3>CSS Animations</h3>
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
								<h3>GitHub actions</h3>
								<ul>
									<li>
										<a href="{base}/github-actions/changed-sveltekit-paths"
											>Changed SvelteKit paths</a
										>
									</li>
									<li>
										<a href="{base}/github-actions/gh-pages">Deploy GitHub pages</a>
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
										<a href="{base}/libraries/vite-imagetools">Vite Imagetools</a>
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
</div>

<style lang="scss">
	:global(html) {
		background-image: linear-gradient(
				180deg,
				var(--c-background),
				rgba(32, 32, 32, 0.01) 50%,
				var(--c-background) 100%
			),
			radial-gradient(ellipse at top left, rgb(139 0 255), transparent 50%),
			radial-gradient(ellipse at top right, rgb(0 206 214 / 89%), transparent 50%),
			radial-gradient(ellipse at center right, rgb(45 1 235 / 80%), transparent 50%),
			radial-gradient(ellipse at center left, rgb(32 255 255 / 97%), transparent 50%);
		background-size: 100% 120vh;
		background-size: 100% clamp(900px, 70vw, 120vh);
		background-repeat: no-repeat;
	}

	:global(.main-article) {
		display: flex;
		flex-direction: column;
		gap: var(--gap-2);
		padding: var(--gap-2);
		background-color: var(--c-background);
		border-radius: var(--gap);
		box-shadow: 0 0 10px rgba(var(--c-background-rgb), 0.4);
	}

	:global(.main-article section + section) {
		border-top: 1px solid var(--c-text);
		padding-top: var(--gap-2);
	}

	:global(.hero) {
		padding: 0;
		margin: calc(-1 * var(--gap-2)) calc(-1 * var(--gap-2)) var(--gap);
		position: relative;
		aspect-ratio: 3 / 1;
		overflow: hidden;
		border-radius: var(--gap) var(--gap) 0 0;

		:global(img) {
			width: 100%;
			height: auto;
			position: absolute;
		}

		:global(h2) {
			position: absolute;
			color: white;
			bottom: 0;
			padding: var(--gap-half) var(--gap-2) calc(var(--gap-half) + 2px);
			font-size: 2rem;
			margin: 0;
			margin-bottom: -2px;
			width: 100%;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);
		}
	}

	:global(section > p + p) {
		margin-top: var(--gap);
	}

	:global(h4) {
		margin-top: var(--gap);
	}

	h1 {
		color: var(--c-accent);
		line-height: 1;
		margin: var(--gap-2) 0 0;
		color: var(--c-logo);

		svg {
			color: var(--c-logo);
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
		padding: var(--gap) var(--gap-2);
		overflow-y: auto;
		background: rgba(var(--c-background-rgb), 0.3);
		backdrop-filter: blur(80px);
		border-radius: var(--gap);

		img {
			margin: 0 auto;
		}
	}

	.footer {
		font-size: 0.8rem;
		padding: var(--gap-2) 0 0;
		border-top: 3px solid var(--c-text);
	}

	@media (max-width: 768px) {
		:global(.main-article) {
			padding: var(--gap);
		}
		:global(.hero) {
			margin: calc(-1 * var(--gap)) calc(-1 * var(--gap)) var(--gap);
			:global(h2) {
				padding-left: var(--gap);
			}
		}
		nav {
			padding: var(--gap);
			border-radius: 0;
			background: rgba(var(--c-background-rgb), 0.6);
			backdrop-filter: blur(80px) brightness(0.5);
			img {
				width: 150px;
				height: 150px;
			}
		}

		.footer {
			border: none;
		}
	}
</style>
