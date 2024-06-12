<script lang="ts">
	import { page } from '$app/stores';
	import Facebook from '$lib/assets/icons/social/facebook.svg.svelte';
	import LinkedIn from '$lib/assets/icons/social/linkedin.svg.svelte';
	import X from '$lib/assets/icons/social/x.svg.svelte';
	import LinkIcon from '$lib/assets/icons/social/link.svg.svelte';

	export let title = '';

	const handleCopyLink = () => {
		navigator.clipboard
			.writeText($page.url.href)
			.then(() => {
				alert('Link copied successfully!');
			})
			.catch((error) => {
				console.error('Failed to copy link:', error);
			});
	};
</script>

<div
	class="flex scale-95 flex-row items-center justify-center gap-2 rounded-3xl px-0 py-10 md:px-8 lg:flex-col lg:px-0 lg:py-0"
>
	<a
		target="_blank"
		href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent($page.url.href)}&t=${title}`}
		class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-400 transition-all hover:scale-95 hover:bg-secondary-500"
	>
		<Facebook class="h-5 w-5 text-stone-800" />
	</a>
	<a
		target="_blank"
		href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent($page.url.href)}&title=${title}`}
		class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-400 transition-all hover:scale-95 hover:bg-secondary-500"
	>
		<LinkedIn class="h-5 w-5 text-stone-800" />
	</a>
	<a
		target="_blank"
		href={`https://twitter.com/intent/tweet?url=${encodeURIComponent($page.url.href)}&text=${title}`}
		class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-400 transition-all hover:scale-95 hover:bg-secondary-500"
	>
		<X class="h-5 w-5 text-stone-800" />
	</a>
	<button
		on:click={handleCopyLink}
		class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-400 transition-all hover:scale-95 hover:bg-secondary-500"
	>
		<LinkIcon class="h-5 w-5 text-stone-800" />
	</button>
</div>
