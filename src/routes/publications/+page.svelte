<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import Select from 'svelte-select';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	import IGADLogo from '$lib/assets/igad-logo.png';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import dayjs from 'dayjs';
	import { goto } from '$app/navigation';

	export let data;

	const featuredPublications = data.data?.featuredPublications.data.map((item) => {
		return {
			id: item.id,
			title: item.attributes.title,
			content: item.attributes.content,
			coverImage: item.attributes.coverImage,
			publicationDate: item.attributes.publicationDate,
			publication_type: item.attributes.publication_type
		};
	});

	let allPublications = data.data?.publications.data.map((item) => {
		return {
			id: item.id,
			title: item.attributes.title,
			content: item.attributes.content,
			coverImage: item.attributes.coverImage,
			publicationDate: item.attributes.publicationDate,
			publication_type: item.attributes.publication_type
		};
	});

	const publicationTypes = data.data?.publicationTypes;

	$: {
		console.log(data);
	}

	let searchValue = '';
	const search = async () => {
		console.log('searching');
		await fetch(
			`http://localhost:1337/api/publications?filters[title][$containsi]=${searchValue}&populate=*`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				allPublications = data.data.map((item) => {
					return {
						id: item.id,
						title: item.attributes.title,
						content: item.attributes.content,
						coverImage: item.attributes.coverImage,
						publicationDate: item.attributes.publicationDate,
						publication_type: item.attributes.publication_type
					};
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	let selectedPublicationTypes: string[] = [];
	const applyPublicationType = async () => {
		console.log('searching');
		await fetch(
			`http://localhost:1337/api/publications?populate=*${
				selectedPublicationTypes.length > 0
					? selectedPublicationTypes.map(
							(type, i) => `&filters[publication_type][type][$in][${i}]=${type}`
						)
					: ''
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				allPublications = data.data.map((item) => {
					return {
						id: item.id,
						title: item.attributes.title,
						content: item.attributes.content,
						coverImage: item.attributes.coverImage,
						publicationDate: item.attributes.publicationDate,
						publication_type: item.attributes.publication_type
					};
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	function getListOfYears(startYear: number = 2019) {
		const currentYear = dayjs().year(); // Get the current year
		const years = [];

		for (let year = startYear; year <= currentYear; year++) {
			years.push(year);
		}

		return years;
	}

	let selectedYear: { value: number } | null = null;
	let applyYear = async () => {
		const startDate = dayjs(`${selectedYear?.value}-01-01`).format('YYYY-MM-DD');
		const endDate = dayjs(`${selectedYear?.value}-12-31`).format('YYYY-MM-DD');

		console.log('searching', startDate, endDate);
		await fetch(
			`http://localhost:1337/api/publications?filters[publicationDate][$between][0]=${startDate}3&filters[publicationDate][$between][1]=${endDate}&populate=*`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				allPublications = data.data.map((item) => {
					return {
						id: item.id,
						title: item.attributes.title,
						content: item.attributes.content,
						coverImage: item.attributes.coverImage,
						publicationDate: item.attributes.publicationDate,
						publication_type: item.attributes.publication_type
					};
				});
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
</script>

<div class="md:p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={Hero}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
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
<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-8 px-4 sm:px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">Featured</h2>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
		<!-- cards -->
		{#each featuredPublications || [] as publication}
			<Card
				title={publication.title}
				description={publication.content.slice(0, 100) + '...'}
				imageUrl={`${PUBLIC_STATIC_URL}${publication.coverImage?.data.attributes.url}`}
				link={`/publications/${publication.id}`}
			/>
		{/each}
	</div>
</section>

<!-- Full width search bar -->
<section class=" py-10 px-4">
	<div class="max-w-[1136px] mx-auto">
		<form on:submit|preventDefault={search}>
			<div class="relative flex items-center justify-center">
				<input
					type="text"
					class="w-full px-4 py-2 text-lg font-normal text-gray-800 bg-gray-300/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-10"
					placeholder="Search for publications"
					bind:value={searchValue}
				/>
				<button class="absolute right-0 px-4 py-2 text-white rounded-r-md" on:click={search}>
					<Search class="w-6 h-6" />
				</button>
			</div>
		</form>
	</div>
</section>

<!-- All Publications -->
<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-8 px-4">
	<h2 class="text-2xl font-bold leading-normal">All Publications</h2>
	<div class="flex gap-8 p-4 flex-col md:flex-row">
		<!-- filter -->
		<div class=" w-full border border-black/5 p-6 grid gap-4 h-full">
			<h2 class="text-2xl font-bold">Filters</h2>

			<div class="flex flex-col gap-3">
				<h3 class="text-base font-bold">Publication Type</h3>
				<!-- list of check boxes -->

				<div class="flex flex-col gap-2">
					{#each publicationTypes || [] as type}
						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								id={type}
								name={type}
								on:change={async (e) => {
									console.log({ e });
									if (e.target?.checked) {
										selectedPublicationTypes.push(type);
									} else {
										selectedPublicationTypes = selectedPublicationTypes.filter(
											(item) => item !== type
										);
									}
									await applyPublicationType();
								}}
							/>
							<label for={type} class="text-gray-500">{type}</label>
						</div>
					{/each}

					<!-- <div class="flex items-center gap-2">
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
					</div> -->
				</div>
			</div>
			<!-- publication year check boxes -->
			<div class="flex flex-col gap-3">
				<h3 class="text-base font-bold">Publication Year</h3>
				<!-- Year dropdown -->
				<Select
					--item-hover-bg="#e6f3ec"
					--item-is-active-bg="#00833F"
					showChevron={true}
					items={getListOfYears(2000)}
					bind:value={selectedYear}
					on:select={applyYear}
				/>
			</div>
		</div>
		<!-- list of cards with pagination -->
		<div class="grid gap-5">
			{#each allPublications || [] as publication}
				<!-- cards -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="flex flex-col lg:flex-row gap-4 md:gap-5 rounded-lg hover:cursor-pointer hover:shadow-md shadow transition-all overflow-hidden w-full mx-auto bg-white p-4 md:p-6"
					on:click={() => {
						goto(`/publications/${publication.id}`);
					}}
				>
					<div class="w-full lg:w-[245px] h-[200px] lg:h-[150px] flex-none rounded-lg">
						<img
							height="150px"
							class="w-full flex-1 h-full object-contain bg-primary rounded-b-none rounded-lg md:rounded-b-lg"
							src={`${PUBLIC_STATIC_URL}${publication?.coverImage.data.attributes.url}`}
							alt="Card "
						/>
					</div>

					<div class=" flex flex-col gap-[2px] flex-grow">
						<div class="flex gap-6 items-center">
							<span class="text-sm text-zinc-500"
								>{dayjs(publication?.publicationDate).format('DD MMMM YYYY')}</span
							>
							<div
								class=" h-3.5 px-2 bg-zinc-700 rounded-[100px] justify-start items-center gap-2.5 inline-flex"
							>
								<div class="text-white text-[10px] font-normal font-['Open Sans']">
									{publication?.publication_type.data.attributes.type}
								</div>
							</div>
						</div>
						<h2 class="text-lg leading-6 font-bold line-clamp-1">
							{publication?.title}
						</h2>
						<p class=" text-zinc-500 text-sm line-clamp-5">
							{publication?.content}
						</p>
					</div>
				</div>
			{/each}

			<!-- <div class="justify-center items-center gap-1 md:gap-4 inline-flex pt-10">
				<button
					class=" px-4 py-2 bg-white rounded-lg border border-neutral-900 border-opacity-10 justify-center items-center gap-1 inline-flex"
				>
					<ChevronDown class=" fill-primary" />
				</button>
				{#each Array(5) as _, index}
					<button
						class="w-10 h-10 px-4 py-2 bg-white rounded-lg border border-neutral-900 border-opacity-10 justify-center items-center gap-1 inline-flex"
					>
						<span class="text-stone-500">{index + 1}</span>
					</button>
				{/each}
				<button
					class=" px-4 py-2 bg-white rounded-lg border border-neutral-900 border-opacity-10 justify-center items-center gap-1 inline-flex"
				>
					<ChevronDown class="rotate-180 fill-primary" />
				</button>
			</div> -->
		</div>
	</div>
</section>
