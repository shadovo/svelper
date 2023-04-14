<script>
	import 'ress';
</script>

<slot />

<style global lang="scss">
	@mixin darkTheme {
		--shadow-color: 220 40% 2%;
		--shadow-strength: 25%;

		--c-text: #f2f2f2;
		--c-background-rgb: 12, 18, 28;
		--c-background-code: #030303;
		--c-accent: #39b2bd;
		--c-logo: var(--c-text);

		--c-table-border: #464646;
		--c-table-row: #2f2f2f;

		--prism-background: none;
		--prism-text: #f8f8f2;
		--prism-text-shadow: 0 1px rgba(0, 0, 0, 0.3);
		--prism-selection-background: none;
		--prism-comment: #83a3bf;
		--prism-punctuation: #f8f8f2;
		--prism-tag: #ff8bb5;
		--prism-number: #ae81ff;
		--prism-string: #a6e22e;
		--prism-url: #8a8a2b;
		--prism-variable: #f8f8f2;
		--prism-atrule: #e6db74;
		--prism-keyword: #66d9ef;
		--prism-function: #e6db74;
		--prism-regex: #fd971f;
	}

	html {
		--font-title: ui-serif, serif;
		--font-text: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans,
			sans-serif, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
		--font-accent: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco,
			Droid Sans Mono, Source Code Pro, monospace;
		--font-code: Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco,
			Droid Sans Mono, Source Code Pro, monospace;
		--font-weight-bold: 700;

		--font-size-base: 16px;

		--gap-quarter: 0.25rem;
		--gap-half: 0.5rem;
		--gap: 1rem;
		--gap-2: 1.5rem;
		--gap-3: 2rem;

		--layer-1: 1;
		--layer-2: 2;
		--layer-3: 3;
		--layer-4: 4;
		--layer-5: 5;
		--layer-important: 2147483647;

		--shadow-color: 220 3% 15%;
		--shadow-strength: 1%;

		--c-table-border: var(--c-text);
		--c-table-row: #f4f4f5;

		--c-text: #0d0d0d;
		--c-background-rgb: 255, 255, 255;
		--c-background: rgb(var(--c-background-rgb));
		--c-background-code: #f9f9f9;
		--c-accent: #0b828d;
		--c-logo: var(--c-accent);

		--prism-background: none;
		--prism-text: #000000;
		--prism-text-shadow: 0 1px white;
		--prism-selection-background: #b3d4fc;
		--prism-comment: #0055ab;
		--prism-punctuation: #484848;
		--prism-tag: #905;
		--prism-number: #905;
		--prism-string: #3a5700;
		--prism-url: #9a6e3a;
		--prism-variable: #f8f8f2;
		--prism-atrule: #005478;
		--prism-keyword: #005478;
		--prism-function: #8a2e41;
		--prism-regex: #b64a00;
	}

	html.theme-dark {
		@include darkTheme;
	}

	@media (prefers-color-scheme: dark) {
		html:not(.theme-light) {
			@include darkTheme;
		}
	}

	html.transparent {
		--c-background: transparent;
	}

	html {
		background: var(--c-background);
		font-family: var(--font-text);
		color: var(--c-text);
		overflow-y: scroll;
	}

	h1,
	h2,
	h3,
	h4,
	h5 {
		font-family: var(--font-accent);
		line-height: 1.2;
		margin-bottom: var(--gap-half);
	}

	p {
		line-height: 1.6;
	}

	ul {
		margin-bottom: var(--gap);
		list-style: none;
	}

	.list {
		list-style: disc;
		margin-left: var(--gap-2);
		margin-top: var(--gap-half);
	}

	li {
		margin-bottom: var(--gap-quarter);
	}

	a {
		color: var(--c-accent);
		text-decoration: none;
		font-weight: bold;
		white-space: pre-wrap; /* CSS3 */
		white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
		white-space: -pre-wrap; /* Opera 4-6 */
		white-space: -o-pre-wrap; /* Opera 7 */
		word-wrap: break-word; /* Internet Explorer 5.5+ */
	}

	a:hover {
		text-decoration: underline;
	}

	.flex {
		display: flex;
		flex-direction: column;
		gap: var(--gap-half);
	}

	button {
		display: flex;
		padding: var(--gap-half) var(--gap);
		background-color: var(--c-background);
		border: 3px solid var(--c-text);
		color: var(--c-text);
		font-family: var(--font-accent);
		font-weight: var(--font-weight-bold);
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	button:hover {
		background-color: rgba(125, 125, 125, 0.2);
	}

	button[disabled] {
		background-color: var(--c-text);
		color: var(--c-background);
		cursor: not-allowed;
	}

	code {
		background-color: var(--c-background-code);
		padding: 0 4px;
	}

	.button-icon {
		border-radius: var(--radius-round);
		padding: var(--gap-quarter);
		aspect-ratio: 1;
		flex-shrink: 0;
		align-items: center;
		justify-items: center;
		place-items: center;
		stroke: currentColor;
		stroke-width: 3px;
		border-width: 3px;
		background-color: transparent;
	}

	.accent {
		font-family: var(--font-accent);
		font-weight: bold;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		gap: var(--gap);
		align-items: center;
	}

	.flex-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.padded {
		padding: var(--gap) 0;
	}

	.box {
		padding: var(--gap);
		border: 3px solid var(--c-text);
		border-radius: var(--radius);
		background-color: var(--c-background);
	}
</style>
