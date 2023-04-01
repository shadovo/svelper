module.exports = {
	ci: {
		collect: {
			staticDistDir: './build',
			numberOfRuns: 1,
			// URLS are added in .github/workflows/pr-verification.yml
			// {{urls placeholder}}
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'uses-passive-event-listeners': 'warn',
				'csp-xss': 'warn',
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
