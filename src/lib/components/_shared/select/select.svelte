<script>
	export let selectedOption = '';
	export let placeholder = '';
	export let options = [
		{ value: 'group1', label: 'Group 1' },
		{ value: 'group2', label: 'Group 2' },
		{ value: 'group3', label: 'Group 3' }
		// Add more options as needed
	];
</script>

<select
	bind:value={selectedOption}
	class="w-full min-w-[180px] h-10 px-2 bg-white rounded-lg border border-zinc-200 text-zinc-900 text-xs font-semibold font-['Open Sans']"
>
	<option value="">{placeholder}</option>
	{#each options as option (option.value)}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	select {
		appearance: none;
		background-image: url('data:image/svg+xml;utf8,<svg fill="black" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3" /></svg>');
		background-repeat: no-repeat;
		background-position: right 0.5em center;
		background-size: 1.5em;
		padding-right: 1.5em; /* Adjust as needed */
	}
	select:hover {
		background-color: #f3f3f3;
	}
</style>
