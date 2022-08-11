<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';

	let showModal = false;
	let acceptedDialogOption: Boolean | undefined;

	const acceptDialog = () => {
		acceptedDialogOption = true;
		showModal = false;
	};
	const declinedDialog = () => {
		acceptedDialogOption = false;
		showModal = false;
	};
</script>

<article>
	<section>
		<h2>Dialog implementation as Svelte component</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nobis eius veniam perspiciatis
			repellendus accusamus, veritatis dolore, unde quia minima similique asperiores sequi ratione
			voluptate iusto enim. Magnam, veniam soluta.
		</p>
	</section>
	<section class="row">
		<button on:click={() => (showModal = !showModal)}>Show modal!</button>
		{#if acceptedDialogOption === true}
			<p>You have accepted the info in the modal!</p>
		{:else if acceptedDialogOption === false}
			<p>You did not accept it? :(</p>
		{/if}
	</section>
	<section>
		<p>
			Check out the code at <a
				href="https://github.com/shadovo/level-up/blob/main/src/lib/components/Dialog.svelte"
				target="_blank">github.com/shadovo/level-up/../Dialog.svelte</a
			>
		</p>
	</section>
</article>

<Dialog title="Test dialog" bind:show={showModal}>
	<div class="dialog__header" slot="header">
		<h2>Hello!</h2>
	</div>
	<div class="flex" slot="content">
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
	<div class="dialog__footer" slot="footer">
		<button on:click={declinedDialog}>No way!</button>
		<button on:click={acceptDialog}>Sure!</button>
	</div>
</Dialog>

<style lang="scss">
	/* article {
		display: flex;
		gap: var(--gap);
		flex-direction: column;
		align-items: flex-start;
	} */

	.dialog__header h2 {
		font-size: 2.5rem;
	}

	.dialog__footer {
		display: flex;
		justify-content: end;
		gap: var(--gap-half);
	}

	@media (min-width: 650px) {
		/* article {
			flex-direction: row;
			align-items: center;
		} */
	}
</style>
