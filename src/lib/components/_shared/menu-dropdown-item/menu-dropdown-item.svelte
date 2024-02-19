<script lang="ts">
	// define href as a prop
	export let href = '#';
</script>

<a {href} class="group flex justify-start items-start gap-3 p-2 hover:bg-primary/80 rounded-lg">
	<span>
		<slot name="icon" />
	</span>
	<p class="flex flex-col">
		<span class="text-zinc-900 font-semibold group-hover:text-white">
			<slot name="title" />
		</span>
		<span class="text-xs font-normal text-gray-500 group-hover:text-gray-200">
			<slot name="description" />
		</span>
	</p>
</a>
