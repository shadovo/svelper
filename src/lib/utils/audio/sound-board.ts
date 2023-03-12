import noteFrequencies from './note-frequencies';

export function playNotes(duration: number, time: number, notes: string[]) {
	const audioContext = new AudioContext();

	notes.forEach((note) => {
		const oscillator = audioContext.createOscillator();
		const gain = audioContext.createGain();
		oscillator.connect(gain);
		oscillator.type = 'sine';
		oscillator.frequency.value = noteFrequencies[note];
		gain.gain.value = 0.2 * Math.pow(time + 1, 3);
		gain.connect(audioContext.destination);
		oscillator.start(time);
		gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
		oscillator.stop(time + duration);
	});
}
