<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';

	import IGADLogo from '$lib/assets/igad-logo.svg';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import dayjs from 'dayjs';
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import CaretDown from '$lib/assets/icons/caret-down.svg.svelte';
	import { slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	import { crossfade } from 'svelte/transition';
	const [send, receive] = crossfade({});

	export let data;

	let learningMaterials = data.data?.learningMaterial.data;

	const learningMaterialType = data.data?.learningMaterialType;

	let selectedMaterialType: string[] = [];
	const applyLearningMaterialType = async () => {
		console.log('searching');
		await fetch(
			`${PUBLIC_STATIC_URL}/api/learning-links?populate=*${
				selectedMaterialType.length > 0
					? selectedMaterialType.map(
							(type, i) => `&filters[learning_material_type][type][$in][${i}]=${type}&`
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
				learningMaterials = data.data;
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

<PageHeader
	imgSrc={Hero}
	title={'Learning Material Links'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
	vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
	aliquam. Sodales pulvinar facilisi donec facilisis`}
/>
<!-- All Materials -->
<section class=" mx-auto flex max-w-[1136px] flex-col gap-8 px-4 py-10">
	<h2 class="text-2xl font-bold leading-normal">All Materials</h2>
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
						<h3 class="text-base font-bold">Material Type</h3>
						<!-- list of check boxes -->

						<div class="flex flex-row flex-wrap gap-2 md:flex-col md:flex-nowrap">
							{#each learningMaterialType || [] as type}
								<div class="flex items-center gap-2">
									<input
										type="checkbox"
										id={type}
										name={type}
										on:change={async (e) => {
											console.log({ e });
											if (e.target?.checked) {
												selectedMaterialType.push(type);
											} else {
												selectedMaterialType = selectedMaterialType.filter((item) => item !== type);
											}
											await applyLearningMaterialType();
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
			{#each learningMaterials || [] as material}
				<a
					class="mx-auto flex w-full flex-col gap-4 place-self-start overflow-hidden rounded-lg bg-white p-4 shadow transition-all hover:cursor-pointer hover:shadow-md md:gap-5 md:p-6 lg:flex-row"
					href={material.attributes.URL}
				>
					<div class="h-[200px] w-full flex-none rounded-lg lg:h-[150px] lg:w-[245px]">
						<img
							height="150px"
							class="h-full w-full flex-1 rounded-lg rounded-b-none bg-primary object-cover md:rounded-b-lg"
							src={`${PUBLIC_STATIC_URL}${material.attributes.thumbnail.data.attributes.url}`}
							alt="Card "
						/>
					</div>

					<div class=" flex flex-grow flex-col gap-[2px]">
						<div class="flex items-center gap-6">
							<span class="text-sm text-zinc-500"
								>{dayjs(material.attributes.createdAt || '').format('DD MMMM YYYY')}</span
							>
							<div
								class=" inline-flex h-3.5 items-center justify-start gap-2.5 rounded-[100px] bg-zinc-700 px-2"
							>
								<div class="font-['Open Sans'] text-[10px] font-normal text-white">
									{material.attributes.learning_material_type.data?.attributes.type}
								</div>
							</div>
						</div>
						<h2 class="line-clamp-1 text-lg font-bold leading-6">
							{material.attributes.title}
						</h2>
						<p class=" line-clamp-5 text-sm text-zinc-500">
							{@html material.attributes.description}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
