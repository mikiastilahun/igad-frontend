<script lang="ts">
	import IGADLogo from '$lib/assets/igad-logo.png';

	export let title: string;
	export let description: string;
	export let link: string;
	export let imageUrl: string = '';
</script>

<!-- cards -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex flex-col bg-white rounded-lg hover:shadow-md shadow transition-all overflow-hidden w-full mx-auto hover:cursor-pointer"
	on:click={() => {
		if (link) {
			window.open(link, '_blank');
			return;
		}
	}}
>
	<img class="w-full h-48 object-cover" src={imageUrl ? imageUrl : IGADLogo} alt="Card " />

	<div class="p-4">
		<div class="flex justify-between">
			<span class="text-sm text-zinc-500">03 June 2023</span>
			<div
				class="w-[37px] h-3.5 px-2 bg-amber-300 rounded-[100px] justify-start items-center gap-2.5 inline-flex"
			>
				<div class="text-white text-[10px] font-normal font-['Open Sans']">New</div>
			</div>
		</div>

		<h2 class="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
			{title}.
		</h2>

		<p class="mt-2 text-zinc-500 text-sm">
			{description}
		</p>
	</div>
</div>
