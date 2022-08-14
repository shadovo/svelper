<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
	import srcOscar from '$img/oscar-head.svg';

	let showSimpleDialog = false;
	let showCustomHeaderDialog = false;
	let showCustomFooterDialog = false;
	let showScrollingDialog = false;

	let acceptedDialogOption: Boolean | undefined;

	const acceptDialog = () => {
		acceptedDialogOption = true;
		showCustomFooterDialog = false;
	};
	const declinedDialog = () => {
		acceptedDialogOption = false;
		showCustomFooterDialog = false;
	};
</script>

<svelte:head>
	<title>Dialog implementation as Svelte component - Svelper</title>
	<meta
		name="description"
		content="This component uses the standard HTML &lt;dialog&gt;
		element and adds some basic functionality to it. - A collection fun stuff
		built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<article>
	<section>
		<h2>Dialog implementation as Svelte component</h2>
		<p>
			This component uses the standard HTML <code>&lt;dialog&gt;</code> element and adds some basic functionality
			to it.
		</p>
		<p>For example it adds the possibility to click outside the dialog to close it.</p>
		<p>Adds a header, content and footer slots to the dialog.</p>
	</section>
	<section>
		<h3>Simple dialog</h3>
		<p>The follwing code will show the simplest of dialogs.</p>
		<SyntaxHighlighting language="html"
			>{`<Dialog title="Simple dialog" bind:show={showSimpleDialog}>
	<p>Hello world</p>
</Dialog>`}</SyntaxHighlighting
		>
		<button on:click={() => (showSimpleDialog = !showSimpleDialog)}>Show modal!</button>
		<Dialog title="Simple dialog" bind:show={showSimpleDialog}>
			<p>Hello world</p>
		</Dialog>
	</section>
	<section>
		<h3>Dialog with custom header element</h3>
		<p>The follwing code will show a dialog with a custom header.</p>
		<SyntaxHighlighting language="html"
			>{`<Dialog bind:show={showCustomHeaderDialog}>
	<div slot="header" class="row">
		<img src={srcOscar} alt="Avatar of the author" height="50" width="50" />
		<h4>Hi! It's me!</h4>
	</div>
	<p>Hello world</p>
</Dialog>`}</SyntaxHighlighting
		>
		<button on:click={() => (showCustomHeaderDialog = !showCustomHeaderDialog)}>Show modal!</button>
		<Dialog title="" bind:show={showCustomHeaderDialog}>
			<div slot="header" class="row">
				<img src={srcOscar} alt="Avatar of the author" height="50" width="50" />
				<h4>Hi! It's me!</h4>
			</div>
			<p>Hello world</p>
		</Dialog>
	</section>
	<section>
		<h3>Dialog with custom header and footer</h3>
		<p>The following code will show a dialog with a custom footer.</p>
		<SyntaxHighlighting language="javascript"
			>{`const acceptDialog = () => {
	acceptedDialogOption = true;
	showCustomFooterDialog = false;
};
const declinedDialog = () => {
	acceptedDialogOption = false;
	showCustomFooterDialog = false;
};`}</SyntaxHighlighting
		>
		<SyntaxHighlighting language="html"
			>{`<Dialog title="Test dialog" bind:show={showCustomFooterDialog}>
	<div slot="header" class="row">
		<img src={srcOscar} alt="Avatar of the author" height="50" width="50" />
		<h4>Hi! It's me!</h4>
	</div>
	<div class="flex">
		<p>This is a dialog with custom header and footer.</p>
	</div>
	<div class="dialog__footer" slot="footer">
		<button on:click={declinedDialog}>No way!</button>
		<button on:click={acceptDialog}>Sure!</button>
	</div>
</Dialog>`}</SyntaxHighlighting
		>
		<div class="row">
			<button on:click={() => (showCustomFooterDialog = !showCustomFooterDialog)}
				>Show modal!</button
			>
			{#if acceptedDialogOption === true}
				<p>You have accepted the info in the modal!</p>
			{:else if acceptedDialogOption === false}
				<p>You did not accept it? :(</p>
			{/if}
		</div>
		<Dialog title="Test dialog" bind:show={showCustomFooterDialog}>
			<div slot="header" class="row">
				<img src={srcOscar} alt="Avatar of the author" height="50" width="50" />
				<h4>Hi! It's me!</h4>
			</div>
			<div class="flex">
				<p>This is a dialog with custom header and footer.</p>
			</div>
			<div class="dialog__footer" slot="footer">
				<button on:click={declinedDialog}>No way!</button>
				<button on:click={acceptDialog}>Sure!</button>
			</div>
		</Dialog>
	</section>
	<section>
		<h3>Dialog with scroll</h3>
		<p>This will show a dialog with scroll</p>
		<SyntaxHighlighting language="html"
			>{`<Dialog title="Test dialog" bind:show={showScrollingDialog}>
	<div class="dialog__header" slot="header">
		<h2>Hello!</h2>
	</div>
	<div class="flex">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque sit
			dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque culpa, dicta
			ab. Illo, qui.
		</p>
	</div>
</Dialog>`}</SyntaxHighlighting
		>
		<button on:click={() => (showScrollingDialog = !showScrollingDialog)}>Show modal!</button>
		<Dialog title="Test dialog" bind:show={showScrollingDialog}>
			<div class="dialog__header" slot="header">
				<h2>Hello!</h2>
			</div>
			<div class="flex">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptate ullam ex itaque
					sit dolor corporis ducimus esse in exercitationem blanditiis saepe natus libero neque
					culpa, dicta ab. Illo, qui.
				</p>
			</div>
		</Dialog>
	</section>
	<section>
		<p>
			Check out the code at <a
				href="https://github.com/shadovo/svelper/blob/main/src/lib/components/Dialog.svelte"
				target="_blank">github.com/shadovo/svelper/../Dialog.svelte</a
			>
		</p>
	</section>
</article>

<style lang="scss">
	.dialog__header h2 {
		font-size: 2.5rem;
	}

	.dialog__footer {
		display: flex;
		justify-content: end;
		gap: var(--gap-half);
	}
</style>
