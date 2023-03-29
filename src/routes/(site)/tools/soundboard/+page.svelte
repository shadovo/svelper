<script lang="ts">
	import createSoundboard from '$lib/utils/audio/soundboard';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
	import noteFrequencies from '$lib/utils/audio/note-frequencies';

	type BassNote = [string, number];
	type Note = string;
	type Melody = [Note[], BassNote[], boolean, boolean, boolean][];
	const melody: Melody = [
		[['C4', 'E4', 'G4', 'B4'], [['D2', 3]], true, true, false],
		[['D4', 'F4', 'A4', 'C5'], [], true, false, false],
		[['E4', 'G4', 'B4', 'D5'], [['B1', 3]], true, false, true],
		[['F4', 'A4', 'C5', 'E5'], [], true, false, false],
		[['G4', 'B4', 'D5', 'F5'], [['F2', 3]], true, true, false],
		[['A4', 'C5', 'E5', 'G5'], [], true, false, false],
		[['B4', 'D5', 'F5', 'A5'], [], true, false, true],
		[['C5', 'E5', 'G5', 'B5'], [], true, false, false],
	];

	const melody2: Melody = [
		[[], [], false, false, true],
		[[], [], false, false, false],
		[[], [], false, false, true],
		[[], [], false, false, false],
		[[], [], false, false, true],
		[[], [], false, false, false],
		[[], [], false, false, true],
		[[], [], false, false, false],
		[['G3', 'B3', 'D4'], [['G2', 6]], true, true, false],
		[['E4'], [], true, false, false],
		[['A3', 'C4', 'E4'], [['A2', 6]], true, false, true],
		[['G4', 'B4'], [], true, false, false],
		[['C4', 'E4', 'F4'], [['C2', 6]], true, true, false],
		[['D4'], [], true, false, false],
		[['C3', 'D3', 'A4'], [['C2', 6]], true, false, true],
		[['B5', 'A6'], [], true, false, false],
		[['F3', 'A3', 'C4'], [['F2', 6]], true, true, false],
		[['D4'], [], true, false, false],
		[['G3', 'B3', 'D4'], [['G2', 6]], true, false, true],
		[['C4', 'E4'], [], true, false, false],
		[['A3', 'C4', 'E4'], [['A2', 6]], true, true, false],
		[['D4'], [], true, false, false],
		[['C4', 'E4', 'G4'], [['C2', 6]], true, false, true],
		[['A4', 'C5'], [], true, false, false],
		[['D4', 'F4', 'G4'], [['D2', 6]], true, true, false],
		[['A4'], [], true, false, false],
		[['D3', 'F3', 'A3'], [['D2', 6]], true, false, true],
		[['C4', 'E4', 'G4'], [], true, false, false],
		[['F3', 'A3', 'C4'], [['F2', 6]], true, true, false],
		[['G3', 'B3', 'D4'], [], true, false, false],
		[['D4', 'F4', 'A4'], [['D2', 6]], true, false, true],
		[['C5'], [], true, false, false],
		[['E3', 'G3', 'B3'], [['E2', 6]], true, true, false],
		[['C4', 'E4', 'G4'], [], true, false, false],
		[['F3', 'A3', 'C4'], [['F2', 6]], true, false, true],
		[['G3', 'B3', 'D4'], [], true, false, false],
		[['C4', 'E4', 'G4'], [['C2', 6]], true, true, false],
		[['A4', 'C5'], [], true, false, false],
		[['D4', 'F4', 'G4'], [['D2', 6]], true, false, true],
		[['A4'], [], true, false, false],
	];
	const TEMPO = 240;
	let playing = false;
	let soundboard = createSoundboard();
	let soundLoop: ReturnType<typeof setTimeout>;
	let currentMelody = melody;

	const keys = Object.keys(noteFrequencies)
		.map((note) => {
			return note.match(/(.*)(\d)/);
		})
		.map((n) => {
			if (n) {
				return {
					note: n[1],
					octave: n[2],
				};
			}
			return null;
		})
		// get a list of all unique notes and a list of all unique octaves
		.reduce(
			(acc, n) => {
				if (n) {
					acc.notes.add(n.note);
					acc.octaves.add(n.octave);
				}
				return acc;
			},
			{ notes: new Set(), octaves: new Set() },
		);
	const notes = [...keys.notes];
	const octaves = [...keys.octaves];

	function togglePlay(m: Melody) {
		if (!playing) {
			currentMelody = m;
		}
		playing = !playing;
	}

	function runSoundLoop(beat = 0) {
		if (beat >= currentMelody.length) {
			beat = 0;
		}
		const [notes, bass, hihat, kick, snare] = currentMelody[beat];
		if (notes?.length) {
			soundboard.playNotes(notes);
		}

		if (bass?.length) {
			bass.forEach(([note, duration]) => {
				soundboard.playBass([note], duration);
			});
		}
		if (hihat) {
			soundboard.playHiHat();
		}
		if (snare) {
			soundboard.playSnare();
		}
		if (kick) {
			soundboard.playKickDrum();
		}

		if (playing) {
			soundLoop = setTimeout(() => {
				runSoundLoop(beat + 1);
			}, (60 / TEMPO) * 1000);
		}
	}
	function clearSoundLoop() {
		clearTimeout(soundLoop);
	}

	$: {
		if (playing) {
			runSoundLoop();
		} else {
			clearSoundLoop();
		}
	}
