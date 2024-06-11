<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import Select from 'svelte-select';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	import IGADLogo from '$lib/assets/igad-logo.svg';
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	let formValues: any = {};
	type Form = {
		label: string;
		type: string;
		placeholder: string;
		required: boolean;
		options?: string[];
	}[];
	let formData: Form = [
		{
			label: 'Name',
			type: 'text',
			placeholder: 'Enter your name',
			required: true
		},
		{
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email',
			required: true
		},

		{
			label: 'Gender',
			type: 'select',
			placeholder: 'Select your gender',
			required: true,
			options: ['Male', 'Female', 'Other']
		},
		{
			label: 'Bio',
			type: 'textarea',
			placeholder: 'Enter your bio',
			required: true
		},
		{
			label: 'Subscribe to newsletter',
			type: 'checkbox',
			required: false,
			placeholder: 'Country'
		},
		{
			label: 'Membership',
			type: 'radio',
			options: ['Basic', 'Premium', 'VIP'],
			required: true,
			placeholder: 'Membership'
		}
	];

	const formSubmitted = (
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) => {
		console.log({ formValues });
	};
</script>

<svelte:head>
	<title>IGAD-Form</title>
</svelte:head>

<div class="md:p-4">
	<section class="relative flex min-h-[674px] items-center rounded-lg">
		<img
			class="absolute inset-0 h-full w-full rounded-lg object-cover"
			alt={`publications hero image`}
			src={Hero}
		/>
		<div
			class="absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-r from-black/80 to-transparent"
		></div>
		<div class="relative mx-auto w-full max-w-[1136px] px-4 md:px-8">
			<div class="max-w-2xl text-white">
				<h1 class="mb-2 text-3xl font-bold">Form</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</section>
</div>

<div class="px-4 py-10">
	<form
		class="relative mx-auto -mt-[25%] w-full max-w-[1136px] space-y-4 rounded-lg bg-white p-8 shadow-2xl md:-mt-0"
		on:submit|preventDefault={formSubmitted}
	>
		{#each formData as field (field.label)}
			<div>
				<label for={field.label} class="block text-sm font-medium text-gray-700"
					>{field.label}</label
				>
				{#if field.type === 'select'}
					<select
						bind:value={formValues[field.label]}
						id={field.label}
						required={field.required}
						class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 sm:text-sm"
					>
						<option disabled selected>{field.placeholder}</option>
						{#each field.options || [] as option (option)}
							<option>{option}</option>
						{/each}
					</select>
				{:else if field.type === 'textarea'}
					<textarea
						bind:value={formValues[field.label]}
						id={field.label}
						placeholder={field.placeholder}
						required={field.required}
						class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 sm:text-sm"
					></textarea>
				{:else if field.type === 'checkbox'}
					<div class="relative flex gap-x-3">
						<div class="flex h-6 items-center">
							<input
								type="checkbox"
								bind:checked={formValues[field.label]}
								id={field.label}
								required={field.required}
								class="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-primary-600"
							/>
						</div>
						<div class="text-sm leading-6">
							<label for={field.label} class="font-medium text-gray-900">{field.placeholder}</label>
						</div>
					</div>
				{:else if field.type === 'radio'}
					{#each field.options || [] as option (option)}
						<div class="flex items-center gap-x-3">
							<input
								id={option}
								name={field.label}
								value={option}
								bind:group={formValues[field.label]}
								type="radio"
								class="h-4 w-4 border-gray-300 text-secondary-600 focus:ring-primary-600"
							/>
							<label for={option} class="block text-sm font-medium leading-6 text-gray-900"
								>{option}</label
							>
						</div>
					{/each}
				{:else}
					<input
						type="text"
						id={field.label}
						bind:value={formValues[field.label]}
						placeholder={field.placeholder}
						required={field.required}
						class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 sm:text-sm"
					/>
				{/if}
			</div>
		{/each}
		<button
			type="submit"
			class="w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
		>
			Submit
		</button>
	</form>
</div>
