<script lang="ts">
	import BreathingTechnique from '$lib/tools/BreathingTechnique.svelte';
	import SyntaxHighlight from '$lib/components/SyntaxHighlighting.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';

	const boxBreathing = {
		duration: 4000,
		delay: 4000,
	};
</script>

<svelte:head>
	<title>An animated breath technique helper as Svelte component - Svelper</title>
	<meta
		name="description"
		content="A simple implementation of a timer for relaxing 
breathing techique as Svelte component. - A collection fun stuff"
	/>
</svelte:head>

<section>
	<h2>Relaxing breathing technique timer as Svelte component</h2>
	<p>
		A simple implementation of an animated breathing timer for relaxing breathing techniques as
		Svelte component.
	</p>
	<p>
		Check out the implementation at <a
			href="https://github.com/shadovo/svelper/blob/main/src/lib/tools/BreathingTechnique.svelte"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../BreathingTechnique.svelte</a
		>
	</p>
</section>
<section>
	<h3>4 seconds in 6 seconds out.</h3>
	<BreathingTechnique />
	<p>This is the default behaviour that you get by simply including the following</p>
	<SyntaxHighlight language="html">
		{`<BreathingTechnique />`}
	</SyntaxHighlight>
	<p>This would be the same as passing in the following props:</p>
	<SyntaxHighlighting language="javascript">
		{`const breathInConfig = {
	duration: 4000,
	delay: 700,
};
const breathOutConfig = {
	duration: 6000,
	delay: 700,
};`}
	</SyntaxHighlighting>
	<SyntaxHighlight language="html">
		{`<BreathingTechnique {breathInConfig} {breathOutConfig} />`}
	</SyntaxHighlight>
</section>
<section>
	<h3>4 seconds box breathing</h3>
	<BreathingTechnique breathInConfig={boxBreathing} breathOutConfig={boxBreathing} />
	<p>
		You can also customize the duration and delay of the breathing in and out by passing in the
		following props:
	</p>
	<SyntaxHighlighting language="javascript">
		{`const boxBreathing = {
	duration: 4000,
	delay: 4000,
};`}
	</SyntaxHighlighting>
	<SyntaxHighlight language="html">
		{`<BreathingTechnique breathInConfig={boxBreathing} breathOutConfig={boxBreathing} />`}
	</SyntaxHighlight>
</section>

<style lang="scss">
</style>
