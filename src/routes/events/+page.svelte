<script lang="ts">
	import Hero from '$lib/assets/events/events-hero.jpg';
	import Location from '$lib/assets/location.svg';
	import Time from '$lib/assets/time.svg';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import IGADLogo from '$lib/assets/igad-logo.png';
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

<PageHeader
	imgSrc={Hero}
	title={'Events Calendar'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
		vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
		aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-10 px-4 sm:px-8 md:px-4">
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
							class="flex gap-4 hover:cursor-pointer group/evt"
							on:click={() => {
								goto(`events/${event.id}`);
							}}
						>
							<!-- indicator -->
							<div class="h-full flex flex-col relative">
								<div
									class=" group-hover/evt:shadow-[0_0_0_3px_white,0_0_0_6px_green] group-hover/evt:border-0 group-hover/evt:text-white group-hover/evt:bg-primary text-gray-500 border border-gray-500 w-8 h-8 shrink-0 rounded-full flex justify-center items-center transition-all duration-200"
								>
									{new Date(event.date).getDate()}
								</div>

								{#if i === Object.keys(groupedEvents).length - 1 && index + 1 === groupedEvents[month].length}
									<span class="sr-only">Placeholder</span>{:else}
									<div
										class=" w-[2px] h-full bg-gray-400 self-center group-hover/evt:bg-primary transition-all duration-200"
									></div>
								{/if}
							</div>
							<!-- content -->
							<div class="flex flex-col pb-8 gap-1">
								<p
									class="font-semibold leading-5 group-hover/evt:text-primary transition-colors duration-150 line-clamp-2"
								>
									{event.description}
								</p>
								<div class="flex gap-2 items-center">
									<img class="w-4 h-4" src={Time} alt="time" />
									<span class="text-primary">{event.time}</span>
								</div>
								<div class="flex gap-2 items-center">
									<img class="w-4 h-4" src={Location} alt="location" />
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

<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-10 px-4 sm:px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">All Events Calendar</h2>
	<div class="flex flex-col lg:flex-row gap-5 p-5">
		<!-- calendar component -->
		<div class="lg:w-[427px]">
			<InlineCalendar bind:selected={currentDate} {theme} />
		</div>
		<div class="flex-1 flex flex-col gap-5">
			<!-- search bar -->
			<section class="">
				<div class="max-w-[1136px] mx-auto">
					<div class="relative flex items-center justify-center">
						<input
							type="text"
							class="w-full px-4 py-2 text-lg font-normal text-gray-800 bg-gray-300/30 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary pr-10"
							placeholder="Search for events"
						/>
						<button class="absolute right-0 px-4 py-2 text-white rounded-r-md">
							<Search class="w-6 h-6" />
						</button>
					</div>
				</div>
			</section>
			<!-- events list -->
			<div class="flex flex-col gap-5">
				{#each events as event}
					<a href="events/{event.id}" class="flex gap-5 rounded-lg py-3 px-6 shadow-md">
						<div class=" pt-2">
							<img class="w-[80px] h-[70px] object-cover" src={IGADLogo} alt="Card " />
						</div>

						<div class="p-2 w-full flex flex-col gap-2">
							<p class="font-semibold line-clamp-1">{event.title}</p>
							<p class="text-sm line-clamp-2">{event.description}</p>
							<div class="flex gap-2 items-center">
								<img class="w-4 h-4" src={Time} alt="time" />
								<span class="text-primary">{event.time}</span>
							</div>
							<div class="flex gap-2 items-center">
								<img class="w-4 h-4" src={Location} alt="location" />
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
