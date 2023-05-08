<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import SvelperLogo from '$lib/svg/SvelperLogo.svelte';
	import GitHubLogo from '$lib/svg/GitHubLogo.svelte';

	let sidebarEle: HTMLDialogElement | null = null;
	let showSidebar = false;

	function sidebarClick(event: MouseEvent) {
		const ele = event?.target as HTMLDialogElement | undefined;
		if (ele?.nodeName === 'DIALOG') {
			showSidebar = false;
		}
	}

	$: {
		if (showSidebar) {
			sidebarEle?.showModal();
		} else {
			setTimeout(() => {
				sidebarEle?.close();
			}, 200);
		}
	}
</script>

<header class="top-bar-spacer">
	<div class="top-bar">
		<div class="content">
			<div class="logo">
				<h1>
					<a href={base || '/'}>
						<SvelperLogo />
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
					<GitHubLogo />
				</a>
			</div>
			<div class="menu-toggle">
				<button on:click={() => (showSidebar = !showSidebar)}>
					<svg width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<line x1="3" y1="6" x2="21" y2="6" />
						<line x1="3" y1="12" x2="21" y2="12" />
						<line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</header>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={sidebarEle}
	class:isOpen={showSidebar}
	on:click={sidebarClick}
	on:close={() => (showSidebar = false)}
>
	<div class="sidebar-content">
		<div class="top">
			<h2>Menu</h2>
			<div class="menu-toggle">
				<button on:click={() => (showSidebar = !showSidebar)}>
					<svg width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>
		</div>
		<div class="content">
			<nav>
				<ul>
					<li aria-current={$page.url.pathname === base + '/' ? 'page' : undefined}>
						<a href="{base}/">Home</a>
					</li>
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
					<li>
						<a
							title="Go to Svelper on GitHub"
							href="https://github.com/shadovo/svelper"
							target="_blank"
							rel="noopener noreferrer">GitHub</a
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</dialog>

<style lang="scss">
	.top-bar-spacer {
		--top-bar-height: 80px;
		position: relative;
		height: var(--top-bar-height);
		inset: 0 0 auto 0;
	}

	.menu-toggle {
		display: none;
		width: 150px;
		height: 100%;
		padding: var(--gap-half);
		text-align: right;
		position: relative;

		button {
			margin: 0 calc(-1 * var(--gap-half)) 0 auto;
			border: none;
			background: none;
			padding: 0 var(--gap-half);

			&:hover {
				background-color: rgba(123, 123, 123, 0.15);
			}
		}
	}
	svg {
		height: 100%;
		color: var(--c-text);
	}
	.top-bar {
		position: fixed;
		height: var(--top-bar-height);
		inset: 0 0 auto 0;
		background-color: rgba(var(--c-background-code-rgb), 0.7);
		backdrop-filter: grayscale(0.7) blur(10px);
		font-size: 1.1rem;
		z-index: 3;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);

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
			text-align: right;
			position: relative;
			a {
				display: inline-block;
				height: 100%;
				padding: var(--gap);
				color: var(--c-text);
			}
		}
		nav {
			height: 100%;
		}
		h1 {
			height: 100%;
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
	}

	dialog {
		height: 100%;
		height: 100vh;
		height: 100lvh;
		width: 400px;
		top: 0;
		right: 0;
		left: auto;
		bottom: 0;
		width: 300px;
		background: rgba(var(--c-background-rgb), 0.3);
		backdrop-filter: blur(80px);
		border: none;
		transform: translateX(100%);
		transition: transform 0.2s ease-in-out;

		&:modal {
			max-width: 100vw;
			max-height: 100vh;
			max-height: 100lvh;
		}

		&::backdrop {
			opacity: 1;
			background: rgba(0, 0, 0, 0);
			backdrop-filter: blur(0);
			transition: background 0.2s ease-in-out, backdrop-filter 0.2s ease-in-out;
		}

		&.isOpen {
			transform: translateX(0);
			box-shadow: -8px 0 16px rgba(0, 0, 0, 0.4);
			&::backdrop {
				background: rgba(0, 0, 0, 0.6);
				backdrop-filter: blur(2px);
			}
		}
	}

	.sidebar-content {
		width: 100%;
		display: flex;
		flex-direction: column;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--c-text);
			width: 100%;
			height: 74px;
			background-color: rgba(var(--c-background-code-rgb), 0.7);
			padding: var(--gap-half) var(--gap-half) var(--gap-half) var(--gap);
		}
		.content {
			padding: var(--gap);
		}
		ul {
			display: flex;
			flex-direction: column;
		}
		li {
			position: relative;
			&:not(:last-child) {
				border-bottom: 1px solid #525252;
				margin: 0;
			}
			&[aria-current='page']:after {
				content: '◄';
				color: var(--c-accent);
				position: absolute;
				inset: 0 0 0 auto;
				margin: auto;
				height: fit-content;
				font-size: 18px;
			}
			a {
				padding: var(--gap) 0;
				display: block;
			}
		}
	}

	@media (width < 768px) {
		.top-bar-spacer {
			--top-bar-height: 74px;
		}
		.top-bar {
			.content {
				padding: var(--gap-half);
			}

			ul {
				gap: var(--gap);
			}

			nav a {
				padding: var(--gap) var(--gap-half);
			}

			.logo,
			.github {
				width: auto;
			}
		}
	}

	@media (width < 560px) {
		.menu-toggle {
			display: flex;
		}
		.top-bar {
			nav,
			.github {
				display: none;
			}
		}
	}
</style>
