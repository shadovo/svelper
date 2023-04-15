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
				'uses-passive-event-listeners': 'off',
				'csp-xss': 'off',
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