</script>

<svelte:head>
	<title>Web Audio API based soundboard - Svelper</title>
	<meta
		name="description"
		content="Just an experiment with what types of sounds cna be produced by the Web Audio API. - A collection fun stuff"
	/>
</svelte:head>

<section>
	<h2>Simple soundboard</h2>
	<p>
		Let me first prefix this with I have no knowledge of music, harmonies, scales or rhythm. This is
		just to explore the different sounds that could be produced by the <a
			href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Aduio API</a
		>
		on the fly instead of bundeling MP3s.
	</p>
	<p>
		Check out the implementation at <a
			href="https://github.com/shadovo/svelper/blob/main/src/lib/utils/soundboard.svelte"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../soundboard.svelte</a
		>
	</p>
</section>
<section>
	<h3>Drums</h3>
	<div class="flex-row flex-wrap">
		<button on:click={() => soundboard.playHiHat()}>Hi-hat</button>
		<button on:click={() => soundboard.playSnare()}>Snare</button>
		<button on:click={() => soundboard.playKickDrum()}>Kick drum</button>
	</div>
</section>
<section>
	<h3>Notes (sine)</h3>
	<div class="sidescroll">
		<table class="notes">
			<tr
				><th />
				{#each octaves as octave}
					<th>{octave}</th>
				{/each}
			</tr>
			{#each notes as note}
				<tr>
					<td>
						{note}
					</td>
					{#each octaves as octave}
						<td>
							<button on:click={() => soundboard.playNotes([`${note}${octave}`])}
								>{`${note}${octave}`}</button
							>
						</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
</section>
<section>
	<h3>Bass (triangle)</h3>
	<div class="sidescroll">
		<table class="notes">
			<tr
				><th />
				{#each octaves as octave}
					<th>{octave}</th>
				{/each}
			</tr>
			{#each notes as note}
				<tr>
					<td>
						{note}
					</td>
					{#each octaves as octave}
						<td>
							<button on:click={() => soundboard.playBass([`${note}${octave}`], 2)}
								>{`${note}${octave}`}</button
							>
						</td>
					{/each}
				</tr>
			{/each}
		</table>
	</div>
</section>

<section>
	<h3>Melodies</h3>
	<p>
		I wrote a function that can take a list of instructions on which instruments to play for each
		"beat".
	</p>
	<p>
		Check out the implementation at <a
			href="https://github.com/shadovo/svelper/blob/main/src/routes/(site)/tools/soundboard/%2Bpage.svelte"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../soundboard/+page.svelte</a
		>
	</p>
	<SyntaxHighlighting language="javascript">
		{`
// each row is [notes, bass, hihat, kick, snare]
const melody = [
	[['C4', 'E4', 'G4', 'B4'], [['D2', 3]], true, true, false],
	[['D4', 'F4', 'A4', 'C5'], [], true, false, false],
	[['E4', 'G4', 'B4', 'D5'], [['B1', 3]], true, false, true],
	[['F4', 'A4', 'C5', 'E5'], [], true, false, false],
	[['G4', 'B4', 'D5', 'F5'], [['F2', 3]], true, true, false],
	[['A4', 'C5', 'E5', 'G5'], [], true, false, false],
	[['B4', 'D5', 'F5', 'A5'], [], true, false, true],
	[['C5', 'E5', 'G5', 'B5'], [], true, false, false],
];
`}
	</SyntaxHighlighting>
	<button on:click={() => togglePlay(melody)}>{playing ? 'Pause' : 'Play'}</button>
</section>

<section>
	<h3>More complex melody</h3>
	<p>This is a melody generated by ChatGPT given the data format.</p>
	<SyntaxHighlighting language="javascript">
		{`
// each row is [notes, bass, hihat, kick, snare]
const melody = [
	[[], [], false, false, true],
	[[], [], false, false, false],
	[[], [], false, false, true],
	[[], [], false, false, false],
	[[], [], false, false, true],
	[[], [], false, false, false],
	[[], [], false, false, true],
	[[], [], false, false, false],
	[['G3', 'B3', 'D4'], [['G2', 6]], true, true, false],
	[['E4'], [], true, false, false],
	[['A3', 'C4', 'E4'], [['A2', 6]], true, false, true],
	[['G4', 'B4'], [], true, false, false],
	[['C4', 'E4', 'F4'], [['C2', 6]], true, true, false],
	[['D4'], [], true, false, false],
	[['C3', 'D3', 'A4'], [['C2', 6]], true, false, true],
	[['B5', 'A6'], [], true, false, false],
	[['F3', 'A3', 'C4'], [['F2', 6]], true, true, false],
	[['D4'], [], true, false, false],
	[['G3', 'B3', 'D4'], [['G2', 6]], true, false, true],
	[['C4', 'E4'], [], true, false, false],
	[['A3', 'C4', 'E4'], [['A2', 6]], true, true, false],
	[['D4'], [], true, false, false],
	[['C4', 'E4', 'G4'], [['C2', 6]], true, false, true],
	[['A4', 'C5'], [], true, false, false],
	[['D4', 'F4', 'G4'], [['D2', 6]], true, true, false],
	[['A4'], [], true, false, false],
	[['D3', 'F3', 'A3'], [['D2', 6]], true, false, true],
	[['C4', 'E4', 'G4'], [], true, false, false],
	[['F3', 'A3', 'C4'], [['F2', 6]], true, true, false],
	[['G3', 'B3', 'D4'], [], true, false, false],
	[['D4', 'F4', 'A4'], [['D2', 6]], true, false, true],
	[['C5'], [], true, false, false],
	[['E3', 'G3', 'B3'], [['E2', 6]], true, true, false],
	[['C4', 'E4', 'G4'], [], true, false, false],
	[['F3', 'A3', 'C4'], [['F2', 6]], true, false, true],
	[['G3', 'B3', 'D4'], [], true, false, false],
	[['C4', 'E4', 'G4'], [['C2', 6]], true, true, false],
	[['A4', 'C5'], [], true, false, false],
	[['D4', 'F4', 'G4'], [['D2', 6]], true, false, true],
	[['A4'], [], true, false, false],
];
`}
	</SyntaxHighlighting>
	<button on:click={() => togglePlay(melody2)}>{playing ? 'Pause' : 'Play'}</button>
</section>

<style lang="scss">
	.notes {
		font-size: 1rem;

		:global(button) {
			font-size: 0.8rem;
			padding: 0.4rem;
			border: 1px solid #ccc;
			width: 100%;
			display: inline-block;
		}
	}
	.sidescroll {
		width: 100%;
		max-width: 100%;
		overflow-x: scroll;
	}
	@media (max-width: 500px) {
		.notes {
			font-size: 0.7rem;

			tr:first-child,
			td:first-child {
				display: none;
			}
			:global(button) {
				padding: 0.5rem 0.3rem;
				min-width: 48px;
				min-height: 48px;
				border: 1px solid #ccc;
				width: 100%;
				display: inline-block;
			}
		}
	}
</style>
