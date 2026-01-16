<script>
	import Article from '$lib/components/Article.svelte';
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>Vite-imagetools with SvelteKit - Svelper</title>
	<meta
		name="description"
		content="Learn how to use vite-imagetool in SvelteKit to optimize and manage images on your website. Our step-by-step guide will show you how to install, configure, and use this powerful tool to enhance your website's performance and user experience. - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<Article title="Using vite-imagetools with SvelteKit">
	<section>
		<p>
			When building a web application, you may often need to work with images. While images are a
			great way to add visual appeal to your website, they can also make it slower and less
			performant. This is especially true when dealing with large images, which can take a long time
			to load.
		</p>
		<p>
			Fortunately, there is a library called <a
				href="https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite"
				rel="noopener noreferrer"
				target="_blank">vite-imagetools</a
			>
			that can help you optimize your images and make them load faster. In this tutorial, we'll show you
			how to use
			<code>vite-imagetools</code> in a SvelteKit project to improve your website's performance.
		</p>
	</section>
	<section>
		<h3>Install vite-imagetools</h3>
		<p>
			The first step to using vite-imagetools in your SvelteKit project is to install it. You can do
			this by running the following command in your project's root directory:
		</p>
		<SyntaxHighlighting language="bash">
			{`$ npm install vite-imagetools --save-dev`}</SyntaxHighlighting
		>
		<p>
			This will install <code>vite-imagetools</code> as a development dependency in your project.
		</p>
		<p>
			Once <code>vite-imagetools</code> is installed, you can use it to optimize your images and
			make them load faster. In the next section, we'll show you how to configure
			<code>vite.config.js</code>
			to use <code>vite-imagetools</code>.
		</p>
	</section>
	<section>
		<h3>Updating <code>vite.config.js</code></h3>
		<p>
			Now that <code>vite-imagetools</code> is installed, we need to configure
			<code>vite.config.js</code>
			to use it. Here's an example of how to update <code>vite.config.js</code> to use
			<code>vite-imagetools</code>:
		</p>
		<SyntaxHighlighting language="javascript">
			{`import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

// Which image types should be converted
const supportedExtensions = ['png', 'jpg', 'jpeg'];

export default defineConfig(() => {
	const config = {
		plugins: [
			// Run imagetools before sveltekit
			imagetools({
				defaultDirectives: (url) => {
					const extension = url.pathname.substring(url.pathname.lastIndexOf('.') + 1);
					if (supportedExtensions.includes(extension)) {
						return new URLSearchParams({
							// In addition to the original format also generate a WebP version
							format: 'webp;' + extension,
							// picture: true means imagetools will generate data suited for the picture element 
							as: 'picture',
						});
					}
					return new URLSearchParams();
				},
			}),
			// Run sveltekit after imagetools
			sveltekit(),
		],
	};
	return config;
});`}
		</SyntaxHighlighting>
		<p>
			In this example, we're importing <code>imagetools</code> from <code>vite-imagetools</code> and
			using it as a plugin in the <code>plugins</code> array before the sveltekit plugin. We're also
			defining
			<code>supportedExtensions</code>, which is an array of image types that we want to convert
			using
			<code>vite-imagetools</code>.
		</p>
		<p>
			We're using <code>defaultDirectives</code> to generate a WebP version of the image in addition
			to the original format. We're also setting <code>picture: true</code> to generate data suited
			for the <picture> element. </picture>
		</p>
	</section>
	<section>
		<h3>Add the imagetools type in your <code>app.d.ts</code></h3>
		<p>
			To make TypeScript happy, we can follow
			<a
				href="https://github.com/JonasKruckenberg/imagetools/issues/160#issuecomment-1009292026"
				rel="noopener noreferrer"
				target="_blank">benblazaks workaround</a
			>. We need to add a type definition for <code>vite-imagetools</code>. We can do this by
			creating a <code>app.d.ts</code> file in the root of our project and adding the following code:
		</p>
		<SyntaxHighlighting language="typescript">
			{`declare module '*&imagetools' {
  import { Picture } from 'vite-imagetools';
	/**
	 * actual types
	 * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
	 * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
	 */
	const out: Picture;
	export default out;
}`}
		</SyntaxHighlighting>
		<p>
			This code defines a TypeScript module declaration for <code>*&imagetools</code>. All we have
			to do is add <code>&imagetools</code> to the end of any image import path. This module
			declaration then tells the TypeScript compiler that <code>vite-imagetools</code> has a default
			export that is of an unknown type. We are essentially telling TypeScript to trust us that
			<code>vite-imagetools</code> will export a valid type that we can use later.
		</p>
		<p>
			With this type declaration in place, TypeScript will no longer complain about missing types
			when we use <code>vite-imagetools</code> in our project.
		</p>
	</section>
	<section>
		<h3>Create an Image component using the picture tag</h3>
		<p>
			Now that we have <code>vite-imagetools</code> installed and configured, we can create an
			<code>Image.svelte</code>
			component that uses the
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture"
				rel="noopener noreferrer"
				target="_blank">picture</a
			>
			tag to load our images. This component will uses
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset"
				rel="noopener noreferrer"
				target="_blank">srcset</a
			>
			to automatically use the
			<a
				href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp_image"
				rel="noopener noreferrer"
				target="_blank">WebP</a
			> versions of our images when the browser supports it, falling back to the original image format
			otherwise.
		</p>
		<p>Here's an example implementation of the <code>Image.svelte</code> component:</p>
		<h4>Script</h4>
		<SyntaxHighlighting language="typescript">
			{`import type { Picture } from 'vite-imagetools';

export let src: Picture;
export let alt: string;
export let aspectRatio: string;
export let sizes: string;
export let background = 'transparent';
export let loading: 'eager' | 'lazy' = 'eager';`}</SyntaxHighlighting
		>
		<h4>HTML</h4>
		<SyntaxHighlighting language="svelte">
			{`<picture style="width: 100%; aspect-ratio:{aspectRatio}; background-color: {background}">
	{#each Object.entries(src.sources) as [format, srcset]}
		<source {srcset} {sizes} type="image/{format}" />
	{/each}
	<img style="width: 100%; aspect-ratio:{aspectRatio}" src={src.img.src} {alt} {loading} />
</picture>`}
		</SyntaxHighlighting>
		<h4>CSS</h4>
		<SyntaxHighlighting language="css">
			{`picture {
	display: flex;
}
img {
	width: 100%;
}`}
		</SyntaxHighlighting>
		<p>
			This component defines an interface for an <code>Image</code> object that takes a
			<code>img</code>
			fallback source and an object of <code>sources</code> where each key is an image format and the
			value is an array of image sources for that format at different widths.
		</p>
		<p>
			Inside the <code>picture</code> tag, we loop over the <code>sources</code> object and create a
			source tag for each format, setting the <code>srcset</code> attribute to a comma-separated
			list of the different image sources for that format at different widths. The <code>type</code>
			attribute is set to the MIME type of the format.
		</p>
		<p>
			Finally, we add an <code>img</code> tag with the <code>fallback</code> source and any
			additional attributes like <code>alt</code>, <code>sizes</code>
			<code>aspectRatio</code>, <code>loading</code> and <code>sizes</code>.
		</p>
		<p>
			With this component in place, we can use it to load our images throughout our SvelteKit
			project.
		</p>
	</section>
	<section>
		<h3>Using the Image.svelte component</h3>
		<p>
			After setting up the Vite-imagetools library in your SvelteKit project, you can now use the
			<code>Image.svelte</code> component to display optimized images on your website.
		</p>
		<p>Here's an example of how to use the <code>Image.svelte</code> component:</p>
		<h4>Script</h4>
		<p>
			Import the <code>Image.svelte</code> component and your image file into your Svelte component or
			page:
		</p>
		<SyntaxHighlighting language="javascript">
			{`import Image from '$lib/components/Image.svelte';
import myCoolImage from '../images/my-cool-image.png?w=800;600;275&imagetools';

const imageSizes = \`
	(min-width: 1024px)	800px,
	(min-width: 740px)	600px,
	275px
\`;`}
		</SyntaxHighlighting>
		<p>
			In this example we're importing the image from the <code>images</code> directory and using the
			<code>imagetools</code> plugin to generate the different image sizes.
		</p>
		<p>
			In the import we add a query string with the <code>w</code> parameter to specify the different
			image widths we want to generate. Here you can specify a single width or a comma-separated
			list of widths. This example uses three different widths: <code>800px</code>,
			<code>600px</code>
			and
			<code>275px</code>
			in different viewports. However you could also specify double (and tripple) the width for high-density
			displays like retina screens. Thanks to the <code>srcset</code> attribute, the browser will automatically
			load the correct image for the screen density.
		</p>
		<p>
			We also add the <code>&imagetools</code> at the end of the import so that the import matches
			the module declaration we previously added to our <code>app.d.ts</code> file to get TypeScript to
			stop complaining.
		</p>
		<p>
			<code>imageSizes</code> is the set of sizes that the image can have based on the screen width.
			To read more about how srcset and sizes work, check out
			<a
				href="https://ericportis.com/posts/2014/srcset-sizes/#part-2"
				rel="noopener noreferrer"
				target="_blank">this post by Eric Portis</a
			>.
		</p>
		<h4>HTML</h4>
		<p>
			Add the <code>Image</code> component to your HTML and pass in the imported image and sizes:
		</p>
		<SyntaxHighlighting language="svelte">
			{`<div class="image-container">
  <Image src={myCoolImage} sizes={imageSizes} background="#202b3f" aspectRatio="16 / 9" alt="My cool image" />
</div>`}</SyntaxHighlighting
		>
		<p>
			In this example, the <code>src</code> prop is set to the imported <code>myCoolImage</code>,
			the
			<code>sizes</code>
			prop is set to <code>imageSizes</code>.
		</p>
		<p>
			The <code>background</code> prop could be set either to a neutral color or to the dominant
			color of the image. In this example, the color is set to <code>#202b3f</code>, which is the
			dominant color of the image.
		</p>
		<p>
			The <code>aspectRatio</code> prop is set to <code>16 / 9</code>, which is the aspect ratio of
			the image. This is used to set the
			<code>aspect-ratio</code> CSS property on the image container, which is used to reserve the height
			relative to the width of the image before it is loaded. This prevents the page from jumping around
			as the image loads.
		</p>
		<p>
			The <code>alt</code> prop is set to <code>My cool image</code>, which is the alt text for the
			image.
		</p>
		<h4>CSS</h4>
		<p>Style the container to limit the maximum size of the image:</p>
		<SyntaxHighlighting language="css">
			{`.image-container {
	width: 100%;
	max-width: 800px;
}
@media (min-width: 740px) {
	.image-container {
		width: 600px;
	}
}
@media (min-width: 1024px) {
	.image-container {
		width: 800px;
	}
}`}
		</SyntaxHighlighting>
		<p>
			In this example, the .image-container class limits the maximum width of the image to
			<code>800px</code> and adjusts the width based on the screen size.
		</p>
		<p>
			You can of course use any other CSS properties to style the image container, and make it
			responsive however you like. The important thing is that the <code>width</code> and
			<code>max-width</code>
			properties are set to the same value as the <code>sizes</code> prop on the <code>Image</code>.
		</p>
		<p>
			And that's it! You can now use the <code>Image.svelte</code> component to display optimized images
			in your SvelteKit project.
		</p>
	</section>
</Article>
