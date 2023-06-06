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
				'bf-cache': 'off',
				'color-contrast': 'off', // temporary disabled due to oklch color space issue
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
