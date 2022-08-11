<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<article>
	<section class="flex">
		<h2>Element with syntax highlighting</h2>
		<p>This is an element with syntax highlighting.</p>
		<p>The following code:</p>
		<SyntaxHighlighting lang="html">
			{`<SyntaxHighlighting lang="javascript">
{\`
	console.log('Hello World!');
\`}
</SyntaxHighlighting>`}
		</SyntaxHighlighting>
		<p>will result in this output.</p>
		<SyntaxHighlighting>
			{`console.log('Hello World!');`}
		</SyntaxHighlighting>
	</section>
	<section>
		<p>
			This implementation is pretty much a copy of Phptuts implementation at <a
				href="https://github.com/phptuts/Svelte-PrismJS"
				target="_blank">github.com/phptuts/Svelte-PrismJS</a
			> exept that it uses css vars to allow for easy light/dark mode switching.
		</p>
		<p>
			This implementation can be found at <a
				href="https://github.com/shadovo/level-up/blob/main/src/lib/components/SyntaxHighlighting.svelte"
				>github.com/shadovo/level-up/../SyntaxHighlighting.svelte</a
			>
		</p>
	</section>
</article>
