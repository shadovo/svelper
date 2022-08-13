<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';

	let animationRunning = false;
</script>

<svelte:head>
	<title>Bounce animation - Tips & tricks!</title>
	<meta
		name="description"
		content="This is an annoying bounce animation to let the user know they need to take action on something. - A collection fun stuff
		built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<article>
	<section>
		<h2>Annoying bounce animation</h2>
		<p>
			This is an annoying bounce animation to let the user know they need to take action on
			something.
		</p>
	</section>
	<section>
		<button
			class:annoyingBounce={animationRunning}
			on:click={() => (animationRunning = true)}
			on:animationend={() => (animationRunning = false)}
		>
			Play animation
		</button>
		<SyntaxHighlighting language="css"
			>{`@keyframes annoying-bounce {
	0% {
		transform: translateY(0);
	}
	6% {
		transform: translateY(-16%);
	}
	12% {
		transform: translateY(6%);
	}
	18% {
		transform: translateY(-12%);
	}
	24% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(0);
	}
}

.annoyingBounce {
	animation: annoying-bounce 1s 2 ease-in-out;
}`}</SyntaxHighlighting
		>
	</section>
</article>

<style>
	@keyframes annoying-bounce {
		0% {
			transform: translateY(0);
		}
		6% {
			transform: translateY(-16%);
		}
		12% {
			transform: translateY(6%);
		}
		18% {
			transform: translateY(-12%);
		}
		24% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(0);
		}
	}

	.annoyingBounce {
		animation: annoying-bounce 2s 2;
	}
</style>
