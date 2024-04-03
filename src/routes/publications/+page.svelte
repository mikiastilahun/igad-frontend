<script>
	import Hero from '$lib/assets/publications/hero.jpg';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';

	import IGADLogo from '$lib/assets/igad-logo.png';
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
				class="w-full px-4 py-2 text-lg font-normal text-gray-800 bg-gray-300/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-10"
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
	<h2 class="text-2xl font-bold leading-normal">All Publications</h2>
	<div class="flex gap-8 p-4">
		<!-- filter -->
		<div class="max-w-[250px] w-full border border-black/5 p-6 grid gap-4 h-full">
			<h2 class="text-2xl font-bold">Filters</h2>

			<div class="flex flex-col gap-3">
				<h3 class="text-base font-bold">Publication Type</h3>
				<!-- list of check boxes -->

				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<input type="checkbox" id="report" name="report" class=" checked:bg-primary" />
						<label for="report" class="text-gray-500">Report</label>
					</div>
					<div class="flex items-center gap-2">
						<input type="checkbox" id="communique" name="communique " />
						<label for="communique" class="text-gray-500">Communique</label>
					</div>
					<div class="flex items-center gap-2">
						<input type="checkbox" id="Lorem" name="Lorem " />
						<label for="Lorem" class="text-gray-500">Lorem</label>
					</div>
					<div class="flex items-center gap-2">
						<input type="checkbox" id="Lorem" name="Lorem " />
						<label for="Lorem" class="text-gray-500">Lorem</label>
					</div>
					<div class="flex items-center gap-2">
						<input type="checkbox" id="Lorem" name="Lorem " />
						<label for="Lorem" class="text-gray-500">Lorem</label>
					</div>
				</div>
			</div>
			<!-- publication year check boxes -->
			<div class="flex flex-col gap-3">
				<h3 class="text-base font-bold">Publication Year</h3>
				<!-- Year dropdown -->
				<select
					class="w-full px-4 py-2 text-lg font-normal text-gray-800 bg-gray-300/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
				>
					<option value="2021">2021</option>
					<option value="2020">2020</option>
					<option value="2019">2019</option>
					<option value="2018">2018</option>
					<option value="2017">2017</option>
				</select>
			</div>
		</div>
		<!-- list of cards with pagination -->
		<div class="grid gap-5">
			{#each Array(4) as _}
				<!-- cards -->
				<div class="flex flex-row gap-5 rounded-lg">
					<div class="w-[245px] h-[150px] flex-none rounded-lg">
						<img
							width="245px"
							height="150px"
							class=" flex-1 h-full object-contain bg-primary rounded-lg"
							src={IGADLogo}
							alt="Card "
						/>
					</div>

					<div class=" flex flex-col gap-[2px] flex-grow">
						<div class="flex gap-6 items-center">
							<span class="text-sm text-zinc-500">03 June 2023</span>
							<div
								class=" h-3.5 px-2 bg-zinc-700 rounded-[100px] justify-start items-center gap-2.5 inline-flex"
							>
								<div class="text-white text-[10px] font-normal font-['Open Sans']">Report</div>
							</div>
						</div>
						<h2 class="text-lg leading-6 font-bold">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</h2>
						<p class=" text-zinc-500 text-sm">
							The eight countries under the Intergovernmental Authority on Development (IGAD) of
							Eastern Africa considered countries in the African continent that are vulnerable to
							climate change and Extreme events(IPCC, 2018). Change and variability in extreme
							rainfall The eight countries under the Intergovernmental Authority on Development
							(IGAD) of Eastern Africa considered countries.
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
