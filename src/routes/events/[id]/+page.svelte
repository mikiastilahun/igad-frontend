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

	export let data;

	const event = data.data?.eventData.data.attributes;
</script>

<PageHeader title={event?.title} class="!items-end pb-8">
	<div class="flex items-center gap-2">
		<Location class="h-4 w-4 fill-secondary-500" />
		<span class="text-secondary">{event?.location}</span>
	</div>
	<div class="flex items-center gap-2">
		<Time class="  h-4 w-4 fill-secondary-500" />
		<span class="text-secondary">{dayjs(event?.date).format('ddd, MMM YYYY')} </span>
	</div>
</PageHeader>

<section class="relative mx-auto flex max-w-7xl flex-row gap-8 px-8 py-10">
	<div class="sticky top-0">
		<!-- share icons  -->
		<span class="text-sm font-semibold">Share</span>
		<div class="flex flex-col items-center justify-center gap-5 rounded-full bg-secondary py-4">
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/facebook-new.png" alt="Facebook Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/instagram.png" alt="Instagram Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/linkedin.png" alt="Linkedin Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/ios-filled/18/x.png" alt="Close Icon" />
			</a>
		</div>
	</div>
	<div class="pl-8">
		<!-- content -->
		<div class="flex flex-col gap-3">
			<h5 class="text-xl font-bold">Organizers</h5>
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<Home />
					<span class="text-sm text-gray-700">IGAD Health & Social Development Divistion</span>
				</div>
				<div class="flex items-center gap-2">
					<Phone />
					<span class="text-sm text-gray-700">+253-213-54050</span>
				</div>
				<div class="flex items-center gap-2">
					<MailEvent />
					<span class="text-sm text-gray-700">communication@igad.int</span>
				</div>
				<div class="flex items-center gap-2">
					<Web />
					<span class="text-sm text-gray-700">https://igad.int</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-3 pt-12">
			<h5 class="text-xl font-bold">About the event</h5>

			<!-- MARKDOWN -->
			<p>
				{event?.description}
			</p>
		</div>
		<!-- box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
 -->
		<div class="flex gap-3 pt-12">
			<button
				class="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)]"
			>
				<Google />
				Add To Google Calendar</button
			>
			<button
				class="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)]"
			>
				<Outlook />
				Add To Outlook Calendar</button
			>
		</div>
	</div>
</section>
