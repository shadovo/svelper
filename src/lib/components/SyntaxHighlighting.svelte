<script lang="ts">
	import { onMount, afterUpdate, tick } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-yaml.js';
	import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
	import 'prismjs/themes/prism.css';

	// import './prism-theme.css';

	export let language: string = 'javascript';

	let preEl: HTMLElement | undefined;
	let fakeCodeEl: HTMLElement | undefined;
	let code: string | undefined;
	let formattedCode: string | undefined;

	onMount(() => {
		Prism.plugins.NormalizeWhitespace.setDefaults({
			'remove-trailing': true,
			'remove-indent': true,
			'left-trim': true,
			'right-trim': true,
		});
	});

	afterUpdate(async () => {
		// code variable if they are using a prop
		// Have to use innerText because innerHTML will create weird escape characaters
		if (fakeCodeEl && fakeCodeEl.innerText !== '') {
			code = fakeCodeEl.innerText;
		}
		// We need to wait till everything been rendered before we can
		// call highlightAll and load all the plugins
		await tick();
		// This will make sure all the plugins are loaded
		// Prism.highlight will not do that
		if (preEl) {
			Prism.highlightAllUnder(preEl);
		}
	});

	// creates the prism classes
	$: prismClasses = `language-${language} line-numbers`;

	// Only run if Prism is defined and we code
	$: if (typeof Prism !== 'undefined' && code) {
		formattedCode = Prism.highlight(code, Prism.languages[language], language);
	}
</script>

<code style:display="none" bind:this={fakeCodeEl}><slot /></code>
{#if formattedCode}
	<div class="syntax-highlighting">
		<pre bind:this={preEl} class={prismClasses}><code class="language-{language}"
				>{@html formattedCode}</code
			></pre>
	</div>
{/if}

<style lang="scss">
	div {
		padding-right: var(--gap);
		background-color: var(--c-background-code);
	}

	pre,
	code {
		color: var(--prism-text);
		background: var(--prism-background);
		text-shadow: var(--prism-text-shadow);
		font-size: 1em;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;

		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;

		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;

		&::-moz-selection,
		&::selection,
		& ::-moz-selection,
		& ::selection {
			text-shadow: none;
			background: var(--prism-selection-background);
		}
	}

	pre {
		border-radius: 0;
		background-color: var(--c-background-code);
		padding-top: var(--gap);
		padding-right: var(--gap);
		padding-bottom: var(--gap);
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		padding-right: var(--gap);
		margin: 0;
		overflow: auto;
	}

	pre > code {
		display: block;
	}

	.syntax-highlighting {
		:global(.token.namespace) {
			opacity: 0.7;
		}

		:global(.token.comment),
		:global(.token.prolog),
		:global(.token.doctype),
		:global(.token.cdata) {
			color: var(--prism-comment);
		}

		:global(.token.punctuation) {
			color: var(--prism-punctuation);
		}

		:global(.token.property),
		:global(.token.tag),
		:global(.token.constant),
		:global(.token.symbol),
		:global(.token.deleted) {
			color: var(--prism-tag);
		}

		:global(.token.boolean),
		:global(.token.number) {
			color: var(--prism-number);
		}

		:global(.token.selector),
		:global(.token.attr-name),
		:global(.token.string),
		:global(.token.char),
		:global(.token.builtin),
		:global(.token.inserted) {
			color: var(--prism-string);
		}

		:global(.token.operator),
		:global(.token.entity),
		:global(.token.url),
		:global(.token.language-css .string),
		:global(.token.style .string) {
			color: var(--prism-url);
			background: none;
		}

		:global(.token.atrule),
		:global(.token.attr-value) {
			color: var(--prism-atrule);
		}

		:global(.token.keyword) {
			color: var(--prism-keyword);
		}

		:global(.token.function),
		:global(.token.class-name) {
			color: var(--prism-function);
		}

		:global(.token.regex),
		:global(.token.important),
		:global(.token.variable) {
			color: var(--prism-regex);
		}

		:global(.token.important),
		:global(.token.bold) {
			font-weight: bold;
		}
		:global(.token.italic) {
			font-style: italic;
		}

		:global(.token.entity) {
			cursor: help;
		}
	}
</style>
