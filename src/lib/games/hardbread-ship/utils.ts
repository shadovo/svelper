export function getDownXYFromRotation(rotation: number): { x: number; y: number } {
	const radians = (rotation * Math.PI) / 180;
	const x = Math.sin(radians);
	const y = Math.cos(radians);
	return { x, y };
}

export function updateTimer(startTime: Date | null): string {
	if (!startTime) {
		return '00:00';
	}
	const seconds = Math.floor((new Date().getTime() - (startTime.getTime() || 0)) / 1000);
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;
	const secondsString = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;
	const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
	return `${minutesString}:${secondsString}`;
}

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
	requestPermission?: () => Promise<'granted' | 'denied'>;
}

export async function setUpOrientation(cb: (e: DeviceOrientationEvent) => void) {
	try {
		const response = await (
			DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
		)?.requestPermission?.();
		if (response === 'granted' || response === undefined) {
			window.addEventListener('deviceorientation', cb, true);
		}
	} catch {
		window.addEventListener('deviceorientation', cb, true);
	}
}

export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const element = new Image();
		element.onload = () => resolve(element);
		element.onerror = reject;
		element.src = src;
	});
}
