module.exports = {
	ci: {
		collect: { numberOfRuns: 3 },
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'uses-passive-event-listeners': 'off',
				'csp-xss': 'off',
				'bf-cache': 'off',
				'color-contrast': 'off', // temporary disabled due to oklch color space issue
				'is-crawlable': 'off', // vercel sets noindex for review apps
				'inspector-issues': 'off',
			},
		},
		// upload: {
		// 	target: 'temporary-public-storage',
		// },
	},
};
