# Things I have learnt in this project

## Darkmode

### Darkmode css inside SVG

```xml
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 649 230">
  <style>
    path {fill: #0b828d;}
    @media (prefers-color-scheme: dark){path{fill: #39b2bd;}}
  </style>
  <path d="M.245.018a.259.259 0 0 1-.111-.022.162.162 0 0 1-.1-.153.166.166 0 0 1 .068-.137.127.127 0 0 1 .07-.021c.023 0 .043.006.059.017a.076.076 0 0 1 .03.049.122.122 0 0 0-.083.027.096.096 0 0 0-.031.075c0 .029.009.052.026.069.017.017.04.026.069.026A.12.12 0 0 0 .33-.087a.125.125 0 0 0 .034-.09.17.17 0 0 0-.026-.089.774.774 0 0 0-.078-.102.836.836 0 0 1-.081-.106.18.18 0 0 1-.028-.098c0-.035.01-.066.029-.094a.2.2 0 0 1 .08-.065.266.266 0 0 1 .115-.024c.054 0 .097.013.129.038a.12.12 0 0 1 .049.102.104.104 0 0 1-.021.068.068.068 0 0 1-.055.026.071.071 0 0 1-.061-.031.091.091 0 0 0 .03-.037.113.113 0 0 0 .011-.048.069.069 0 0 0-.019-.051.07.07 0 0 0-.052-.019.082.082 0 0 0-.065.028.107.107 0 0 0-.026.073c0 .027.008.051.023.074a.666.666 0 0 0 .072.089c.027.029.048.053.065.074a.35.35 0 0 1 .042.071.234.234 0 0 1 .017.088.2.2 0 0 1-.036.116.234.234 0 0 1-.096.082.31.31 0 0 1-.137.03Z" style="fill-rule:nonzero" transform="translate(-7.76 172.322) scale(228.242)"/>
 </svg>

```

### Darkmode in GitHub markdown

```markdown
![Fancy logo](./dark.png#gh-dark-mode-only)
![Fancy logo](./light.png#gh-light-mode-only)
```

### Darkmode in `<picture>`

```html
<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./dark.png" />
	<img
		alt="Text changing depending on mode. Light: 'So light!' Dark: 'So dark!'"
		src="./light.png"
	/>
</picture>
```

## css :has() selector

https://css-tricks.com/the-css-has-selector/

https://webkit.org/blog/13096/css-has-pseudo-class/

## css :is() selector

https://css-tricks.com/almanac/selectors/i/is/

## ress.css

https://github.com/filipelinhares/ress

## Open Props

https://open-props.style/

## prism

https://prismjs.com/

## Why tabs are bettern than spaces

https://twitter.com/rich_harris/status/1541761871585464323

## SvelteKit

https://kit.svelte.dev/

### Static adapter

https://github.com/sveltejs/kit/tree/master/packages/adapter-static

## Vite

https://vitejs.dev/

## Dialog element

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

## GutHub actions

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow

## GitHub pages SSL

https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

## GitHub Copilot

https://github.com/features/copilot

---

# Things I have learnt exists but not explored yet

## pnpm

https://pnpm.io/

## Playwright

https://playwright.dev/
