<script lang="ts">
	import BreathingTechnique from '$lib/tools/BreathingTechnique.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
	import Image from '$lib/components/Image.svelte';
	import breathingHeroImage from '$img/tools/breath.png?w=2064;1376;1194;796;688;398&imagetools';

	const heroImageSize = `
		(min-width: 1024px)	688px,
		(min-width: 769px) calc(100vw - 336px),
		calc(100vw - 16px)
	`;

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
	<div class="hero">
		<Image
			alt="Breathing timer"
			src={breathingHeroImage}
			sizes={heroImageSize}
			aspectRatio="3/1"
			background="#202b3f"
		/>
		<h2>Breathing timer</h2>
	</div>
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
	<div class="padded">
		<BreathingTechnique />
	</div>
	<p>This is the default behaviour that you get by simply including the following</p>
	<SyntaxHighlighting language="html">
		{`<BreathingTechnique />`}
	</SyntaxHighlighting>
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
	<SyntaxHighlighting language="html">
		{`<BreathingTechnique {breathInConfig} {breathOutConfig} />`}
	</SyntaxHighlighting>
</section>
<section>
	<p>
		This game is also available in an embed version at
		<a href="/embeds/v1/breath" target="_blank">https://www.svelper.com/embeds/v1/breath</a>
	</p>
</section>

<section>
	<h3>4 seconds box breathing</h3>
	<div class="padded">
		<BreathingTechnique breathInConfig={boxBreathing} breathOutConfig={boxBreathing} />
	</div>
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
	<SyntaxHighlighting language="html">
		{`<BreathingTechnique breathInConfig={boxBreathing} breathOutConfig={boxBreathing} />`}
	</SyntaxHighlighting>
</section>
<section>
	<h3>4, 7, 8 breathing.</h3>
	<p>
		This one is configured for the 4, 7, 8 breathing technique. The duration of the breathing in is
		4 seconds, hold for 7 seconds and breath out for 8 seconds.
	</p>
	<div class="padded">
		<BreathingTechnique
			breathInConfig={{ duration: 4000, delay: 700 }}
			breathOutConfig={{ duration: 8000, delay: 7000 }}
		/>
	</div>
	<SyntaxHighlighting language="javascript">
		{`const breathInConfig = {
	duration: 4000,
	delay: 700,
};
const breathOutConfig = {
	duration: 8000,
	delay: 7000,
};`}
	</SyntaxHighlighting>
	<SyntaxHighlighting language="html">
		{`<BreathingTechnique {breathInConfig} {breathOutConfig} />`}
	</SyntaxHighlighting>
</section>

<section>
	<h3>Default timing with muted sound and no vibration</h3>
	<p>
		You can also mute the sound and vibration by passing in the following props:
		<SyntaxHighlighting language="html">{`sound={false} vibration={false}`}</SyntaxHighlighting>
	</p>
	<div class="padded">
		<BreathingTechnique sound={false} vibration={false} />
	</div>
	<SyntaxHighlighting language="html">
		{`<BreathingTechnique sound={false} vibration={false} />`}
	</SyntaxHighlighting>
</section>

<style lang="scss">
</style>
