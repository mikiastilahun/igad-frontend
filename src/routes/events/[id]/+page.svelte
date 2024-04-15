<script>
	import Location from '$lib/assets/location.svg';
	import Time from '$lib/assets/time.svg';

	import Home from '$lib/assets/icons/home.svg.svelte';
	import MailEvent from '$lib/assets/icons/mail-event.svg.svelte';
	import Phone from '$lib/assets/icons/phone.svg.svelte';
	import Web from '$lib/assets/icons/web.svg.svelte';
	import Google from '$lib/assets/icons/google.svg.svelte';
	import Outlook from '$lib/assets/icons/microsoft.svg.svelte';
</script>

<div class="p-4">
	<section class="relative h-[500px] flex items-end pb-10 rounded-lg bg-primary">
		<div class="relative max-w-[1136px] mx-auto w-full">
			<div class="text-white max-w-2xl">
				<h1 class="text-xl font-bold mb-2">
					Launching of the Regional Food Systems Resilience Program for Eastern & Southern Africa
					(FSRP)
				</h1>

				<div class="flex gap-2 items-center">
					<img class="w-4 h-4" src={Location} alt="location" />
					<span class="text-secondary">Addis Ababa</span>
				</div>
				<div class="flex gap-2 items-center">
					<img class="w-4 h-4" src={Time} alt="time" />
					<span class="text-secondary">21:30 EST </span>
				</div>
			</div>
		</div>
	</section>
</div>

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
				Lorem ipsum dolor sit amet consectetur. Redirect to another link pretium sit nibh sapien vel
				phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
				Sodales pulvinar facilisi donec facilisis lorem lectus. Nec feugiat pharetra diam faucibus
				felis aliquam lectus nibh. Praesent mauris eget sollicitudin donec neque risus interdum
				pellentesque aliquam. Vitae eu duis vel nunc ullamcorper. Vehicula eu mi nisl massa. Lectus
				quam sit sit senectus vitae ante eget. Donec ut nunc velit in. Aliquam non proin vitae ac.
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
