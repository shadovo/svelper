<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	// import cookiesHeroImage from '$img/cookies/cookies.jpg?w=2064;1376;1194;796;688;398&imagetools';
	import cookiesHeroImage from '$img/cookies/cookies.png?w=2064;1376;1194;796;688;398&imagetools';
</script>

<svelte:head>
	<title>Not so svelte cookies – the Svelte helper</title>
	<meta
		name="description"
		content="Cookie information – A collection fun stuff built with Svelte, useful libraries, frameworks and copy/paste utils."
	/>
</svelte:head>

<Article title="Cookies!" image={cookiesHeroImage} imageColor="#0f111c">
	<section>
		<p>
			I am affraid I will have to disapoint you, this site does not use any cookie, tracking or any
			other form of collecting and storing user data. Hopefully I can make it up to you by providing
			you with my personal chocolate chip cookie recipe.
		</p>
	</section>
	<section>
		<h3>Chocolate chip cookie recipe</h3>
		<p>
			This is my personal cookie recipe, it is the outcome of a weekend project where I baked eight
			different chocolate chip recipes. This recipe combines the, according to me, best parts of all
			of them.
		</p>
	</section>
	<section>
		<h4>Ingredients (19 cookies)</h4>

		<h5>Step 1</h5>
		<ul class="list">
			<li>100 g Butter</li>
			<li>2 st Ice cubes</li>
		</ul>

		<h5>Step 2</h5>
		<ul class="list">
			<li>70 g Caster sugar</li>
			<li>70 g Light muscovado (or brown) sugar</li>
			<li>15 ml Syrup</li>
			<li>5 ml Vanilla sugar</li>
			<li>5 ml Instant sspresso powder</li>
		</ul>

		<h5>Step 3</h5>
		<ul class="list">
			<li>1 Egg (room temp.)</li>
		</ul>

		<h5>Step 4</h5>
		<ul class="list">
			<li>2.3 dl (~140 g) All-purpose flour</li>
			<li>1 ml Salt (If you used unsalted butter)</li>
			<li>1 ml Baking Soda</li>
			<li>1 ml Baking powder</li>
		</ul>

		<h5>Step 5</h5>
		<ul class="list">
			<li>140g Chocolate</li>
		</ul>

		<h5>Step 6</h5>
		<ul class="list">
			<li>Flake salt</li>
		</ul>
	</section>
	<section>
		<h4>Preparing the dough</h4>
		<p>
			The first step of making the cookies is to prepare the doug and letting it rest for 12 to 48
			hours before baking for the best result.
		</p>

		<h5>Step 1 – Browning the butter</h5>
		<p>
			Brown the butter while stirring until it has turned a deep brown color and smells like
			caramel. This takes about 5-7 minutes.
		</p>
		<p>
			Once the butter has the right color, pour it into another container and add 1 ice cube at a
			time and stir until the ice cube has melted. In the recipe above, approximately 2 ice cubes
			correspond to the amount of water that has evaporated when browning the butter. When you have
			added the 2 ice cubes, the total weight should be back to around 100g again.
		</p>
		<p>
			Put the browned butter in the fridge to cool until it has the consistency of room temperature
			butter.
		</p>

		<h5>Step 2 – Butter and sugar</h5>
		<p>
			Add the browned butter, granulated sugar, muscovado sugar, syrup and vanilla sugar in a bowl
			that can be used with an electric whisk.
		</p>
		<p>
			Whisk with an electric whisk until it becomes a light and airy batter that is a few shades
			lighter than when you started.
		</p>

		<h5>Step 3 – Add the egg</h5>
		<p>Add the egg to the butter-sugar batter and mix well.</p>
		<blockquote>
			If you have scaled up the recipe and have more than 1 egg, add the eggs one at a time and mix
			between each addition.
		</blockquote>

		<h5>Step 4 – Dry ingredients</h5>
		<p>Combine flour, salt, baking soda and baking powder in a separate bowl.</p>
		<p>Sift half of the flour mixture into the butter-sugar batter.</p>
		<p>Gently fold the flour into the batter until fully blended.</p>
		<p>Then sift in the remaining flour mixture and fold it in as well.</p>

		<h5>Step 5 – Chocolate</h5>
		<p>Chop the chocolate into approximately 1 cm x 1 cm pieces.</p>
		<p>Fold the chocolate into the cookie dough.</p>
		<p>Cover the bowl and refrigerate for 12-48 hours.</p>
	</section>
	<section>
		<h4>Baking the dough</h4>
		<p>After the unbearable wait of 12-48 hours, it is finally time to bake the cookies.</p>

		<h5>Step 6 – Baking</h5>
		<p>Preheat the oven to 175°C.</p>
		<p>Remove the cookie dough from the fridge and shape approximately 18 balls of dough.</p>
		<p>
			Place 4-6 balls, weighing 25-30 grams each, on a baking paper lined baking sheet, remembering
			that the cookies will spread somewhat.
		</p>
		<p>Bake the cookies in the lower part of the oven for 10 minutes.</p>
		<p>
			When the cookies have baked for a total of 10 minutes, take them out of the oven and
			immediately transfer the baking paper to a rack to cool.
		</p>
		<p>While the cookies are still warm, sprinkle some coarse sea salt on top of them.</p>
		<p>Let the cookies cool slightly before serving.</p>
	</section>
</Article>
