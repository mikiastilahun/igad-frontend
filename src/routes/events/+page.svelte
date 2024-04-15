<script lang="ts">
	import Hero from '$lib/assets/events/events-hero.jpg';
	import Location from '$lib/assets/location.svg';
	import Time from '$lib/assets/time.svg';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import IGADLogo from '$lib/assets/igad-logo.png';
	import { InlineCalendar } from 'svelte-calendar';

	type eventType = {
		date: string;
		title: string;
		time: string;
		location: string;
		id: string;
		description: string;
	};

	// Mock data for events array date format: yyyy-mm-dd and use multiple months for testing
	let events: eventType[] = [
		{
			date: '2022-01-15',
			description:
				'Launching of the Regional Food Systems Resilience Program for Eastern & Southern Africa (FSRP)',
			time: '21:30 EST',
			location: 'Addis Ababa',
			id: '1',
			title: 'This is the title'
		},

		{
			date: '2022-02-15',
			description:
				'Launching of the Regional Food Systems Resilience Program for Eastern & Southern Africa (FSRP)',
			time: '21:30 EST',
			location: 'Addis Ababa',
			id: '2',
			title: 'This is the title'
		},
		{
			date: '2022-01-15',
			description:
				'Launching of the Regional Food Systems Resilience Program for Eastern & Southern Africa (FSRP)',
			time: '21:30 EST',
			location: 'Addis Ababa',
			id: '99',
			title: 'This is the title'
		},
		{
			date: '2022-03-15',
			description:
				'Launching of the Regional Food Systems Resilience Program for Eastern & Southern Africa (FSRP)',
			time: '21:30 EST',
			location: 'Addis Ababa',
			id: '3',
			title: 'This is the title'
		}
	];

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
				<h1 class="text-3xl font-bold mb-2">Events Calendar</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</section>
</div>

<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-10">
	<h2 class="text-2xl font-bold leading-normal">Recent Events</h2>

	<!-- Events grouped by month -->
	<div class="flex flex-col">
		{#each Object.keys(groupedEvents) as month}
			<div class="flex gap-4">
				<span class="w-20 text-gray-500">{month}</span>
				<div class="flex flex-col">
					{#each groupedEvents[month] as event}
						<div class="flex gap-4">
							<!-- indicator -->
							<div class="h-full flex flex-col relative">
								<div
									class="hover:cursor-pointer peer hover:shadow-[0_0_0_3px_white,0_0_0_6px_green] hover:border-0 hover:text-white hover:bg-primary text-gray-500 border border-gray-500 w-8 h-8 shrink-0 rounded-full flex justify-center items-center transition-all duration-200"
								>
									{event.date.split('-')[2]}
								</div>
								<div
									class=" w-[2px] h-full bg-gray-400 self-center peer-hover:bg-primary transition-all duration-200"
								></div>
							</div>
							<!-- content -->
							<div class="flex flex-col pb-8 gap-1">
								<p class="font-semibold leading-5">{event.description}</p>
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

<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-10">
	<h2 class="text-2xl font-bold leading-normal">All Events Calendar</h2>
	<div class="flex gap-5 p-5">
		<!-- calendar component -->
		<div class="w-[427px]">
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
							placeholder="Search for publications"
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
						<div class="w-[80px] h-[70px] pt-2">
							<img class=" object-cover" src={IGADLogo} alt="Card " />
						</div>

						<div class="p-2 flex flex-col gap-2">
							<p class="font-semibold">{event.title}</p>
							<p class="text-sm">{event.description}</p>
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
