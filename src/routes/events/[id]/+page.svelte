<script>
	import Location from '$lib/assets/location.svg';
	import Time from '$lib/assets/time.svg';

	import Home from '$lib/assets/icons/home.svg.svelte';
	import MailEvent from '$lib/assets/icons/mail-event.svg.svelte';
	import Phone from '$lib/assets/icons/phone.svg.svelte';
	import Web from '$lib/assets/icons/web.svg.svelte';
	import Google from '$lib/assets/icons/google.svg.svelte';
	import Outlook from '$lib/assets/icons/microsoft.svg.svelte';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';

	export let data;

	const event = data.data?.eventData.data.attributes;
</script>

<PageHeader title={event?.title} class="!items-end pb-8">
	<div class="flex gap-2 items-center">
		<img class="w-4 h-4" src={Location} alt="location" />
		<span class="text-secondary">{event?.location}</span>
	</div>
	<div class="flex gap-2 items-center">
		<img class="w-4 h-4" src={Time} alt="time" />
		<span class="text-secondary">{new Date(event?.date || '')} </span>
	</div>
</PageHeader>

<section class="px-8 py-10 flex flex-row gap-8 relative max-w-7xl mx-auto">
	<div class="sticky top-0">
		<!-- share icons  -->
		<span class="text-sm font-semibold">Share</span>
		<div class="bg-secondary flex flex-col gap-5 justify-center items-center py-4 rounded-full">
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
				<div class="flex gap-2 items-center">
					<Home />
					<span class="text-gray-700 text-sm">IGAD Health & Social Development Divistion</span>
				</div>
				<div class="flex gap-2 items-center">
					<Phone />
					<span class="text-gray-700 text-sm">+253-213-54050</span>
				</div>
				<div class="flex gap-2 items-center">
					<MailEvent />
					<span class="text-gray-700 text-sm">communication@igad.int</span>
				</div>
				<div class="flex gap-2 items-center">
					<Web />
					<span class="text-gray-700 text-sm">https://igad.int</span>
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
				class="flex items-center gap-2 shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)] font-semibold bg-white text-black py-3 px-6 rounded-full"
			>
				<Google />
				Add To Google Calendar</button
			>
			<button
				class="flex items-center gap-2 shadow-[0px_3px_10px_0px_rgba(0,_0,_0,_0.25)] font-semibold bg-white text-black py-3 px-6 rounded-full"
			>
				<Outlook />
				Add To Outlook Calendar</button
			>
		</div>
	</div>
</section>
