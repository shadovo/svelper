<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>Affected SvelteKit paths in PR with GitHub action - Svelper</title>
	<meta
		name="description"
		content="Using GitHub actions to find all paths in SvelteKit affected by changes in a PR - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<section>
	<h2>Affected SvelteKit paths in PR.</h2>
	<p>Using GitHub actions to find all paths in SvelteKit affected by changes in a PR.</p>
	<p>
		This action will look at +page.svelte files in the routes folder adding those pages. Same goes
		for +page.js and +page.ts.
	</p>
	<p>
		It will also detect changes in +layout.svelte, +layout.js and +layout.ts files and add all
		sibling and child pages to the list of affected pages.
	</p>
	<p>
		Not only does it check if the pages or layouts themselves have changed, it also checks if any of
		the imported files have changed. (Exception being updated dependencies for now.)
	</p>
</section>
<section>
	<h3>Step 1 - Create a reusable GitHub Action</h3>
	<p>
		In your project add a YAML file at <code>.guthub/workflows</code> called
		<code>changed-sveltekit-paths.yml</code>. This will be our reusable action that we can call form
		any other workflow.
	</p>
	<p>Add the following code to <code>changed-sveltekit-paths.yml</code>:</p>
	<SyntaxHighlighting language="yaml">
		{`name: Changed SvelteKit paths

on:
	workflow_call:
		outputs:
			pathsChanged:
				description: 'The changed paths'
				value: $\{{ jobs.changed-paths-job.outputs.output1 }}

jobs:
	changed-paths-job:
		name: Changed paths
		runs-on: ubuntu-latest
		outputs:
			output1: $\{{ steps.changed-paths.outputs.pathsChanged }}
		steps:
			- uses: actions/checkout@v3
				with:
					fetch-depth: 0
			- uses: actions/setup-node@v3
				with:
					node-version: 18
					cache: 'npm'
			- name: Get changed files
				id: changed-files
				uses: tj-actions/changed-files@v35
				with:
					json: true
			- name: List all changed paths
				id: changed-paths
				uses: actions/github-script@v6
				with:
					script: |
						const { default: getChangedPagePaths } = await import('$\{{ github.workspace }}/.github/scripts/detect-changed-sveltekit-paths.js')
						const pathsChanged = await getChangedPagePaths(
							'$\{{ github.workspace }}',
							JSON.parse("$\{{ steps.changed-files.outputs.all_changed_files }}")
						);
						console.log('Changed paths');
						pathsChanged.forEach(path => {
							console.log('Paths changed:', path);
						});
						core.setOutput("pathsChanged", pathsChanged.map(path => path + '.html').join('\\n'));
	
`}
	</SyntaxHighlighting>
	<p>
		The most up to date version of this file can be found at
		<a
			href="https://github.com/shadovo/svelper/blob/main/.github/workflows/changed-sveltekit-paths.yml"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../changed-sveltekit-paths.yml</a
		>
	</p>
</section>
<section>
	<h3>Step 2 - Add the script file.</h3>
	<p>In addition to the file we created above we will also add the script that it will use.</p>
	<p>
		In your project add a file at <code>.guthub/scripts</code> called
		<code>detect-changed-sveltekit-paths.js</code>.
	</p>
	<p>
		Add the following code to <code>detect-changed-sveltekit-paths.js</code>:
	</p>
	<SyntaxHighlighting language="javascript">
		{`import path from 'path';
import fs from 'fs';

const MATCH_IMPORTS = /import\\s+(?:[\\w*\\s{},]+\\s+from\\s+?|)["']((?:\\$lib\\/|\\.+\\/).*?)["']/g;

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
	return path
		.dirname(pagePath)
		.replace('src/routes', '')
		.replace(/\\/\\(.*\\)/g, '');
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
			if (dep.match(/^\\.+\\//)) {
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
	return [...changedPaths].map((page) => getPathOfPage(page));
}
`}
	</SyntaxHighlighting>
	<p>
		The most up to date version of this file can be found at
		<a
			href="https://github.com/shadovo/svelper/blob/main/.github/scripts/detect-changed-sveltekit-paths.js"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../detect-changed-sveltekit-paths.js</a
		>
	</p>
</section>
<section>
	<h3>Step 3 - Use the list of changed paths!</h3>
	<p>Now you have everything you need to get a list of paths affected by the changes in your PR.</p>
	<p>Some examples of what you can use it for:</p>
	<ul class="list">
		<li>Post links to those pages as a PR comment.</li>
		<li>
			You can also use it to run tests on only the affected pages. This can be useful if you have a
			large application with many pages and you want to run tests on only the pages that have
			changed.
		</li>
		<li>
			Run Lighthoiuse on only the affected pages to make sure you haven't introduced any performance
			or accessability regressions.
		</li>
	</ul>
	<h4>Example of a workflow posting a comment to the PR.</h4>
	<SyntaxHighlighting language="yaml">
		{`name: Post changed URLs

on:
	pull_request:
		branches: ['main']
	
jobs:
	changed-paths:
		name: Changed URLs
		uses: ./.github/workflows/changed-sveltekit-paths.yml

	comment-changed-paths:
		name: Post comment with changed URLs
		runs-on: ubuntu-latest
		needs: changed-paths
		steps:
			- name: Format message
				id: format-message
				uses: actions/github-script@v6
				with:
					script: |
						const paths = \`$\{{ needs.changed-paths.outputs.pathsChanged }}\`.split('\\n');
						const message = [
							'# URLs updated',
							'URLs affected by changes in this PR',
							...paths.map(path => \`- http://localhost:5173$\{path}\`),
						].join('\\n');
						core.setOutput('message', message);
			- name: Comment changed URLs
				uses: mshick/add-pr-comment@v2
				with:
					message: |
						$\{{ steps.format-message.outputs.message }}
`}
	</SyntaxHighlighting>
	<p>
		You can of course change <code>http://localhost:5173</code> to point to your PR app domain/path if
		you prefere.
	</p>
	<p>
		Svelper uses the <code>changed-sveltekit-paths.yml</code> action both to post a comment in the
		PR and run Lighthouse on only the affected pages in the PR. Implementation can be found here
		<a
			href="https://github.com/shadovo/svelper/blob/main/.github/workflows/pr-verification.yml"
			target="_blank"
			rel="noopener noreferrer">github.com/shadovo/svelper/.../pr-verification.yml</a
		>
	</p>
</section>
