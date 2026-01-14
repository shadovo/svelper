<script>
	import Article from '$lib/components/Article.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>Affected SvelteKit paths in PR with GitHub action - Svelper</title>
	<meta
		name="description"
		content="Using GitHub actions to find all paths in SvelteKit affected by changes in a PR - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<Article title="Affected SvelteKit paths in PR">
	<section>
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
			Not only does it check if the pages or layouts themselves have changed, it also checks if any
			of the imported files have changed. (Exception being updated dependencies for now.)
		</p>
	</section>
	<section>
		<h3>Step 1 - Create the reusable workflow</h3>
		<p>
			In your project add a YAML file at <code>.github/workflows</code> called
			<code>comment-changed-sveltekit-urls.yml</code>. This is a reusable action that takes
			<code>review_url</code> and <code>prod_url</code> as inputs and handles everything from finding
			changed files to posting a comment on the PR.
		</p>
		<p>Add the following code to <code>comment-changed-sveltekit-urls.yml</code>:</p>
		<SyntaxHighlighting language="yaml">
			{`name: Comment Changed SvelteKit URLs

on:
	workflow_call:
		inputs:
			review_url:
				description: 'Base URL for the review/preview environment'
				required: true
				type: string
			prod_url:
				description: 'Base URL for the production environment'
				required: true
				type: string
			pr_number:
				description: 'The PR number to comment on (optional - auto-detected from commit_sha if not provided)'
				required: false
				type: number
				default: 0
			commit_sha:
				description: 'Commit SHA to find the associated PR (used when pr_number is not provided)'
				required: false
				type: string
				default: ''

jobs:
	comment-changed-urls:
		name: Comment changed URLs
		permissions:
			contents: read
			pull-requests: write
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v6
				with:
					fetch-depth: 0
			- uses: actions/setup-node@v6
				with:
					node-version: 24
					cache: 'npm'
			- name: Detect and comment changed URLs
				uses: actions/github-script@v7
				env:
					REVIEW_URL: $\{{ inputs.review_url }}
					PROD_URL: $\{{ inputs.prod_url }}
					PR_NUMBER: $\{{ inputs.pr_number }}
					COMMIT_SHA: $\{{ inputs.commit_sha }}
				with:
					script: |
						const reviewUrl = process.env.REVIEW_URL;
						const prodUrl = process.env.PROD_URL;
						let prNumber = parseInt(process.env.PR_NUMBER, 10) || 0;
						const commitSha = process.env.COMMIT_SHA;

						// If no PR number provided, try to detect from commit SHA
						if (!prNumber && commitSha) {
							const prs = await github.rest.repos.listPullRequestsAssociatedWithCommit({
								owner: context.repo.owner,
								repo: context.repo.repo,
								commit_sha: commitSha
							});
							if (prs.data.length > 0) {
								const openPr = prs.data.find(pr => pr.state === 'open') || prs.data[0];
								prNumber = openPr.number;
							}
						}

						if (!prNumber) {
							core.setFailed('Could not determine PR number. Please provide pr_number or commit_sha input.');
							return;
						}
						
						// Get changed files from the PR
						const files = await github.paginate(
							github.rest.pulls.listFiles,
							{
								owner: context.repo.owner,
								repo: context.repo.repo,
								pull_number: prNumber,
								per_page: 100
							}
						);
						const changedFiles = files.map(file => file.filename);
						
						// Import the detection script
						const { default: getChangedPagePaths } = await import(
							'$\{{ github.workspace }}/.github/scripts/detect-changed-sveltekit-paths.js'
						);
						const paths = await getChangedPagePaths('$\{{ github.workspace }}', changedFiles);
						
						// Format comment message
						let message;
						if (paths.length === 0) {
							message = '# URLs changed in this PR\\n\\nNo pages were affected by the changes in this PR.';
						} else {
							const rows = paths.map(p => 
								\`| [$\{p}]($\{reviewUrl}$\{p}) | [pro]($\{prodUrl}$\{p}) |\`
							);
							message = [
								'# URLs changed in this PR',
								'',
								'| Review | Production |',
								'| --- | --- |',
								...rows,
							].join('\\n');
						}
						
						// Find existing comment to update (if any)
						const comments = await github.rest.issues.listComments({
							owner: context.repo.owner,
							repo: context.repo.repo,
							issue_number: prNumber,
						});
						const botComment = comments.data.find(c => 
							c.user.type === 'Bot' && c.body.includes('# URLs changed in this PR')
						);
						
						if (botComment) {
							await github.rest.issues.updateComment({
								owner: context.repo.owner,
								repo: context.repo.repo,
								comment_id: botComment.id,
								body: message
							});
						} else {
							await github.rest.issues.createComment({
								owner: context.repo.owner,
								repo: context.repo.repo,
								issue_number: prNumber,
								body: message
							});
						}
`}
		</SyntaxHighlighting>
		<p>
			The most up to date version of this file can be found at
			<a
				href="https://github.com/shadovo/svelper/blob/main/.github/workflows/comment-changed-sveltekit-urls.yml"
				target="_blank"
				rel="noopener noreferrer"
				>github.com/shadovo/svelper/.../comment-changed-sveltekit-urls.yml</a
			>
		</p>
	</section>
	<section>
		<h3>Step 2 - Add the script file.</h3>
		<p>In addition to the file we created above we will also add the script that it will use.</p>
		<p>
			In your project add a file at <code>.github/scripts</code> called
			<code>detect-changed-sveltekit-paths.js</code>.
		</p>
		<p>
			Add the following code to <code>detect-changed-sveltekit-paths.js</code>:
		</p>
		<SyntaxHighlighting language="javascript">
			{`import path from 'path';
import fs from 'fs';

// Note: Only detects imports from $lib/ or relative paths (./ ../)
// Changes to npm packages won't be detected
const MATCH_IMPORTS = /import\\s+(?:[\\w*\\s{},]+\\s+from\\s+?|)["']((?:\\$lib\\/|\\.+\\/).*?)["']/g;

const PAGE_FILES = ['+page.svelte', '+page.js', '+page.ts'];
const LAYOUT_FILES = ['+layout.svelte', '+layout.js', '+layout.ts'];

function findFiles(sveltekitProjectPath, dir, ending) {
	const files = fs.readdirSync(path.join(sveltekitProjectPath, dir));
	let matchingFiles = [];
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(path.join(sveltekitProjectPath, filePath));
		if (stat.isDirectory()) {
			matchingFiles = matchingFiles.concat(findFiles(sveltekitProjectPath, filePath, ending));
		} else if (file.endsWith(ending)) {
			matchingFiles.push(filePath);
		}
	}
	return matchingFiles;
}

function getPathOfPage(pagePath) {
	return path.dirname(pagePath)
		.replace('src/routes', '')
		.replace(/\\/\\(.*\\)/g, '');
}

function fileContainsChangedDependencies(sveltekitProjectPath, filePath, changedFiles, visited = new Set()) {
	if (visited.has(filePath)) return false;
	visited.add(filePath);

	const fullPath = path.join(sveltekitProjectPath, filePath);
	let fileContent;
	try {
		fileContent = fs.readFileSync(fullPath, 'utf-8');
	} catch {
		return false;
	}

	const importRegex = new RegExp(MATCH_IMPORTS.source, MATCH_IMPORTS.flags);
	let match;
	const deps = [];
	while ((match = importRegex.exec(fileContent))) {
		deps.push(match[1]);
	}

	const normalizedDeps = deps.map(dep => {
		if (dep.match(/^\\.+\\//)) {
			return path.join(path.dirname(filePath), dep);
		}
		return dep.replace('$lib', 'src/lib');
	}).map(depPath => {
		if (path.extname(depPath) === '') {
			const fullDep = path.join(sveltekitProjectPath, depPath);
			if (fs.existsSync(fullDep + '.svelte')) return depPath + '.svelte';
			if (fs.existsSync(fullDep + '.ts')) return depPath + '.ts';
			if (fs.existsSync(fullDep + '.js')) return depPath + '.js';
		}
		return depPath;
	});

	if (normalizedDeps.some(p => changedFiles.includes(p))) return true;
	return normalizedDeps.some(dep => 
		fileContainsChangedDependencies(sveltekitProjectPath, dep, changedFiles, visited)
	);
}

export default function getChangedPagePaths(sveltekitProjectPath, changedFiles) {
	const allPages = findFiles(sveltekitProjectPath, 'src/routes', '+page.svelte');
	const changedPages = changedFiles.filter(f => PAGE_FILES.some(pf => f.endsWith(pf)));
	const changedLayoutPages = changedFiles
		.filter(f => LAYOUT_FILES.some(lf => f.endsWith(lf)))
		.map(f => LAYOUT_FILES.reduce((r, lf) => r.replace(lf, ''), f))
		.flatMap(p => allPages.filter(page => page.startsWith(p)));
	const pagesWithChangedDeps = allPages.filter(page => 
		fileContainsChangedDependencies(sveltekitProjectPath, page, changedFiles)
	);
	const changedPaths = new Set([...changedPages, ...changedLayoutPages, ...pagesWithChangedDeps]);
	return [...changedPaths].map(getPathOfPage).sort();
}
`}
		</SyntaxHighlighting>
		<p>
			The most up to date version of this file can be found at
			<a
				href="https://github.com/shadovo/svelper/blob/main/.github/scripts/detect-changed-sveltekit-paths.js"
				target="_blank"
				rel="noopener noreferrer"
				>github.com/shadovo/svelper/.../detect-changed-sveltekit-paths.js</a
			>
		</p>
	</section>
	<section>
		<h3>Step 3 - Use the reusable workflow</h3>
		<p>Now you can call the workflow from anywhere! Here are some examples:</p>
		<h4>Example 1: Trigger from a PR workflow</h4>
		<SyntaxHighlighting language="yaml">
			{`name: PR Comment
on:
	pull_request:
		branches: ['main']

jobs:
	comment-urls:
		uses: ./.github/workflows/comment-changed-sveltekit-urls.yml
		with:
			review_url: 'https://my-preview-app.vercel.app'
			prod_url: 'https://mysite.com'
`}
		</SyntaxHighlighting>
		<h4>Example 2: Trigger from deployment status (Vercel)</h4>
		<SyntaxHighlighting language="yaml">
			{`name: Comment on Deploy
on:
	deployment_status:

jobs:
	comment-urls:
		if: github.event.deployment_status.state == 'success'
		uses: ./.github/workflows/comment-changed-sveltekit-urls.yml
		with:
			review_url: $\{{ github.event.deployment_status.environment_url }}
			prod_url: 'https://mysite.com'
			commit_sha: $\{{ github.event.deployment.sha }}
`}
		</SyntaxHighlighting>
		<p>
			The workflow detects the PR number from the <code>commit_sha</code> when triggered from
			deployment events. You can also pass <code>pr_number</code> explicitly if preferred.
		</p>
		<p>
			When a comment already exists from a previous run, it will be updated instead of creating a
			new one, keeping the PR thread clean.
		</p>
		<p>
			Svelper uses this workflow to post a comment with Review and Production links when Vercel
			deploys a PR. See the implementation at
			<a
				href="https://github.com/shadovo/svelper/blob/main/.github/workflows/comment-changed-urls.yml"
				target="_blank"
				rel="noopener noreferrer">github.com/shadovo/svelper/.../comment-changed-urls.yml</a
			>
		</p>
	</section>
</Article>
