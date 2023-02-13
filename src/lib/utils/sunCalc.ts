// Based on http://aa.quae.nl/en/reken/zonpositie.html
type MorningNames =
	| 'sunrise'
	| 'sunriseEnd'
	| 'dawn'
	| 'nauticalDawn'
	| 'nightEnd'
	| 'goldenHourEnd';

type EveningNames = 'sunset' | 'sunsetStart' | 'dusk' | 'nauticalDusk' | 'night' | 'goldenHour';

type TimeNames = MorningNames | EveningNames;

type SunTimes = {
	[time in TimeNames]?: Date;
} & {
	solarNoon: Date;
	nadir: Date;
};

// date/time constants and conversions
const rad = Math.PI / 180;
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
// J0 provides the date and time of a transit of the Sun.
const J0 = 0.0009;

// Julian Date - the number of days since noon UTC on January 1, 4713 BC.
// Used in astronomy to calculate positions of celestial bodies.
// https://www.aa.quae.nl/cgi-bin/glossary.cgi?l=en&o=Julian%20Date
function toJulian(date: Date) {
	return date.valueOf() / dayMs - 0.5 + J1970;
}
function fromJulian(j: number) {
	return new Date((j + 0.5 - J1970) * dayMs);
}
function toDays(date: Date) {
	return toJulian(date) - J2000;
}

// general calculations for position
const obliquityOfEarth = rad * 23.4397; // obliquity of the Earth

function getRightAscension(eclipticLongitude: number, eclipticLatitude: number): number {
	return Math.atan2(
		Math.sin(eclipticLongitude) * Math.cos(obliquityOfEarth) -
			Math.tan(eclipticLatitude) * Math.sin(obliquityOfEarth),
		Math.cos(eclipticLongitude),
	);
}

function getDeclination(eclipticLongitude: number, eclipticLatitude: number): number {
	return Math.asin(
		Math.sin(eclipticLatitude) * Math.cos(obliquityOfEarth) +
			Math.cos(eclipticLatitude) * Math.sin(obliquityOfEarth) * Math.sin(eclipticLongitude),
	);
}

function getAzimuth(hourAngle: number, latitudeInRad: number, declination: number): number {
	return Math.atan2(
		Math.sin(hourAngle),
		Math.cos(hourAngle) * Math.sin(latitudeInRad) - Math.tan(declination) * Math.cos(latitudeInRad),
	);
}

function getAltitude(hourAngle: number, latitudeInRad: number, declination: number): number {
	return Math.asin(
		Math.sin(latitudeInRad) * Math.sin(declination) +
			Math.cos(latitudeInRad) * Math.cos(declination) * Math.cos(hourAngle),
	);
}

function getSiderealTime(daysSinceJ2000: number, longitudeInRad: number): number {
	return rad * (280.16 + 360.9856235 * daysSinceJ2000) - longitudeInRad;
}

function getSolarMeanAnomaly(daysSinceJ2000: number): number {
	return rad * (357.5291 + 0.98560028 * daysSinceJ2000);
}

function getEclipticLongitude(solarMeanAnomaly: number): number {
	const center =
		rad *
		(1.9148 * Math.sin(solarMeanAnomaly) +
			0.02 * Math.sin(2 * solarMeanAnomaly) +
			0.0003 * Math.sin(3 * solarMeanAnomaly));
	const earthPerihelion = rad * 102.9372;

	return solarMeanAnomaly + center + earthPerihelion + Math.PI;
}

function getSunCoords(daysSinceJ2000: number): { declination: number; rightAscension: number } {
	const solarMeanAnomaly = getSolarMeanAnomaly(daysSinceJ2000);
	const eclipticLongitude = getEclipticLongitude(solarMeanAnomaly);

	return {
		declination: getDeclination(eclipticLongitude, 0),
		rightAscension: getRightAscension(eclipticLongitude, 0),
	};
}

/**
 * Calculates sun position for a given date and latitude/longitude
 * @param date
 * @param latitude
 * @param longitude
 * @returns {Object} with azimuth and altitude of the sun
 */
