const config = {
	ci: {
		collect: {
			url: [
				'https://www.svelper.com',
				'https://www.svelper.com/copy-paste/gh-pages?theme=light',
				'https://www.svelper.com/copy-paste/gh-pages?theme=dark',
				'https://www.svelper.com/components/pagination',
				'https://www.svelper.com/games/minesweeper',
				'https://www.svelper.com/embeds/v1/minesweeper',
			],
			numberOfRuns: 3,
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

export default config;
