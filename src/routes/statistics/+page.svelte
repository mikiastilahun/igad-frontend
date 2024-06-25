<script lang="ts">
	import Hero from '$lib/assets/statistics/hero.png';
	import Map from '$lib/components/leaflet/map.svelte';
	import { browser } from '$app/environment';

	import RemittanceChart from '$lib/components/charts/remittance-chart.svelte';
	import RefugeesChart from '$lib/components/charts/refugees-chart.svelte';
	import MigrantsChart from '$lib/components/charts/migrants-chart.svelte';
	import MigrantsPerCountryChart, {
		type MigrantsType
	} from '$lib/components/charts/migrants-per-country-chart.svelte';
	import PopulationPerCountryChart, {
		type PopulationType
	} from '$lib/components/charts/population-per-country-chart.svelte';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';

	export let data;

	const populationStats = data.data?.populationStats.data.attributes;
	const populationPerCountry = data.data?.populationPerCountry.data.attributes;
	const igadRegionMigration = data.data?.igadRegionMigrants.data.attributes;
	const migrantsPerCountry = data.data?.migrantsPerCountry.data.attributes;
	const refugeesPerCountry = data.data?.refugeesPerCountry.data.attributes;
	const remittancePerCountry = data.data?.remittancePerCountry.data.attributes;

	const transformMigrantsPerCountry = (data: typeof migrantsPerCountry) => {
		let t: MigrantsType[] = [];

		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item: MigrantsType) => {
					t.push({
						country: country,
						labor_force_migrants: item.labor_force_migrants,
						migrants_15_plus: item.migrants_15_plus,
						youth_labor_force_migrants: item.youth_labor_force_migrants,
						year: item.year.split('-')[0],
						id: item.id
					});
				});
			}
		}

		return t;
	};

	const transformPopulationPerCountryData = (data: typeof populationPerCountry) => {
		let t: PopulationType[] = [];

		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item: PopulationType) => {
					t.push({
						age_group: item.age_group,
						male: item.male,
						female: item.female,
						country: country,
						year: item.year.split('-')[0],
						id: item.id
					});
				});
			}
		}

		return t;
	};

	const transformRefugeesPerCountryData = (data: any) => {
		let t: any[] = [];
		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item) => {
					t.push({
						country: country,
						age_group: item.age_group,
						male: item.male,
						female: item.female,
						year: item.year.split('-')[0]
					});
				});
			}
		}

		return t;
	};

	const transformRemittancePerCountryData = (data: any) => {
		// country, year, amount, region
		let transformedData: { country: string; region: string; amount: string; year: string }[] = [];
		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item) => {
					transformedData.push({
						country: country,
						region: item.region,
						amount: item.amount,
						year: item.year.split('-')[0]
					});
				});
			}
		}

		return transformedData;
	};

	// refugees

	let transformedRefugeesPerCountryData = transformRefugeesPerCountryData(refugeesPerCountry);

	// Remittance
	let transformedRemittancePerCountryData = transformRemittancePerCountryData(remittancePerCountry);
</script>

<svelte:head>
	<title>IGAD - Statistics</title>
	<meta
		name="description"
		content={`Explore the latest data and statistics on population, migrants, refugees, 
		and remittance in the IGAD region. Gain insights into demographic trends, migration patterns, and economic indicators.`}
	/>
</svelte:head>
{#if browser}
	<PageHeader
		imgSrc={Hero}
		title={'Data and Statistics'}
		description={`The Intergovernmental Authority on Development (IGAD) region, encompassing eight Member States in the Horn of Africa, experiences significant migration and displacement driven by conflict, climate change, and economic challenges. Accurate and comprehensive data on these movements are vital for effective policy-making and humanitarian response. `}
	/>

	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-4 py-10">
		<h2 class="text-2xl font-bold leading-normal">Population</h2>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html populationStats?.content}
		</p>
		<div class="py-8">
			<Map data={populationStats} />
		</div>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html populationPerCountry?.content}
		</p>
		<div class=" pt-8">
			<PopulationPerCountryChart
				data={transformPopulationPerCountryData(populationPerCountry)}
				externalData={populationPerCountry}
				title="Population"
				isSwappable={true}
				chartType="line"
			/>
		</div>
	</section>

	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-4 py-10">
		<h2 class="text-2xl font-bold leading-normal">Migrant Stock</h2>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html igadRegionMigration?.content}
		</p>
		<div class="py-8">
			<MigrantsChart
				data={igadRegionMigration?.migrant}
				title="Migrants"
				isSwappable={true}
				chartType="line"
			/>
		</div>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html migrantsPerCountry?.content}
		</p>
		<div class="py-8">
			<MigrantsPerCountryChart
				data={transformMigrantsPerCountry(migrantsPerCountry)}
				isSwappable={true}
				chartType="bar"
				title="Migrants per country"
			/>
		</div>
	</section>

	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-4 py-10">
		<h2 class="text-2xl font-bold leading-normal">Refugees Stock</h2>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html refugeesPerCountry?.content}
		</p>
		<RefugeesChart
			data={transformedRefugeesPerCountryData}
			isSwappable={true}
			title="Refugees"
			chartType="line"
		/>
	</section>

	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-4 py-10">
		<h2 class="text-2xl font-bold leading-normal">Remittance</h2>
		<p class="ck-content prose max-w-full text-base leading-normal">
			{@html remittancePerCountry?.content}
		</p>
		<RemittanceChart
			isSwappable={true}
			data={transformedRemittancePerCountryData}
			title="Remittance"
			chartType="line"
		/>
	</section>
{/if}
