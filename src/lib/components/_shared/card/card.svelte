<script lang="ts">
	import IGADLogo from '$lib/assets/igad-logo.svg';
	import dayjs from 'dayjs';

	export let title: string;
	export let description: string;
	export let link: string;
	export let imageUrl: string = '';
	export let date: string;

	export let isRichtext: boolean = false;
</script>

<!-- cards -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a
	class="mx-auto flex w-full flex-col overflow-hidden rounded-lg bg-white shadow transition-all hover:cursor-pointer hover:shadow-md"
	href={link}
>
	<img class="h-48 w-full object-cover" src={imageUrl ? imageUrl : IGADLogo} alt="Card " />

	<div class="p-4">
		<div class="flex justify-between">
			<span class="text-sm text-zinc-500">{dayjs(date || '').format('DD MMMM YYYY')}</span>
			<div
				class="inline-flex h-3.5 w-[37px] items-center justify-start gap-2.5 rounded-[100px] bg-amber-300 px-2"
			>
				<div class=" text-[10px] font-normal text-white">New</div>
			</div>
		</div>

		<h2 class="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
			{title}.
		</h2>

		<p class="... mt-2 line-clamp-3 text-sm text-zinc-500">
			{#if isRichtext}
				{@html description}
			{:else}
				{description}
			{/if}
		</p>
	</div>
</a>
