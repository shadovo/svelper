<script lang="ts">
	export let showAside = false;

	const SWIPE_START_THRESHOLD = 30;
	const SWIPE_END_THRESHOLD = 100;
	const SWIPE_EDGE_THRESHOLD = 30;

	let touchStartX = -1;
	let asideTransform = 'none';

	const closeAside = () => {
		showAside = false;
	};

	const openAside = () => {
		showAside = true;
		asideTransform = 'translateX(0)';
	};

	const asideClick = (event: MouseEvent) => {
		const ele = event?.target as HTMLElement | undefined;
		// Compare the event offsetX and target element offsetLeft to determine
		// if the click was on the pseudo-element :after outside of the regular element.
		if (ele?.nodeName === 'ASIDE' && event.offsetX < ele?.offsetLeft) {
			closeAside();
		}
	};

	const swipeStart = (event: TouchEvent | MouseEvent) => {
		touchStartX = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
	};

	const swipeMove = (event: TouchEvent | MouseEvent) => {
		if (touchStartX === -1) {
			return;
		}
		const x = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;

		const delta = x - touchStartX;
		if (delta > SWIPE_START_THRESHOLD) {
			if (x > window.innerWidth - SWIPE_EDGE_THRESHOLD) {
				closeAside();
				touchStartX = -1;
				return;
			}
			asideTransform = `translateX(${delta}px)`;
		}
	};

	const swipeEnd = (event: TouchEvent | MouseEvent) => {
		const x = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
		const delta = x - touchStartX;
		touchStartX = -1;
		if (delta > SWIPE_END_THRESHOLD) {
			closeAside();
		} else {
			openAside();
		}
	};

	const asideKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeAside();
		}
	};

	$: {
		if (showAside) {
			asideTransform = 'translateX(0)';
		} else {
			asideTransform = 'translateX(100%)';
		}
	}
</script>

<main class:asideShown={showAside}>
	<header>
		<slot name="header" />
	</header>
	<article class="main-article">
		<slot name="article" />
	</article>
	<footer>
		<slot name="footer" />
	</footer>
	<nav>
		<slot name="mobile-sticky" />
	</nav>
	<aside
		class:animateTransform={touchStartX === -1}
		style:transform={asideTransform}
		on:click={asideClick}
		on:mousedown={swipeStart}
		on:mousemove={swipeMove}
		on:mouseup={swipeEnd}
		on:touchstart={swipeStart}
		on:touchmove={swipeMove}
		on:touchend={swipeEnd}
		on:keyup={asideKeyUp}
	>
		<slot name="aside" />
	</aside>
	<button
		aria-label="show navigation"
		class="show-aside button-icon"
		on:click={() => (showAside = !showAside)}
	>
		<svg width="24" height="24" viewBox="0 0 24 24">
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	</button>
</main>

<style lang="scss">
	main {
		--aside-width: 280px;
		display: grid;
		grid-template-columns: calc(100% - var(--aside-width) - var(--gap-2)) var(--aside-width);
		grid-template-rows: auto 1fr auto;
		gap: var(--gap-2);
		max-width: min(1024px, 100vw);
		margin: var(--gap-2) auto 0;
		padding: 0 var(--gap);
		min-height: 100vh;
	}

	header {
		grid-column: 1 / span 2;
		grid-row: 1 / span 1;
	}

	article {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
	}

	footer {
		grid-column: 1 / span 2;
		grid-row: 3 / span 1;
	}

	aside {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
		z-index: var(--layer-2);
	}

	.show-aside {
		background-color: var(--c-background);
		position: fixed;
		bottom: var(--gap-2);
		right: var(--gap-2);
		/* z-index: var(--layer-5); */
		box-shadow: 0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
			0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
			0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
			0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
			0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));
	}

	@media (min-width: 769px) {
		aside {
			transform: translateX(0) !important;
		}

		.show-aside {
			display: none;
		}
	}

	@media (max-width: 768px) {
		main {
			--aside-width: 300px;
			grid-template-columns: 100% 0;
			grid-template-rows: auto 1fr auto 50px;
			grid-column-gap: 0;
			padding: 0 var(--gap-half);
		}

		aside {
			display: flex;
			width: var(--aside-width);
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			transform: translateX(100%);
		}

		.animateTransform {
			transition: transform 0.2s ease-in-out;
		}

		.asideShown {
			aside {
				transform: translateX(0);
				box-shadow: 0 -1px 2px 0 hsl(220 3% 15% / 3%), 0 3px 2px -2px hsl(220 3% 15% / 4%),
					0 7px 5px -2px hsl(220 3% 15% / 4%), 0 12px 10px -2px hsl(220 3% 15% / 5%),
					0 22px 18px -2px hsl(220 3% 15% / 6%), 0 41px 33px -2px hsl(220 3% 15% / 7%),
					0 100px 80px -2px hsl(220 3% 15% / 8%);

				&:after {
					content: '';
					position: fixed;
					top: 0px;
					right: var(--aside-width);
					width: 100vw;
					height: 100%;
					opacity: 1;
					background: rgba(0, 0, 0, 0.6);
					backdrop-filter: blur(4px);
				}
			}
		}
	}
</style>
