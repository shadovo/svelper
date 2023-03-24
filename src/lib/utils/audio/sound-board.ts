import noteFrequencies from './note-frequencies';

export default function createSoundBoard(suspendIfIdleForInSeconds = 10) {
	let audioContext: AudioContext | null = null;
	let suspensionTimeout: ReturnType<typeof setTimeout>;

	return {
		playKickDrum(note = 'D2', duration = 0.25, time = 0) {
			clearTimeout(suspensionTimeout);
			if (!audioContext || audioContext.state === 'closed') {
				audioContext = new AudioContext();
			} else if (audioContext.state === 'suspended') {
				audioContext.resume();
			}
			const relativeStart = audioContext.currentTime + time;
			const relativeStop = relativeStart + duration;

			// create a noise source and a bandpass filter to create the "click" sound
			const noise = audioContext.createBufferSource();
			const bufferSize = audioContext.sampleRate / 20;
			const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
			const output = noiseBuffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				output[i] = Math.random() * 2 - 1;
			}
			noise.buffer = noiseBuffer;
			noise.loop = false;

			const filter = audioContext.createBiquadFilter();
			filter.type = 'bandpass';
			filter.frequency.value = 1000;
			filter.Q.value = 0.5;

			noise.connect(filter);

			// create an oscillator for the kick drum tone
			const osc = audioContext.createOscillator();
			const gain = audioContext.createGain();
			osc.type = 'sine';
			osc.frequency.value = noteFrequencies[note];
			gain.gain.setValueAtTime(1, relativeStart);
			gain.gain.exponentialRampToValueAtTime(0.0001, relativeStop);
			osc.connect(gain);
			gain.connect(audioContext.destination);

			// create an envelope for the kick drum sound
			const envelope = audioContext.createGain();
			envelope.gain.setValueAtTime(0.0, relativeStart);
			envelope.gain.linearRampToValueAtTime(0.9, relativeStart + 0.05);
			envelope.gain.exponentialRampToValueAtTime(0.01, relativeStop);

			// trigger the envelope and start playing the sound
			envelope.connect(gain.gain);
			noise.start(relativeStart);
			osc.start(relativeStart);
			// envelope.gain.setTargetAtTime(0.01, relativeStart, 0.5);
			envelope.gain.exponentialRampToValueAtTime(0.0001, relativeStop);
			noise.stop(relativeStop);
			osc.stop(relativeStop);
		},
		playHiHat(duration = 0.1, time = 0, note = 'C4') {
			clearTimeout(suspensionTimeout);
			if (!audioContext || audioContext.state === 'closed') {
				audioContext = new AudioContext();
			} else if (audioContext.state === 'suspended') {
				audioContext.resume();
			}
			const relativeStart = audioContext.currentTime + time;
			const relativeStop = relativeStart + duration;

			// create a bandpass filter
			const bandpassFilter = audioContext.createBiquadFilter();
			bandpassFilter.type = 'bandpass';
			bandpassFilter.frequency.value = 10000;
			bandpassFilter.Q.value = 1.5;

			// create an envelope for the hi-hat sound
			const envelope = audioContext.createGain();
			envelope.gain.setValueAtTime(1, audioContext.currentTime);
			envelope.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);

			// create a noise source and connect it to the filter and envelope
			const noise = audioContext.createBufferSource();
			const bufferSize = audioContext.sampleRate / 2;
			const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
			const output = noiseBuffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				output[i] = (Math.random() * 2 - 1) * 0.1;
			}
			noise.buffer = noiseBuffer;
			noise.loop = true;
			noise.connect(bandpassFilter);
			bandpassFilter.connect(envelope);
			envelope.connect(audioContext.destination);

			// start playing the sound
			noise.start(relativeStart);
			noise.stop(relativeStop);
		},
		playSnare(duration = 0.07, time = 0) {
			clearTimeout(suspensionTimeout);
			if (!audioContext || audioContext.state === 'closed') {
				audioContext = new AudioContext();
			} else if (audioContext.state === 'suspended') {
				audioContext.resume();
			}
			const relativeStart = audioContext.currentTime + time;
			const relativeStop = relativeStart + duration;

			// create a noise buffer
			const bufferSize = audioContext.sampleRate;
			const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
			const output = noiseBuffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				output[i] = (Math.random() * 2 - 1) * 0.1;
			}

			// create a noise source and filter
			const noise = audioContext.createBufferSource();
			noise.buffer = noiseBuffer;
			const noiseFilter = audioContext.createBiquadFilter();
			noiseFilter.type = 'highpass';
			noiseFilter.frequency.value = 1000;
			noise.connect(noiseFilter);

			// connect the nodes and start playing
			noiseFilter.connect(audioContext.destination);
			noise.start(relativeStart);
			noise.stop(relativeStop);
		},
		playBass(notes: string[], duration = 2, time = 0) {
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
					oscillator.type = 'triangle';
					oscillator.frequency.value = noteFrequencies[note];
					gain.gain.value = 0.1 * Math.pow(time + 1, 3);
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
		playNotes(notes: string[], duration = 2, time = 0) {
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
					gain.gain.value = 0.05 * Math.pow(time + 1, 3);
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
