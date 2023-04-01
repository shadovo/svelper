import { promises as fs } from 'fs';

export default async function updateJSON(filePath, jsonPath, value) {
	const content = await fs.readFile(filePath, 'utf8');
	const json = JSON.parse(content);
	const path = jsonPath.split('.');
	let current = json;
	for (let i = 0; i < path.length - 1; i++) {
		current = current[path[i]];
	}
	current[path[path.length - 1]] = value;
	await fs.writeFile(filePath, JSON.stringify(json, null, 2));
	return json;
}