export const getPosition = function (
	date: Date,
	latitude: number,
	longitude: number,
): {
	azimuth: number;
	altitude: number;
} {
	const longitudeInRad = rad * -longitude;
	const latitudeInRad = rad * latitude;
	const days = toDays(date);
	const sunCoords = getSunCoords(days);
	const siderealTime = getSiderealTime(days, longitudeInRad) - sunCoords.rightAscension;

	return {
		azimuth: getAzimuth(siderealTime, latitudeInRad, sunCoords.declination),
		altitude: getAltitude(siderealTime, latitudeInRad, sunCoords.declination),
	};
};

// sun times configuration (angle, morning name, evening name)
const times: Array<{
	angle: number;
	morningName: MorningNames;
	eveningName: EveningNames;
}> = [
	{ angle: -0.833, morningName: 'sunrise', eveningName: 'sunset' },
	{ angle: -0.3, morningName: 'sunriseEnd', eveningName: 'sunsetStart' },
	{ angle: -6, morningName: 'dawn', eveningName: 'dusk' },
	{ angle: -12, morningName: 'nauticalDawn', eveningName: 'nauticalDusk' },
	{ angle: -18, morningName: 'nightEnd', eveningName: 'night' },
	{ angle: 6, morningName: 'goldenHourEnd', eveningName: 'goldenHour' },
];

function getJulianCycle(daysSinceJ2000: number, longitudeInRad: number): number {
	return Math.round(daysSinceJ2000 - J0 - longitudeInRad / (2 * Math.PI));
}

function getApproxTransit(
	hourAngleTime: number,
	longitudeInRad: number,
	julianCycles: number,
): number {
	return J0 + (hourAngleTime + longitudeInRad) / (2 * Math.PI) + julianCycles;
}

function getSolarTransitJ(
	approxTransit: number,
	solarMeanAnomaly: number,
	eclipticLongitude: number,
): number {
	return (
		J2000 +
		approxTransit +
		0.0053 * Math.sin(solarMeanAnomaly) -
		0.0069 * Math.sin(2 * eclipticLongitude)
	);
}

function getHourAngle(sunAltitude: number, latitudeInRad: number, declination: number): number {
	return Math.acos(
		(Math.sin(sunAltitude) - Math.sin(latitudeInRad) * Math.sin(declination)) /
			(Math.cos(latitudeInRad) * Math.cos(declination)),
	);
}

function getObserverAngle(height: number): number {
	return (-2.076 * Math.sqrt(height)) / 60;
}

// returns set time for the given sun altitude
function getSetJ(
	sunAltitude: number,
	longitudeInRad: number,
	latitudeInRad: number,
	declination: number,
	julianCycle: number,
	solarMeanAnomaly: number,
	eclipticLongitude: number,
): number {
	const hourAngle = getHourAngle(sunAltitude, longitudeInRad, declination);
	const a = getApproxTransit(hourAngle, latitudeInRad, julianCycle);
	return getSolarTransitJ(a, solarMeanAnomaly, eclipticLongitude);
}

export const getTimes = function (
	date: Date,
	latitude: number,
	longitude: number,
	height = 0,
): SunTimes {
	const longitudeInRad = rad * -longitude;
	const latitudeInRad = rad * latitude;
	const observerAngle = getObserverAngle(height);
	const days = toDays(date);
	const julianCycle = getJulianCycle(days, longitudeInRad);
	const approxTransit = getApproxTransit(0, longitudeInRad, julianCycle);
	const solarMeanAnomaly = getSolarMeanAnomaly(approxTransit);
	const eclipticLongitude = getEclipticLongitude(solarMeanAnomaly);
	const declination = getDeclination(eclipticLongitude, 0);
	const Jnoon = getSolarTransitJ(approxTransit, solarMeanAnomaly, eclipticLongitude);

	const result = times.reduce(
		(res: SunTimes, time) => {
			const h0 = (time.angle + observerAngle) * rad;
			const Jset = getSetJ(
				h0,
				longitudeInRad,
				latitudeInRad,
				declination,
				julianCycle,
				solarMeanAnomaly,
				eclipticLongitude,
			);
			const Jrise = Jnoon - (Jset - Jnoon);
			res[time.morningName] = fromJulian(Jrise);
			res[time.eveningName] = fromJulian(Jset);
			return res;
		},
		{
			solarNoon: fromJulian(Jnoon),
			nadir: fromJulian(Jnoon - 0.5),
		},
	);

	return result;
};

export default getTimes;
