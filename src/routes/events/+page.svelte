<script lang="ts">
	import Hero from '$lib/assets/events/events-hero.jpg';
	import Location from '$lib/assets/location.svg';
	import Time from '$lib/assets/time.svg';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import IGADLogo from '$lib/assets/igad-logo.svg';
	import { InlineCalendar } from 'svelte-calendar';
	import { goto } from '$app/navigation';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';

	export let data;

	type eventType = {
		date: string;
		title: string;
		time: string;
		location: string;
		id: number;
		description: string;
	};

	let events: eventType[] =
		data.data?.eventData.data.map((event) => {
			return {
				date: event.attributes.date,
				description: event.attributes.description,
				time: new Date(event.attributes.date).toISOString().split('T')[1].slice(0, 5).toString(),
				location: event.attributes.location,
				id: event.id,
				title: event.attributes.title
			};
		}) ?? [];

	// Group events by month
	let groupedEvents = events.reduce(
		(acc, event) => {
			let month = new Date(event.date).toLocaleString('default', { month: 'long' });
			if (!acc[month]) {
				acc[month] = [];
			}
			acc[month].push(event);
			return acc;
		},
		{} as Record<string, eventType[]>
	);

	const theme = {
		calendar: {
			width: '427px',
			shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
			colors: {
				background: {
					primary: '#fff',
					highlight: '#00833F',
					hover: '#eee'
				}
			},
			font: {
				regular: '1em'
			}
		}
	};

	let currentDate = new Date();

	$: console.log({ currentDate });
</script>

<svelte:head>
	<title>IGAD - Events</title>
	<meta
		name="description"
		content={`Stay updated with our events calendar and find out more about upcoming events.`}
	/>
</svelte:head>

<PageHeader
	imgSrc={Hero}
	title={'Events Calendar'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
		vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
		aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<div class="mx-auto flex max-w-[1136px] flex-col gap-10 px-4 py-10 sm:px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">Recent Events</h2>

	<!-- Events grouped by month -->
	<div class="flex flex-col">
		{#each Object.keys(groupedEvents) as month, i}
			<div class="flex gap-4">
				<span class="min-w-20 text-gray-500">{month}</span>
				<div class="flex flex-col">
					{#each groupedEvents[month] as event, index}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="group/evt flex gap-4 hover:cursor-pointer"
							on:click={() => {
								goto(`events/${event.id}`);
							}}
						>
							<!-- indicator -->
							<div class="relative flex h-full flex-col">
								<div
									class=" flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-500 text-gray-500 transition-all duration-200 group-hover/evt:border-0 group-hover/evt:bg-primary group-hover/evt:text-white group-hover/evt:shadow-[0_0_0_3px_white,0_0_0_6px_green]"
								>
									{new Date(event.date).getDate()}
								</div>

								{#if i === Object.keys(groupedEvents).length - 1 && index + 1 === groupedEvents[month].length}
									<span class="sr-only">Placeholder</span>{:else}
									<div
										class=" h-full w-[2px] self-center bg-gray-400 transition-all duration-200 group-hover/evt:bg-primary"
									></div>
								{/if}
							</div>
							<!-- content -->
							<div class="flex flex-col gap-1 pb-8">
								<p
									class="line-clamp-2 font-semibold leading-5 transition-colors duration-150 group-hover/evt:text-primary"
								>
									{event.description}
								</p>
								<div class="flex items-center gap-2">
									<img class="h-4 w-4" src={Time} alt="time" />
									<span class="text-primary">{event.time}</span>
								</div>
								<div class="flex items-center gap-2">
									<img class="h-4 w-4" src={Location} alt="location" />
									<span class="text-secondary">{event.location}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="mx-auto flex max-w-[1136px] flex-col gap-10 px-4 py-10 sm:px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">All Events Calendar</h2>
	<div class="flex flex-col gap-5 p-5 lg:flex-row">
		<!-- calendar component -->
		<div class="lg:w-[427px]">
			<InlineCalendar bind:selected={currentDate} {theme} />
		</div>
		<div class="flex flex-1 flex-col gap-5">
			<!-- search bar -->
			<section class="">
				<div class="mx-auto max-w-[1136px]">
					<div class="relative flex items-center justify-center">
						<input
							type="text"
							class="w-full rounded-md border border-primary-500 bg-white px-4 py-2 pr-10 text-lg font-normal text-gray-800 focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500"
							placeholder="Search for events"
						/>
						<button class="absolute right-0 rounded-r-md px-4 py-2 text-white">
							<Search class="h-6 w-6" />
						</button>
					</div>
				</div>
			</section>
			<!-- events list -->
			<div class="flex flex-col gap-5">
				{#each events as event}
					<a href="events/{event.id}" class="flex gap-5 rounded-lg px-6 py-3 shadow-md">
						<div class=" pt-2">
							<img class="h-[70px] w-[80px] object-cover" src={IGADLogo} alt="Card " />
						</div>

						<div class="flex w-full flex-col gap-2 p-2">
							<p class="line-clamp-1 font-semibold">{event.title}</p>
							<p class="line-clamp-2 text-sm">{event.description}</p>
							<div class="flex items-center gap-2">
								<img class="h-4 w-4" src={Time} alt="time" />
								<span class="text-primary">{event.time}</span>
							</div>
							<div class="flex items-center gap-2">
								<img class="h-4 w-4" src={Location} alt="location" />
								<span class="text-secondary">{event.location}</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<!-- box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
 -->
