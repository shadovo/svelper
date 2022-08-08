<script lang="ts">
	export let showAside = false;

	const SWIPE_START_THRESHOLD = 30;
	const SWIPE_END_THRESHOLD = 100;

	let touchStartX: number = -1;
	let asideTransform = 'none';

	const asideClick = (event: MouseEvent) => {
		const ele = event?.target as HTMLElement | undefined;
		// Compare the event offsetX and target element offsetLeft to determine
		// if the click was on the pseudo-element :after outside of the regular element.
		if (ele?.nodeName === 'ASIDE' && event.offsetX < ele?.offsetLeft) {
			showAside = false;
		}
	};

	const swipeStart = (event: TouchEvent | MouseEvent) => {
		touchStartX = event instanceof MouseEvent ? event.screenX : event.touches[0].screenX;
	};

	const swipeMove = (event: TouchEvent | MouseEvent) => {
		if (touchStartX === -1) {
			return;
		}
		const x = event instanceof MouseEvent ? event.screenX : event.touches[0].screenX;
		const delta = x - touchStartX;
		if (delta > SWIPE_START_THRESHOLD) {
			asideTransform = `translateX(${delta}px)`;
		}
	};

	const swipeEnd = (event: TouchEvent | MouseEvent) => {
		const x = event instanceof MouseEvent ? event.screenX : event.touches[0].screenX;
		const delta = x - touchStartX;
		touchStartX = -1;
		if (delta > SWIPE_END_THRESHOLD) {
			showAside = false;
		} else {
			showAside = true;
			asideTransform = 'translateX(0)';
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
	<article>
		<button on:click={() => (showAside = !showAside)}>Show aside</button>
		<slot name="article" />
	</article>
	<footer>
		<slot name="footer" />
	</footer>
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
	>
		<slot name="aside" />
	</aside>
</main>

<style lang="scss">
	main {
		--aside-width: 270px;
		display: grid;
		grid-template-columns: 1fr var(--aside-width);
		grid-template-rows: auto 1fr 50px;
		gap: var(--gap-2);
		max-width: 1024px;
		margin: 0 auto;
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
		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}

	aside {
		grid-column: 2 / span 1;
		grid-row: 2 / span 1;
		z-index: var(--layer-2);
	}

	@media (min-width: 769px) {
		aside {
			transform: translateX(0) !important;
		}
	}

	@media (max-width: 768px) {
		main {
			--aside-width: 300px;
			grid-template-columns: 1fr 0px;
			grid-template-rows: auto 1fr 50px;
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
			grid-column: 1 / span 1;
			grid-row: 3 / span 1;
		}

		aside {
			display: flex;
			background-color: var(--c-background);
			width: var(--aside-width);
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			/* transition: transform 0.2s ease-in-out; */
			transform: translateX(100%);
		}

		.animateTransform {
			transition: transform 0.2s ease-in-out;
		}

		.asideShown {
			header,
			article,
			footer {
				filter: blur(4px);
			}

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
					background: rgba(75, 75, 75, 0.2);
				}
			}
		}
	}
</style>
