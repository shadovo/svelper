<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';

	let animattionRunning = false;
</script>

<svelte:head>
	<title>Shake animation - Tips & tricks!</title>
	<meta
		name="description"
		content="A shaking animation to grab attention. - A collection fun stuff
		built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<article>
	<section>
		<h2>Attention shake animation</h2>
		<p>This is a shaking animation to grab attention.</p>
	</section>
	<section>
		<button
			class:attentionShake={animattionRunning}
			on:click={() => (animattionRunning = true)}
			on:animationend={() => (animattionRunning = false)}
		>
			Play animation
		</button>
		<SyntaxHighlighting language="css"
			>{`@keyframes attention-shake {
	0% {
		transform: rotate(0deg) scale(1);
	}
	25% {
		transform: rotate(0deg) scale(1.4);
	}
	30% {
		transform: rotate(10deg) scale(1.4);
	}
	40% {
		transform: rotate(-10deg) scale(1.4);
	}
	50% {
		transform: rotate(10deg) scale(1.4);
	}
	55% {
		transform: rotate(0deg) scale(1.4);
	}
	70% {
		transform: rotate(0deg) scale(1.4);
	}
	100% {
		transform: rotate(0deg) scale(1);
	}
}

.attentionShake {
	animation: attention-shake 1s 1 ease-in-out;
}`}</SyntaxHighlighting
		>
	</section>
</article>

<style>
	@keyframes attention-shake {
		0% {
			transform: rotate(0deg) scale(1);
		}
		25% {
			transform: rotate(0deg) scale(1.4);
		}
		30% {
			transform: rotate(10deg) scale(1.4);
		}
		40% {
			transform: rotate(-10deg) scale(1.4);
		}
		50% {
			transform: rotate(10deg) scale(1.4);
		}
		55% {
			transform: rotate(0deg) scale(1.4);
		}
		70% {
			transform: rotate(0deg) scale(1.4);
		}
		100% {
			transform: rotate(0deg) scale(1);
		}
	}

	.attentionShake {
		animation: attention-shake 1s 1 ease-in-out;
	}
</style>
