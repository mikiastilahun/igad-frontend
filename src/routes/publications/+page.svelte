<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import Select from 'svelte-select';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	import IGADLogo from '$lib/assets/igad-logo.svg';
	import { PUBLIC_STATIC_URL, PUBLIC_STRAPI_URL } from '$env/static/public';
	import dayjs from 'dayjs';
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import CaretDown from '$lib/assets/icons/caret-down.svg.svelte';
	import { slide } from 'svelte/transition';
	import { quintIn, linear, quadInOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	import { crossfade } from 'svelte/transition';
	const [send, receive] = crossfade({});

	export let data;

	const featuredPublications = data.data?.featuredPublications.data.map((item) => {
		return {
			id: item.id,
			title: item.attributes.title,
			content: item.attributes.mainContent || '',
			coverImage: item.attributes.coverImage,
			publicationDate: item.attributes.publicationDate,
			publication_type: item.attributes.publication_type
		};
	});

	let allPublications = data.data?.publications.data.map((item) => {
		return {
			id: item.id,
			title: item.attributes.title,
			content: item.attributes.mainContent || '',
			coverImage: item.attributes.coverImage,
			publicationDate: item.attributes.publicationDate,
			publication_type: item.attributes.publication_type
		};
	});

	const publicationTypes = data.data?.publicationTypes;

	let searchValue = '';
	const search = async () => {
		console.log('searching');
		await fetch(
			`${PUBLIC_STRAPI_URL}/api/publications?filters[title][$containsi]=${searchValue}&populate=*`,
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
						content: item.attributes.mainContent,
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
			`${PUBLIC_STRAPI_URL}/api/publications?populate=*${
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
						content: item.attributes.mainContent,
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
			`${PUBLIC_STRAPI_URL}/api/publications?filters[publicationDate][$between][0]=${startDate}3&filters[publicationDate][$between][1]=${endDate}&populate=*`,
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
						content: item.attributes.mainContent,
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

	let isMobileFilterOpen = true;

	let top: number[] = [];
	let bottom: number[] = [1];

	const move = (item: number, from: number[], to: number[]) => {
		to.push(1);
		return [from.filter((i) => i !== item), to];
	};

	const moveTop = () => {
		[bottom, top] = move(1, bottom, top);
	};
	const moveBottom = () => {
		[top, bottom] = move(1, top, bottom);
	};
</script>

<svelte:head>
	<title>IGAD-Publications</title>
	<meta name="description" content={`IGAD publications`} />
</svelte:head>

<PageHeader
	imgSrc={Hero}
	title={'Reports and Publications'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
	vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
	aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<!-- Featured -->
<section class="mx-auto flex max-w-[1136px] flex-col gap-8 px-4 py-10 sm:px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">Featured</h2>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
		<!-- cards -->
		{#each featuredPublications || [] as publication}
			<Card
				title={publication.title}
				description={publication.content}
				imageUrl={`${PUBLIC_STATIC_URL}${publication.coverImage?.data.attributes.url}`}
				link={`/publications/${publication.id}`}
				isRichtext={true}
			/>
		{/each}
	</div>
</section>

<!-- Full width search bar -->
<section class=" px-4 pt-10">
	<div class="mx-auto max-w-[1136px]">
		<form on:submit|preventDefault={search}>
			<div class="relative flex items-center justify-center">
				<input
					type="text"
					class="bg-white- w-full rounded-md border border-primary px-4 py-2 pr-10 text-lg font-normal text-gray-800 focus:border-secondary-500 focus:ring-secondary-500"
					placeholder="Search for publications"
					bind:value={searchValue}
				/>
				<button class="absolute right-0 rounded-r-md px-4 py-2 text-white" on:click={search}>
					<Search class="h-6 w-6" />
				</button>
			</div>
		</form>
	</div>
</section>

<!-- All Publications -->
<section class=" mx-auto flex max-w-[1136px] flex-col gap-8 px-4 py-10">
	<h2 class="text-2xl font-bold leading-normal">All Publications</h2>
	<div class="relative flex flex-col gap-8 p-4 md:flex-row">
		<!-- filter -->
		<div
			class="sticky top-0 grid h-full w-full gap-4 rounded-md bg-white/90 p-6 shadow backdrop-blur-lg md:max-w-[250px]"
		>
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-bold">Filters</h2>

				{#each top as top (top)}
					<div
						animate:flip
						in:receive={{ key: top }}
						out:send={{ key: top }}
						class=" flex w-full justify-end md:hidden"
					>
						<button
							on:click={() => {
								isMobileFilterOpen = !isMobileFilterOpen;
								moveBottom();
							}}
							class="group flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-primary-500"
						>
							<CaretDown
								class="h-10 w-10  fill-primary-500 transition-all group-hover:fill-gray-100"
							/>
						</button>
					</div>
				{/each}
			</div>

			{#if isMobileFilterOpen}
				<div
					transition:slide={{
						axis: 'y',
						duration: 300,
						easing: quadInOut
					}}
					class="flex flex-col gap-4"
				>
					<div class="flex flex-col gap-3">
						<h3 class="text-base font-bold">Publication Type</h3>
						<!-- list of check boxes -->

						<div class="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
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
										class="checked:!bg-primary focus:border-secondary-500 focus:ring-secondary-500"
									/>
									<label
										for={type}
										class="text-lg capitalize text-stone-500 hover:cursor-pointer hover:text-stone-700"
										>{type}</label
									>
								</div>
							{/each}
						</div>
					</div>
					<!-- publication year check boxes -->
					<div class="flex flex-col gap-3">
						<h3 class="bg-se text-base font-bold">Publication Year</h3>
						<!-- Year dropdown -->
						<Select
							--item-hover-bg="#e6f3ec"
							--item-is-active-bg="#00833F"
							--border-focused="2px solid #f4be49"
							--border-hover="1px solid #006932"
							--border="1px solid #00833F"
							showChevron={true}
							items={getListOfYears(2000)}
							bind:value={selectedYear}
							on:select={applyYear}
						/>
					</div>
				</div>
			{/if}

			{#each bottom as bottom (bottom)}
				<div
					animate:flip
					in:receive={{ key: bottom }}
					out:send={{ key: bottom }}
					class=" flex w-full justify-end md:hidden"
				>
					<button
						on:click={() => {
							isMobileFilterOpen = !isMobileFilterOpen;
							moveTop();
						}}
						class="group flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-primary-500"
					>
						<CaretDown
							class="h-10 w-10 rotate-180 fill-primary-500 transition-all group-hover:fill-gray-100"
						/>
					</button>
				</div>
			{/each}
		</div>
		<!-- list of cards with pagination -->
		<div class="grid gap-5">
			{#each allPublications || [] as publication}
				<!-- cards -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="mx-auto flex w-full flex-col gap-4 place-self-start overflow-hidden rounded-lg bg-white p-4 shadow transition-all hover:cursor-pointer hover:shadow-md md:gap-5 md:p-6 lg:flex-row"
					on:click={() => {
						goto(`/publications/${publication.id}`);
					}}
				>
					<div class="h-[200px] w-full flex-none rounded-lg lg:h-[150px] lg:w-[245px]">
						<img
							height="150px"
							class="h-full w-full flex-1 rounded-lg rounded-b-none bg-primary object-cover md:rounded-b-lg"
							src={`${PUBLIC_STATIC_URL}${publication?.coverImage.data.attributes.url}`}
							alt="Card "
						/>
					</div>

					<div class=" flex flex-grow flex-col gap-[2px]">
						<div class="flex items-center gap-6">
							<span class="text-sm text-zinc-500"
								>{dayjs(publication?.publicationDate).format('DD MMMM YYYY')}</span
							>
							<div
								class=" inline-flex h-3.5 items-center justify-start gap-2.5 rounded-[100px] bg-zinc-700 px-2"
							>
								<div class="font-['Open Sans'] text-[10px] font-normal text-white">
									{publication?.publication_type.data.attributes.type}
								</div>
							</div>
						</div>
						<h2 class="line-clamp-1 text-lg font-bold leading-6">
							{publication?.title}
						</h2>
						<p class=" line-clamp-5 text-sm text-zinc-500">
							{@html publication?.content}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
