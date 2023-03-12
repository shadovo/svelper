import noteFrequencies from './note-frequencies';

export default function createSoundBoard(suspendIfIdleForInSeconds = 10) {
	let audioContext: AudioContext | null = null;
	let suspensionTimeout: NodeJS.Timeout;

	return {
		playNotes(duration: number, time: number, notes: string[]) {
			clearTimeout(suspensionTimeout);
			if (!audioContext || audioContext.state === 'closed') {
				audioContext = new AudioContext();
			} else if (audioContext.state === 'suspended') {
				audioContext.resume();
			}
			const relativeStart = audioContext.currentTime + time;
			const relativeStop = relativeStart + duration;
			const suspentionTime = (time + duration + suspendIfIdleForInSeconds) * 1000;

			notes.forEach((note) => {
				if (audioContext) {
					const oscillator = audioContext.createOscillator();
					const gain = audioContext.createGain();
					oscillator.connect(gain);
					oscillator.type = 'sine';
					oscillator.frequency.value = noteFrequencies[note];
					gain.gain.value = 0.2 * Math.pow(time + 1, 3);
					gain.connect(audioContext.destination);
					oscillator.start(relativeStart);
					gain.gain.exponentialRampToValueAtTime(0.0001, relativeStop);
					oscillator.stop(relativeStop);
				}
			});
			suspensionTimeout = setTimeout(() => {
				this.stop();
			}, suspentionTime);
		},
		stop() {
			audioContext?.suspend();
		},
		destroy() {
			audioContext?.close();
		},
	};
}
