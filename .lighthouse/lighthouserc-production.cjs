module.exports = {
	ci: {
		collect: {
			url: [
				'https://www.svelper.com',
				'https://www.svelper.com/code/github-actions/gh-pages?theme=light',
				'https://www.svelper.com/code/github-actions/gh-pages?theme=dark',
				'https://www.svelper.com/code/components/pagination',
				'https://www.svelper.com/games/minesweeper',
				'https://www.svelper.com/embeds/v1/minesweeper',
			],
			numberOfRuns: 3,
		},
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'uses-passive-event-listeners': 'off',
				'csp-xss': 'off',
				'bf-cache': 'off',
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
