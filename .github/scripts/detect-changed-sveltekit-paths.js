import path from 'path';
import fs from 'fs';

// Note: This regex only matches imports from $lib/ or relative paths (./  ../).
// It does not detect imports from npm packages or absolute paths.
// Changes to node_modules dependencies won't be detected.
const MATCH_IMPORTS = /import\s+(?:[\w*\s{},]+\s+from\s+?|)["']((?:\$lib\/|\.+\/).*?)["']/g;

const PAGE_FILES = ['+page.svelte', '+page.js', '+page.ts'];
const LAYOUT_FILES = ['+layout.svelte', '+layout.js', '+layout.ts'];

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

function getPathOfPage(pagePath) {
	return (
		path
			.dirname(pagePath)
			// remove routes folder names
			.replace('src/routes', '')
			// remove layout group folders
			.replace(/\/\(.*\)/g, '')
	);
}

function fileContainsChangedDependencies(
	sveltekitProjectPath,
	filePath,
	changedFiles,
	visited = new Set(),
) {
	// Prevent infinite recursion from circular dependencies
	if (visited.has(filePath)) {
		return false;
	}
	visited.add(filePath);

	const fullPath = path.join(sveltekitProjectPath, filePath);

	// Handle file read errors gracefully
	let fileContent;
	try {
		fileContent = fs.readFileSync(fullPath, 'utf-8');
	} catch (error) {
		// File doesn't exist or can't be read - skip it
		console.warn(`Warning: Could not read file ${fullPath}: ${error.message}`);
		return false;
	}

	// Create a new regex instance to avoid lastIndex issues with global flag
	const importRegex = new RegExp(MATCH_IMPORTS.source, MATCH_IMPORTS.flags);
	let currentMatch;
	const deps = [];
	while (null != (currentMatch = importRegex.exec(fileContent))) {
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
				// Check for .svelte, .ts, and .js extensions
				const fullDepPath = path.join(sveltekitProjectPath, depPath);
				if (fs.existsSync(fullDepPath + '.svelte')) {
					return depPath + '.svelte';
				} else if (fs.existsSync(fullDepPath + '.ts')) {
					return depPath + '.ts';
				} else if (fs.existsSync(fullDepPath + '.js')) {
					return depPath + '.js';
				}
			}
			return depPath;
		});

	if (normalizedDeps.some((importPath) => changedFiles.includes(importPath))) {
		return true;
	}

	for (const dep of normalizedDeps) {
		if (fileContainsChangedDependencies(sveltekitProjectPath, dep, changedFiles, visited)) {
			return true;
		}
	}

	return false;
}

export default function getChangedPagePaths(sveltekitProjectPath, changedFiles) {
	// All pages in the project
	const allPages = findFiles(sveltekitProjectPath, 'src/routes', '+page.svelte');

	// Changed pages
	const changedPages = changedFiles.filter((file) =>
		PAGE_FILES.some((pageFile) => file.endsWith(pageFile)),
	);

	// Pages changed due to a layout change
	const changedLayoutPages = changedFiles
		.filter((file) => LAYOUT_FILES.some((layoutFile) => file.endsWith(layoutFile)))
		.map((file) => LAYOUT_FILES.reduce((res, layoutFile) => res.replace(layoutFile, ''), file))
		.map((path) => allPages.filter((page) => page.startsWith(path)))
		.flat();

	// Pages that depend on changed files
	const pagesWithChangedDependencies = allPages.filter((page) => {
		return fileContainsChangedDependencies(sveltekitProjectPath, page, changedFiles);
	});

	// Combine the two arrays and remove duplicates
	const changedPaths = new Set([
		...changedPages,
		...changedLayoutPages,
		...pagesWithChangedDependencies,
	]);

	// Return the paths of the changed pages
	return [...changedPaths].map((page) => getPathOfPage(page)).sort();
}
