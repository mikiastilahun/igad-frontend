<script>
	import Hero from '$lib/assets/publications/hero.jpg';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';
</script>

<div class="p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={Hero}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">Reports and Publications</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</section>
</div>

<!-- Featured -->
<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-8">
	<h2 class="text-2xl font-bold leading-normal">Featured</h2>
	<div class="grid grid-cols-4 gap-4">
		<!-- cards -->
		<Card />
		<Card />
		<Card />
		<Card />
	</div>
</section>

<!-- Full width search bar -->
<section class=" py-10">
	<div class="max-w-[1136px] mx-auto">
		<div class="relative flex items-center justify-center">
			<input
				type="text"
				class="w-full px-4 py-2 text-lg font-normal text-gray-800 bg-gray-300/50 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-10"
				placeholder="Search for publications"
			/>
			<button class="absolute right-0 px-4 py-2 text-white rounded-r-md">
				<Search class="w-6 h-6" />
			</button>
		</div>
	</div>
</section>

<!-- All Publications -->
<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-8">
	<!-- Pagination -->
</section>
