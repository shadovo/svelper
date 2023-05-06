<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
</script>

<div class="top-bar-spacer">
	<div class="top-bar">
		<div class="content">
			<div class="logo">
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
			</div>
			<nav>
				<ul>
					<li aria-current={$page.url.pathname.startsWith('/code') ? 'page' : undefined}>
						<a href="{base}/code">Code</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/games') ? 'page' : undefined}>
						<a href="{base}/games">Games</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/tools') ? 'page' : undefined}>
						<a href="{base}/tools">Tools</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/cookie') ? 'page' : undefined}>
						<a href="{base}/cookies">Cookies</a>
					</li>
				</ul>
			</nav>
			<div class="github">
				<a
					title="Go to Svelper on GitHub"
					href="https://github.com/shadovo/svelper"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
							fill="currentcolor"
						/></svg
					>
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.top-bar-spacer {
		--top-bar-height: 80px;
		position: relative;
		height: var(--top-bar-height);
		inset: 0 0 auto 0;
	}
	.top-bar {
		position: fixed;
		height: var(--top-bar-height);
		inset: 0 0 auto 0;
		background-color: rgba(var(--c-background-code-rgb), 0.7);
		backdrop-filter: grayscale(0.7) blur(10px);
		font-size: 1.1rem;
		z-index: 3;
		/* box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4); */
	}
	.content {
		height: 100%;

		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: var(--gap-half) var(--gap);
	}
	.logo {
		height: 100%;
		width: 150px;
		padding: var(--gap-half);
	}
	.github {
		height: 100%;
		width: 150px;
		padding: var(--gap-half);
		text-align: right;
		position: relative;
		a {
			display: inline-block;
			height: 100%;
			padding: var(--gap-half);
			color: var(--c-accent);
		}
	}
	nav {
		height: 100%;
	}
	h1 {
		height: 100%;
	}
	svg {
		height: 100%;
		color: var(--c-text);
	}
	ul {
		display: flex;
		flex-direction: row;
		gap: var(--gap-2);
		justify-content: center;
		align-items: center;
		margin: 0;
		height: 100%;
	}
	li {
		position: relative;
	}
	li::before {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: var(--c-accent);
	}
	li:hover {
		background-color: rgba(123, 123, 123, 0.15);
	}
	li[aria-current='page']::before {
		content: '';
		opacity: 1;
	}
	nav a {
		padding: var(--gap);
		border-radius: var(--gap-half);
		display: block;
		height: 100%;
		width: 100%;
		border: 1px solid transparent;
		color: var(--c-text);

		&:hover {
			text-decoration: none;
		}
	}
</style>
