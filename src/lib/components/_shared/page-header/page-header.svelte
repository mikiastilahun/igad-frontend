<script>
	export let title = '';
	export let description = '';
	export let imgSrc = '';
	export let imgAlt = '';

	let className = '';
	export { className as class };
</script>

<div class="relative md:p-4">
	<section
		class=" {className} relative flex min-h-[600px] items-center bg-primary-500 md:rounded-lg"
	>
		{#if imgSrc}
			<img
				class="absolute inset-0 h-full w-full object-cover md:rounded-lg"
				alt={imgAlt || title}
				src={imgSrc}
			/>
			<div
				class="absolute inset-0 h-full w-full bg-gradient-to-r from-black/80 to-transparent md:rounded-lg"
			></div>
		{/if}
		<div class="relative mx-auto w-full max-w-[1136px] px-4 md:px-8">
			<div class="max-w-2xl text-white">
				<h1 class="mb-2 text-3xl font-bold">{title}</h1>
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
