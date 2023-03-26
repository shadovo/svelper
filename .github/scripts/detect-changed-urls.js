import path from 'path';
import fs from 'fs';

const MATCH_IMPORTS = /\s*import\s+(?:.|\{[^\}]*\})*from\s+(?:'|")((?:\$lib|\.+\/).*)(?:'|");?\s*/g;

function findFiles(sveltekitProjectPath, dir, ending) {
	// Get all files and directories in the given directory
	const files = fs.readdirSync(path.join(sveltekitProjectPath, dir));

	// Initialize an array to store the matching files
	let matchingFiles = [];

	// Loop through all the files and directories
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(path.join(sveltekitProjectPath, filePath));

		// Check if the current item is a directory
		if (stat.isDirectory()) {
			// Recursively search for files in the subdirectory
			matchingFiles = matchingFiles.concat(findFiles(sveltekitProjectPath, filePath, ending));
		} else {
			// Check if the current file matches the pattern
			if (file.endsWith(ending)) {
				// Add the matching file to the array
				matchingFiles.push(filePath);
			}
		}
	}

	// Return the array of matching files
	return matchingFiles;
}

function getUrlOfPage(domain, pagePath) {
	return (
		domain +
		path
			.dirname(pagePath)
			.replace('src/routes', '')
			.replace(/\(.*\)\//g, '')
	);
}

function fileContainsChangedDependencies(sveltekitProjectPath, filePath, changedFiles) {
	const fileContent = fs.readFileSync(path.join(sveltekitProjectPath, filePath), 'utf-8');
	let currentMatch;
	const deps = [];
	while (null != (currentMatch = MATCH_IMPORTS.exec(fileContent))) {
		deps.push(currentMatch[1]);
	}
	const normalizedDeps = deps
		.map((dep) => {
			if (dep.match(/^\.+\//)) {
				return path.join(path.dirname(filePath), dep);
			}
			return dep.replace('$lib', 'src/lib');
		})
		.map((depPath) => {
			if (path.extname(depPath) === '') {
				if (fs.existsSync(depPath + '.ts')) {
					return depPath + '.ts';
				} else if (fs.existsSync(depPath + '.js')) {
					return depPath + '.js';
				}
			}
			return depPath;
		});
	if (normalizedDeps.some((importPath) => changedFiles.includes(importPath))) {
		return true;
	}
	for (const dep of normalizedDeps) {
		if (fileContainsChangedDependencies(sveltekitProjectPath, dep, changedFiles)) {
			return true;
		}
	}
}

export default function getChangedPageUrls(domain, sveltekitProjectPath, changedFiles) {
	// All pages in the project
	const allPages = findFiles(sveltekitProjectPath, 'src/routes', '+page.svelte');

	// Changed pages
	const changedPages = changedFiles.filter((file) => file.endsWith('+page.svelte'));

	// Pages changed due to a layout change
	const changedLayoutPages = changedFiles
		.filter((file) => file.endsWith('+layout.svelte'))
		.map((file) => file.replace('+layout.svelte', ''))
		.map((path) => allPages.filter((page) => page.startsWith(path)))
		.flat();

	const pagesWithChangedDependencies = [
		'src/routes/(site)/components/syntax-highlighting/+page.svelte',
	].filter((page) => {
		return fileContainsChangedDependencies(sveltekitProjectPath, page, changedFiles);
	});

	// Combine the two arrays and remove duplicates
	const changedUrls = new Set([
		...changedPages,
		...changedLayoutPages,
		...pagesWithChangedDependencies,
	]);

	// Return the URLs of the changed pages
	return [...changedUrls].map((page) => getUrlOfPage(domain, page));
}
