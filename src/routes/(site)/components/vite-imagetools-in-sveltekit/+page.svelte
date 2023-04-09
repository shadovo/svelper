<script>
	import SyntaxHighlighting from '$lib/components/SyntaxHighlighting.svelte';
</script>

<svelte:head>
	<title>Vite-imagetools with SvelteKit - Svelper</title>
	<meta
		name="description"
		content="Learn how to use vite-imagetool in SvelteKit to optimize and manage images on your website. Our step-by-step guide will show you how to install, configure, and use this powerful tool to enhance your website's performance and user experience. - A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<section>
	<h2>Using vite-imagetools with SvelteKit</h2>
	<p>
		When building a web application, you may often need to work with images. While images are a
		great way to add visual appeal to your website, they can also make it slower and less
		performant. This is especially true when dealing with large images, which can take a long time
		to load.
	</p>
	<p>
		Fortunately, there is a library called <code>vite-imagetools</code> that can help you optimize
		your images and make them load faster. In this tutorial, we'll show you how to use
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
		Once <code>vite-imagetools</code> is installed, you can use it to optimize your images and make
		them load faster. In the next section, we'll show you how to configure
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
							// In addition to the original format also generate a webp version
							format: 'webp;' + extension,
							// picture: true means imagetools will generate data suited for the picture element 
							picture: true,
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
		<code>supportedExtensions</code>, which is an array of image types that we want to convert using
		<code>vite-imagetools</code>.
	</p>
	<p>
		We're using <code>defaultDirectives</code> to generate a WebP version of the image in addition
		to the original format. We're also setting <code>picture: true</code> to generate data suited
		for the <picture> element. </picture>
	</p>
</section>
<section>
	<!-- TODO: explian more about &imagetools -->
	<h3>Add the imagetools type in your <code>app.d.ts</code></h3>
	<p>
		To make TypeScript happy, we need to add a type definition for <code>vite-imagetools</code>. We
		can do this by creating a <code>app.d.ts</code> file in the root of our project and adding the following
		code:
	</p>
	<SyntaxHighlighting language="typescript">
		{`declare module '*&imagetools' {
  /**
   * actual types
   * - code https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
   * - docs https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
   */
  const out;
  export default out;
}`}
	</SyntaxHighlighting>
	<p>
		This code defines a TypeScript module declaration for <code>*&imagetools</code> that tells the
		TypeScript compiler that <code>vite-imagetools</code> has a default export that is of an unknown
		type. We are essentially telling TypeScript to trust us that <code>vite-imagetools</code> will export
		a valid type that we can use later.
	</p>
	<p>
		With this type declaration in place, TypeScript will no longer complain about missing types when
		we use <code>vite-imagetools</code> in our project.
	</p>
</section>
<section>
	<h3>Create an Image component using the picture tag</h3>
	<p>
		Now that we have <code>vite-imagetools</code> installed and configured, we can create an
		<code>Image.svelte</code>
		component that uses the <code>picture</code> tag to load our images. This component will
		automatically generate
		<code>webp</code> versions of our images when the browser supports it, falling back to the original
		image format otherwise.
	</p>
	<p>Here's an example implementation of the <code>Image.svelte</code> component:</p>
	<h4>Script</h4>
	<SyntaxHighlighting language="typescript">
		{`interface ImageSource {
	src: string;
	w: number;
}

interface ImageSources {
	[format: string]: ImageSource[];
}

interface Image {
	fallback: ImageSource;
	sources: ImageSources;
}

export let src: Image;
export let alt: string;
export let aspectRatio: string;
export let sizes: string;
export let background = 'transparent';
export let loading: 'eager' | 'lazy' = 'eager';`}</SyntaxHighlighting
	>
	<h4>HTML</h4>
	<SyntaxHighlighting language="svelte">
		{`<picture style="width: 100%; aspect-ratio:{aspectRatio}; background-color: {background}">
  {#each Object.entries(src.sources) as [format, images]}
    <source
      srcset={images.map((i) => \`$\{i.src} $\{i.w}w\`).join(', ')}
      type={'image/' + format}
      {sizes}
    />
  {/each}
  <img style="width: 100%; aspect-ratio:{aspectRatio}" src={src.fallback.src} {alt} {loading} />
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
	<!-- TODO: explain background -->
	<p>
		This component defines an interface for an <code>Image</code> object that takes a
		<code>fallback</code>
		image source and an object of <code>sources</code> where each key is an image format and the value
		is an array of image sources for that format at different widths.
	</p>
	<p>
		Inside the <code>picture</code> tag, we loop over the <code>sources</code> object and create a
		source tag for each format, setting the <code>srcset</code> attribute to a comma-separated list
		of the different image sources for that format at different widths. The <code>type</code> attribute
		is set to the MIME type of the format.
	</p>
	<p>
		Finally, we add an <code>img</code> tag with the <code>fallback</code> source and any additional
		attributes like <code>alt</code>,sizes
		<code>aspectRatio</code>, <code>loading</code> and <code>sizes</code>.
	</p>
	<p>
		With this component in place, we can use it to load our images throughout our SvelteKit project.
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
	<!-- TODO: explain the query params on the image import -->
	<!-- TODO: explain imageSizes and provide links -->
	<p>
		In this example, <code>myCoolImage</code> is the image file imported into the component, and imageSizes
		is the set of sizes that the image can have based on the screen width.
	</p>
	<h4>HTML</h4>
	<p>
		Add the <code>Image</code> component to your HTML and pass in the imported image and sizes:
	</p>
	<SyntaxHighlighting language="svelte">
		{`<div class="image-container">
  <Image src={myCoolImage} sizes={imageSizes} aspectRatio="16 / 9" alt="My cool image" />
</div>`}</SyntaxHighlighting
	>
	<!-- TODO: explain aspectRatio -->
	<p>
		In this example, the <code>src</code> prop is set to <code>myCoolImage</code>, the
		<code>sizes</code>
		prop is set to <code>imageSizes</code>, and the <code>aspectRatio</code> and <code>alt</code>16
		/ 9 props are set to <code>16 / 9</code> and <code>My cool image</code>, respectively.
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
		And that's it! You can now use the <code>Image.svelte</code> component to display optimized images
		in your SvelteKit project.
	</p>
</section>
