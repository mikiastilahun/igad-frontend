<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import IGADLogo from '$lib/assets/igad-logo.png';
	import { slide } from 'svelte/transition';
	import { quadOut, quartIn } from 'svelte/easing';
	import CaretDown from '$lib/assets/icons/caret-down.svg.svelte';
	import { goto } from '$app/navigation';

	export let data;

	const projects = data.projects.data;

	let activeIndex = -1;
	let isOpen = false;
</script>

<svelte:head>
	<title>IGAD - Projects</title>
	<meta
		name="description"
		content={`Explore IGAD projects and learn about their background, objectives, key outcomes, and major activities and achievements.`}
	/>
</svelte:head>

<section class="mx-auto mt-10 max-w-[1136px] px-4 py-[112px]">
	<h2 class="text-2xl font-bold">Our Projects</h2>
	<p class="prose max-w-full">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quis dolor sapiente doloribus
		recusandae ut neque, repellat accusamus voluptatum ipsa incidunt saepe aliquam error dolore
		laudantium aliquid magnam alias quaerat!
	</p>
	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
		{#each projects as project, index}
			{@const coverImage = project?.attributes?.cover_image.data?.attributes.url}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				on:click|stopPropagation={() => {
					goto(`/projects/${project.id}`);
				}}
				class="relative mx-auto flex h-96 w-full flex-col gap-4 place-self-start overflow-hidden rounded-lg bg-white shadow transition-all hover:cursor-pointer hover:shadow-md md:gap-5 lg:flex-row"
			>
				<img
					class="{coverImage
						? 'object-cover'
						: 'object-contain'} aspect-video h-full w-full flex-1 rounded-lg rounded-b-none bg-secondary-500 md:rounded-b-lg"
					src={`${coverImage ? `${PUBLIC_STATIC_URL}${coverImage}` : IGADLogo}`}
					alt="Card "
				/>
				<div
					class="absolute bottom-0 flex w-full transform-gpu flex-col items-center justify-between gap-2 bg-white/70 p-4 text-sm text-stone-800 backdrop-blur-[8px]"
				>
					<div class="flex h-full flex-1 flex-col justify-center gap-4">
						<div class="flex gap-2">
							<h2 class="text-sm font-bold text-primary-500 sm:text-base">
								{project.attributes.name}
							</h2>
							<button
								class="duration group self-start rounded-full transition-all hover:cursor-pointer hover:bg-secondary-100 hover:bg-opacity-90 hover:shadow-md"
								on:click|stopPropagation={() => {
									activeIndex = index;
									isOpen = !isOpen;
								}}
							>
								{#if activeIndex === index && isOpen}
									<CaretDown
										class="h-8 w-8   fill-primary-500 transition-all group-hover:fill-gray-600"
									/>
								{:else}
									<CaretDown
										class="h-8 w-8 rotate-180  fill-primary-500 transition-all group-hover:fill-gray-600"
									/>
								{/if}
							</button>
						</div>
						{#if activeIndex === index && isOpen}
							<div
								in:slide={{
									axis: 'y',
									duration: 300,
									easing: quadOut
								}}
								out:slide={{
									axis: 'y',
									duration: 300,
									easing: quartIn
								}}
								class=" flex flex-col gap-2"
							>
								<p class="">
									<span
										class="inline-flex items-center gap-2 text-nowrap align-middle font-medium text-primary"
									>
										<span class="rounded-md bg-white p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="feather feather-briefcase"
												><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path
													d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
												></path></svg
											>
										</span>
										Implemented by:
									</span>
									<span class="ml-2 align-middle"
										>{project.attributes.implementing_organization}</span
									>
								</p>
								<p class="">
									<span
										class="inline-flex items-center gap-2 align-middle font-medium text-primary"
									>
										<span class="rounded-md bg-white p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="feather feather-globe"
												><circle cx="12" cy="12" r="10"></circle><line
													x1="2"
													y1="12"
													x2="22"
													y2="12"
												></line><path
													d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
												></path></svg
											>
										</span>
										Region:
									</span>
									<span class="ml-2 align-middle">{project.attributes.region}</span>
								</p>
								<p class="">
									<span
										class=" inline-flex items-center gap-2 align-middle font-medium text-primary"
										><span class="rounded-md bg-white p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-bank"
												viewBox="0 0 16 16"
											>
												<path
													d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"
												/>
											</svg>
										</span>
										Funded by:
									</span>
									<span class="ml-2 align-middle">{project.attributes.funding_organization}</span>
								</p>
								<p class="">
									<span class="inline-flex items-center gap-2 align-middle font-medium text-primary"
										><span class="rounded-md bg-white p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-cash-stack"
												viewBox="0 0 16 16"
											>
												<path
													d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
												/>
												<path
													d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"
												/>
											</svg>
										</span>
										Budget:
									</span>
									<span class="ml-2 align-middle">{project.attributes.budget.toLocaleString()}</span
									>
								</p>
								<p class="">
									<span class="inline-flex items-center gap-2 align-middle font-medium text-primary"
										><span class="rounded-md bg-white p-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												class="bi bi-calendar-week"
												viewBox="0 0 16 16"
											>
												<path
													d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
												/>
												<path
													d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
												/>
											</svg>
										</span>
										Duration:
									</span>
									<span class="align-middle"
										>{project.attributes.duration.from.split('-')[0]} to {project.attributes.duration.to.split(
											'-'
										)[0]}</span
									>
								</p>
							</div>
						{/if}
					</div>
				</div>

				<div
					class="absolute right-4 top-4 flex w-fit flex-col items-start justify-between gap-2 md:flex-row"
				>
					{#if project.attributes?.files.data?.attributes.url}
						<a
							href={`${PUBLIC_STATIC_URL}${project.attributes?.files.data?.attributes.url}`}
							target="_blank"
							class=" inline-block w-full rounded bg-primary px-4 py-2 text-center text-sm text-white drop-shadow-lg md:text-base"
							>Download PDF</a
						>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div class="text-center">
		<button class="mt-8 font-semibold text-primary">Load More</button>
	</div>
</section>
