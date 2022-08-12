<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>SyntaxHighlighting via Prism as a component - Tips & tricks!</title>
	<meta
		name="description"
		content="A svelte component implementing Prism for syntax highlighting - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<article>
	<section>
		<h2>Component with syntax highlighting</h2>
		<p>This is a component with syntax highlighting.</p>
		<p>The following code:</p>
		<SyntaxHighlighting language="html">
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
		<h3>Styling</h3>
		<p>
			The syntax highlighting colors are defined via css variables. This page uses the following
			colors for light and dark mode.
		</p>
		<SyntaxHighlighting language="css"
			>{`	:global(:root) {
	--prism-background: none;
	--prism-text: #000000;
	--prism-text-shadow: 0 1px white;
	--prism-selection-background: #b3d4fc;
	--prism-comment: #708090;
	--prism-punctuation: #999999;
	--prism-tag: #905;
	--prism-number: #905;
	--prism-string: #690;
	--prism-url: #9a6e3a;
	--prism-variable: #f8f8f2;
	--prism-atrule: #07a;
	--prism-keyword: #07a;
	--prism-function: #dd4a68;
	--prism-regex: #e90;
}

@media (prefers-color-scheme: dark) {
	:global(:root) {
		--prism-background: none;
		--prism-text: #f8f8f2;
		--prism-text-shadow: 0 1px rgba(0, 0, 0, 0.3);
		--prism-selection-background: none;
		--prism-comment: #535e68;
		--prism-punctuation: #f8f8f2;
		--prism-tag: #f92672;
		--prism-number: #ae81ff;
		--prism-string: #a6e22e;
		--prism-url: #8a8a2b;
		--prism-variable: #f8f8f2;
		--prism-atrule: #e6db74;
		--prism-keyword: #66d9ef;
		--prism-function: #e6db74;
		--prism-regex: #fd971f;
	}
}`}</SyntaxHighlighting
		>
	</section>
	<section>
		<h3>Implementation</h3>
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
