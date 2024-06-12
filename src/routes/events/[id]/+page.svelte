<script>
	import Location from '$lib/assets/icons/location.svg.svelte';
	import Time from '$lib/assets/icons/time.svg.svelte';

	import Home from '$lib/assets/icons/home.svg.svelte';
	import MailEvent from '$lib/assets/icons/mail-event.svg.svelte';
	import Phone from '$lib/assets/icons/phone.svg.svelte';
	import Web from '$lib/assets/icons/web.svg.svelte';
	import Google from '$lib/assets/icons/google.svg.svelte';
	import Outlook from '$lib/assets/icons/microsoft.svg.svelte';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import dayjs from 'dayjs';

	import Share from '$lib/components/_shared/share/share.svelte';

	export let data;

	const event = data.data?.eventData.data.attributes;

	$: start = new Date(event?.date || '').toISOString().replace(/-|:|\.\d\d\d/g, '');
</script>

<svelte:head>
	<title>IGAD - {event?.title || ''}</title>
	<meta name="description" content={event?.title || ''} />
</svelte:head>

<PageHeader title={event?.title} class="!items-end pb-8">
	<div class="flex items-center gap-2">
		<Location class="h-4 w-4 fill-secondary-500" />
		<span class="text-secondary">{event?.location}</span>
	</div>
	<div class="flex items-center gap-2">
		<Time class="  h-4 w-4 fill-secondary-500" />
		<span class="text-secondary">{dayjs(event?.date).format('ddd, MMM YYYY hh:mm')} </span>
	</div>
</PageHeader>

<section class="relative mx-auto flex max-w-7xl flex-col-reverse px-4 py-10 lg:flex-row">
	<div class="sticky top-10 self-start">
		<Share />
	</div>
	<div class="mx-auto w-full max-w-[1136px] px-0 md:px-8 lg:px-4">
		<!-- content -->
		<div class="flex flex-col gap-3">
			<h5 class="text-xl font-bold">Organizers</h5>
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<Home class="h-4 w-4 text-primary-400" />
					<span class=" text-gray-700">IGAD Health & Social Development Divistion</span>
				</div>
				<div class="flex items-center gap-2">
					<Phone class="h-4 w-4 text-primary-400" />
					<span class=" text-gray-700">+253-213-54050</span>
				</div>
				<div class="flex items-center gap-2">
					<MailEvent class="h-4 w-4 text-primary-400" />
					<span class=" text-gray-700">communication@igad.int</span>
				</div>
				<div class="flex items-center gap-2">
					<Web class="h-4 w-4 text-primary-400" />
					<span class=" text-gray-700">https://igad.int</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-3 pt-12">
			<h5 class="text-xl font-bold">About the event</h5>

			<!-- MARKDOWN -->
			<p class="prose max-w-full">
				{event?.description}
			</p>
		</div>
		<div class="flex gap-3 pt-12">
			<a
				target="_blank"
				href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${event?.title}&dates=${start}/${start}&location=${event?.location}&details=${event?.description}`}
				class="flex items-center gap-2 rounded-full border-2 border-transparent bg-white px-6 py-3 font-semibold text-black shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)] transition-all hover:border-green-500"
			>
				<span class="rounded-full bg-white">
					<Google />
				</span>
				Add To Google Calendar</a
			>
			<a
				target="_blank"
				href={`https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${event?.title}&startdt=${event?.date}&enddt=${event?.date}&location=${location}&body=${event?.description}`}
				class="flex items-center gap-2 rounded-full border-2 border-transparent bg-white px-6 py-3 font-semibold text-black shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)] transition-all hover:border-green-500"
			>
				<Outlook />
				Add To Outlook Calendar</a
			>
		</div>
	</div>
</section>
