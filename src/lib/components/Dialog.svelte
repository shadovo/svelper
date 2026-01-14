<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		show?: boolean;
		title?: string | null;
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	}

	let { show = $bindable(false), title = null, header, footer, children }: Props = $props();

	let dialogEle: HTMLDialogElement | null = $state(null);

	const dialogClosed = () => {
		show = false;
	};

	const dialogClick = (event: MouseEvent) => {
		const dialog = event?.target as HTMLDialogElement | undefined;
		if (dialog?.nodeName === 'DIALOG') {
			dialog?.close();
		}
	};

	const closeDialog = () => {
		dialogEle?.close();
		show = false;
	};

	$effect.pre(() => {
		if (show) {
			dialogEle?.showModal();
		} else {
			dialogEle?.close();
		}
	});
</script>

<dialog class="dialog" bind:this={dialogEle} onclick={dialogClick} onclose={dialogClosed}>
	<div class="dialog-content">
		<header>
			{#if header}
				<div class="header-content">
					{@render header()}
				</div>
			{:else if title}
				<h2 class="header-content">{title}</h2>
			{/if}
			<button class="button-icon" onclick={closeDialog} type="button" title="Close dialog">
				<title>Close dialog icon</title>
				<svg width="24" height="24" viewBox="0 0 24 24">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		</header>
		<article>
			{@render children?.()}
		</article>
		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
	</div>
</dialog>

<style lang="scss">
	:global(html:has(dialog[open])) {
		// css nomarlize sets html overflow-y which causes
		// issues when trying to lock the scroll position.
		overflow-y: initial;
	}

	:global(body:has(dialog[open])) {
		overflow: hidden;
	}

	.dialog {
		align-items: start;
		width: min(90vw, 70ch);
		color: var(--c-text);
		margin: auto;
		padding: 0;
		position: fixed;
		inset: 0;
		border: 5px solid var(--c-text);
		box-shadow:
			0 -1px 3px 0 hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
			0 1px 2px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 2%)),
			0 2px 5px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 4%)),
			0 4px 12px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 5%)),
			0 12px 15px -5px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 7%));
		z-index: var(--layer-impoetant);
		overflow: hidden;
		transition: opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
		background: var(--surface-1);

		&::backdrop {
			background: rgba(75, 75, 75, 0.2);
			backdrop-filter: blur(4px);
		}

		& > .dialog-content {
			display: grid;
			grid-template-rows: auto 1fr auto;
			align-items: start;
			max-block-size: min(80vh, 700px);
			max-block-size: min(80dvb, 700px);

			& > * {
				padding: var(--gap);
			}

			& > article {
				overflow-y: auto;
				max-block-size: 100%; /* safari */
				overscroll-behavior-y: contain;
				display: grid;
				justify-items: flex-start;
				gap: var(--gap-2);
				font-family: var(--font-text);
				padding: var(--gap-3) var(--gap);
			}

			& > header {
				padding: var(--gap-2) var(--gap);
				font-family: var(--font-title);
				border-bottom: 3px solid var(--c-text);
				display: flex;
				align-items: center;

				.header-content {
					flex-grow: 1;
				}

				> .button-icon {
					justify-self: end;
				}
			}
			& > footer {
				border-top: 3px solid var(--c-text);
			}
		}
	}
</style>
