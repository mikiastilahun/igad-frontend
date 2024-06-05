<script>
	export let title = '';
	export let description = '';
	export let imgSrc = '';
	export let imgAlt = '';

	let className = '';
	export { className as class };
</script>

<div class="md:p-4 relative">
	<section
		class=" {className} relative min-h-[674px] flex items-center md:rounded-lg bg-primary-500"
	>
		{#if imgSrc}
			<img
				class="absolute inset-0 object-cover w-full h-full md:rounded-lg"
				alt={imgAlt || title}
				src={imgSrc}
			/>
			<div
				class="absolute inset-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent md:rounded-lg"
			></div>
		{/if}
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">{title}</h1>
				{#if description && description.length > 0}
					<p class=" text-base font-normal leading-normal">
						{description}
					</p>
				{/if}
				<slot />
			</div>
		</div>
	</section>
</div>
