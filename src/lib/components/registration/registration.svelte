<script lang="ts">
	import { onMount } from 'svelte';

	import IGAD_LOGO from '$lib/assets/igad-logo.svg';
	import { fade } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	let name = '';
	let email = '';
	let showCongrats = false;

	// @ts-ignore
	let token: any;

	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://www.google.com/recaptcha/api.js';
		script.async = true;
		script.defer = true;
		document.head.appendChild(script);
	});

	$: console.log({ token });

	async function register() {
		// @ts-ignore
		const t = grecaptcha.getResponse();
		token = t;

		if (!token || token.length === 0) {
			alert('Please complete the reCAPTCHA');
			return;
		}

		if (!name || !email) {
			alert('Please fill in all fields');
			return;
		}

		// send a fetch post request to PUBLIC_STATIC_URL/learning-material-interest-form
		const data = {
			fullname: name,
			email
		};

		const response = await fetch(`${PUBLIC_STATIC_URL}/api/learning-material-interest-forms`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: data })
		});

		if (!response.ok) {
			console.error('Failed to register');
			return;
		}

		showCongrats = true;
	}

	export let show = false;
</script>

<div
	transition:fade={{
		delay: 0,
		duration: 150,
		easing: linear
	}}
	class="fixed left-0 top-0 z-[999999] flex h-full w-full items-center justify-center"
>
	<div class="absolute inset-0 -z-10 bg-primary/80 backdrop-blur-sm"></div>

	<button
		class="absolute right-0 top-0 z-[999999] m-4 rounded-full bg-white p-2 hover:cursor-pointer hover:bg-white/90"
		on:click={() => (show = false)}
	>
		<span class="h-6 w-6">
			<!-- svg close icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</span>
	</button>
	{#if !showCongrats}
		<div
			class="flex w-full flex-col items-center justify-center rounded-md bg-transparent p-8 md:w-1/2"
		>
			<img src={IGAD_LOGO} class="mb-4 h-20 w-20 rounded-full bg-white" alt="IGAD Logo" />
			<h2 class="mb-4 text-2xl font-bold text-white">Register for Quick Links!</h2>
			<input
				bind:value={name}
				class="mb-4 block w-full rounded-md border border-white bg-white/20 p-3 text-white placeholder:text-white focus:border-secondary-500 focus:ring-secondary-500"
				type="text"
				placeholder="Full Name"
			/>
			<input
				bind:value={email}
				class="mb-4 block w-full rounded-md border border-white bg-white/20 p-3 text-white placeholder:text-white focus:border-secondary-500 focus:ring-secondary-500"
				type="email"
				placeholder="Email"
			/>
			<div class="g-recaptcha p-4" data-sitekey="6LdMtewpAAAAAO3YQbhgzR0Ksan-aVhIwUgAHt4E"></div>

			<button on:click={register} class="block w-full rounded-md bg-secondary px-4 py-3 text-black"
				>Register</button
			>
		</div>
	{:else}
		<div class="rounded-md bg-white p-8 shadow-lg">
			<h2 class="mb-4 text-2xl font-bold text-primary">Congratulations!</h2>
			<p class="text-zinc-600">You have successfully registered.</p>
		</div>
	{/if}
</div>
