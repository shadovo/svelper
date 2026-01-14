<script lang="ts">
	// Updated dummy change to test changed-sveltekit-paths workflow for Vercel URL construction
	import { tick, onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-yaml.js';
	import 'prismjs/components/prism-typescript.js';
	import 'prismjs/components/prism-bash.js';
	import 'prism-svelte';
	import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
	import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
	import 'prismjs/themes/prism.css';

	interface Props {
		language?: string;
		children?: Snippet;
	}

	let { language = 'javascript', children }: Props = $props();

	let preEl: HTMLElement | undefined = $state();
	let fakeCodeEl: HTMLElement | undefined = $state();
	let code: string | undefined = $state();
	let formattedCode: string | undefined = $state();

	const updateHighlight = async () => {
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
	};

	onMount(() => {
		Prism.plugins.NormalizeWhitespace.setDefaults({
			'remove-trailing': true,
			'remove-indent': true,
			'left-trim': true,
			'right-trim': true,
		});
	});

	// creates the prism classes
	let prismClasses = $derived(`language-${language} line-numbers`);

	// Run updateHighlight when code changes
	$effect(() => {
		updateHighlight();
	});

	// Only run if Prism is defined and we have code
	$effect(() => {
		if (typeof Prism !== 'undefined' && code) {
			formattedCode = Prism.highlight(code, Prism.languages[language], language);
		}
	});
</script>

<code style:display={formattedCode ? 'none' : ''} class="placeholder" bind:this={fakeCodeEl}
	>{@render children?.()}</code
>

{#if formattedCode}
	<div>
		<pre bind:this={preEl} class={prismClasses}><code class="language-{language}">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html formattedCode}</code
			></pre>
	</div>
{/if}

<style lang="scss">
	.placeholder {
		padding: var(--gap) 0 var(--gap) 4em;
		margin: var(--gap) 0;
		display: block;
		overflow-x: auto;
		background: var(--surface-2);
	}

	pre,
	code {
		color: var(--prism-text);
		background: var(--prism-background);
		text-shadow: var(--prism-text-shadow);
		font-family: var(--font-code);
		font-size: 1rem;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		line-height: 1.5;

		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;

		hyphens: none;

		&::-moz-selection,
		&::selection {
			text-shadow: none;
			background: var(--prism-selection-background);
		}
	}

	@media (width < 768px) {
		pre,
		code {
			font-size: 0.75rem;
		}
	}

	pre {
		border-radius: 0;
		background-color: var(--surface-2);
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

	div {
		padding-right: var(--gap);
		background-color: var(--surface-2);
		margin: var(--gap) 0;

		:global(.namespace) {
			opacity: 1;
		}

		:global(.comment),
		:global(.prolog),
		:global(.doctype),
		:global(.cdata) {
			color: var(--prism-comment);
		}

		:global(.punctuation) {
			color: var(--prism-punctuation);
		}

		:global(.property),
		:global(.tag),
		:global(.constant),
		:global(.symbol),
		:global(.deleted) {
			color: var(--prism-tag);
		}

		:global(.boolean),
		:global(.number) {
			color: var(--prism-number);
		}

		:global(.selector),
		:global(.attr-name),
		:global(.string),
		:global(.char),
		:global(.builtin),
		:global(.inserted) {
			color: var(--prism-string);
		}

		:global(.operator),
		:global(.entity),
		:global(.url),
		:global(.language-css .string),
		:global(.style .string) {
			color: var(--prism-url);
			background: none;
		}

		:global(.atrule),
		:global(.attr-value) {
			color: var(--prism-atrule);
		}

		:global(.keyword) {
			color: var(--prism-keyword);
		}

		:global(.function),
		:global(.class-name) {
			color: var(--prism-function);
		}

		:global(.regex),
		:global(.important),
		:global(.variable) {
			color: var(--prism-regex);
		}

		:global(.important),
		:global(.bold) {
			font-weight: bold;
		}
		:global(.italic) {
			font-style: italic;
		}

		:global(.entity) {
			cursor: help;
		}
	}
</style>
