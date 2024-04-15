<script>
	import IGAD_LOGO from '$lib/assets/igad-logo.png';
	import { fade } from 'svelte/transition';
	let name = '';
	let email = '';
	let showCongrats = false;

	function register() {
		// Add your registration logic here
		showCongrats = true;
	}

	export let show = false;
</script>

<div
	transition:fade={{
		delay: 0,
		duration: 300
	}}
	class="fixed top-0 z-50 left-0 w-full h-full flex items-center justify-center"
>
	<div class="bg-primary/80 backdrop-blur-sm -z-10 absolute inset-0"></div>

	<button
		class="absolute top-0 right-0 m-4 p-2 bg-white rounded-full"
		on:click={() => (show = false)}
	>
		<span class="w-6 h-6">
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
		<div class="p-8 rounded-md bg-transparent w-2/5 flex justify-center flex-col items-center">
			<img src={IGAD_LOGO} class="w-16 h-w-16 m-4" alt="IGAD Logo" />
			<h2 class="mb-4 text-white font-bold text-2xl">Register for Quick Links!</h2>
			<input
				bind:value={name}
				class="block w-full mb-4 p-3 border placeholder:text-white border-white rounded-md bg-white/20 text-white"
				type="text"
				placeholder="Full Name"
			/>
			<input
				bind:value={email}
				class="block w-full mb-4 p-3 border placeholder:text-white border-white rounded-md bg-white/20 text-white"
				type="email"
				placeholder="Email"
			/>
			<button on:click={register} class="block w-full p-2 bg-secondary text-black rounded-md"
				>Register</button
			>
		</div>
	{:else}
		<div class="bg-white p-8 rounded-md shadow-lg">
			<h2 class="mb-4 text-primary font-bold text-2xl">Congratulations!</h2>
			<p class="text-zinc-600">You have successfully registered.</p>
		</div>
	{/if}
</div>
