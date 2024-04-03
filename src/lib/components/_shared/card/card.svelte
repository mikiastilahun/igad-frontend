<script>
	import IGADLogo from '$lib/assets/igad-logo.png';
</script>

<!-- cards -->
<div
	class="flex flex-col bg-white rounded-lg hover:shadow-md shadow transition-all overflow-hidden w-full max-w-xs mx-auto"
>
	<img class="w-full h-48 object-contain bg-primary" src={IGADLogo} alt="Card " />

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
			This is a long title that will be truncated after two lines...
		</h2>

		<p class="mt-2 text-zinc-500 text-sm">
			This is the description of the card. It can be as long as you want.
		</p>
	</div>
</div>
