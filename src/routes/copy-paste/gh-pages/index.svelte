<script>
	import SyntaxHighlight from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>GitHub page action with npm - Svelper</title>
	<meta
		name="description"
		content="Using npm and GitHub actions to build and deploy a static site to GitHub pages - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<section>
	<h2>Deploy npm build output to GitHub pages.</h2>
	<p>
		Using GitHub actions to deploy the result of <code>npm build</code> has never been simpler. Following
		these steps should have you up and running with a static page in no time!
	</p>
</section>
<section>
	<h3>Step 1 - Create a github action</h3>
	<p>
		In your project add a YAML file at <code>.guthub/workflows</code> lets call it
		<code>pages.yml</code>.
	</p>
</section>
<section>
	<h3>Step 2 - Add the config for the action</h3>
	<p>In your newly created pages.yml file add the following content:</p>
	<SyntaxHighlight language="yaml">
		{`# Workflow for building with npm and deploying artifact to GitHub Pages
name: Deploy site to GitHub Pages

on:
	# Runs on pushes targeting the default branch
	push:
		branches: ['main']

	# Allows you to run this workflow manually from the Actions tab
	workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
	contents: read
	pages: write
	id-token: write

# Allow one concurrent deployment
concurrency:
	group: 'pages'
	cancel-in-progress: true

# Default to bash
defaults:
	run:
		shell: bash

jobs:
	# Build job
	build:
		runs-on: ubuntu-latest
		steps:
			- name: Checkout
				uses: actions/checkout@v3
				with:
					submodules: recursive
			- name: Setup Pages
				id: pages
				uses: actions/configure-pages@v1
			- name: Build with npm run build
				run: |
					npm ci
					npm run build
			- name: Upload artifact
				uses: actions/upload-pages-artifact@v1
				with:
					path: ./build

	# Deployment job
	deploy:
		environment:
			name: github-pages
			url: \$\{\{ steps.deployment.outputs.page_url \}\}
		runs-on: ubuntu-latest
		needs: build
		steps:
			- name: Deploy to GitHub Pages
				id: deployment
				uses: actions/deploy-pages@v1
`}
	</SyntaxHighlight>
</section>
<section>
	<h3>Step 3 - Push your project to GitHub</h3>
	<p>Push your project to GitHub. This should automatically start the build process.</p>
</section>
