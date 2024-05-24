<script>
	import IGADLogo from '$lib/assets/igad-logo.png';

	import SvelteMarkdown from 'svelte-markdown';

	// define the content with sample markdown text and images included
	const content = `
# This is a Markdown policy and framework description.

## Headers

`;
</script>

<div class="md:p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg bg-primary">
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">Policies and Frameworks</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
		<img
			class="rounded-full w-[400px] h-[400px] mr-32 absolute right-0 bottom-1/2 top-1/2 transform -translate-y-1/2"
			alt={`publications hero image`}
			src={IGADLogo}
		/>
	</section>
</div>

<div class="w-full">
	<!-- content -->
	<p class=" prose max-w-5xl mx-auto">
		<SvelteMarkdown source={content} />
	</p>
</div>
