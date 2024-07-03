import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { PopulationStats } from '../+page.server.js';
export const ssr = false;


export type AgeGroup =
	| 'age 0-4'
	| 'age 5-9'
	| 'age 10-14'
	| 'age 15-19'
	| 'age 20-24'
	| 'age 25-29'
	| 'age 30-34'
	| 'age 35-39'
	| 'age 40-44'
	| 'age 45-49'
	| 'age 50-54'
	| 'age 55-59'
	| 'age 60-64'
	| 'age 65-69'
	| 'age 70-74'
	| 'age 75-79'
	| 'age 80+';
export type PopulationWithAgeGroupStats = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Kenya: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			SouthSudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Eritrea: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Somalia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Uganda: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Sudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			Djibouti: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[];
			content: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			[key: string]: any;
		};
	};
	meta: any;
};

export type MigrantsPerCountry = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Kenya: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			SouthSudan: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Eritrea: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Somalia: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Uganda: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Sudan: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			Djibouti: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[];
			content: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			[key: string]: any;
		};
	};
	meta: any;
};

export type RemittancePerCountry = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Kenya: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			SouthSudan: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Eritrea: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Somalia: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Uganda: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Sudan: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			Djibouti: {
				id: number;
				year: string;
				amount: number;
				region: string;
			}[];
			content: string;
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
	meta: any;
};

type Migrant = {
	male: number;
	female: number;
};


type ApiResponseStats = {
	populationStats: PopulationStats;
	populationWithAgeGroup: PopulationWithAgeGroupStats;
	migrantsPerCountry: MigrantsPerCountry;
	refugeesPerCountry: PopulationWithAgeGroupStats;
	remittancePerCountry: RemittancePerCountry;
};
export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	try {
		const populationStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population?populate=*`);

		if (!populationStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const PopulationWithAgeGroupStatsResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/population-with-age-group?populate=*`
		);

		if (!PopulationWithAgeGroupStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${PopulationWithAgeGroupStatsResponse.status}`);
		}


		const migrantsPerCountryResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/migrants-per-country?populate=content,Ethiopia.total,Ethiopia.migrants_15_plus,Ethiopia.labor_force_migrants,Ethiopia.youth_labor_force_migrants,Kenya.total,Kenya.migrants_15_plus,Kenya.labor_force_migrants,Kenya.youth_labor_force_migrants,SouthSudan.total,SouthSudan.migrants_15_plus,SouthSudan.labor_force_migrants,SouthSudan.youth_labor_force_migrants,Eritrea.total,Eritrea.migrants_15_plus,Eritrea.labor_force_migrants,Eritrea.youth_labor_force_migrants,Somalia.total,Somalia.migrants_15_plus,Somalia.labor_force_migrants,Somalia.youth_labor_force_migrants,Uganda.total,Uganda.migrants_15_plus,Uganda.labor_force_migrants,Uganda.youth_labor_force_migrants,Sudan.total,Sudan.migrants_15_plus,Sudan.labor_force_migrants,Sudan.youth_labor_force_migrants,Djibouti.total,Djibouti.migrants_15_plus,Djibouti.labor_force_migrants,Djibouti.youth_labor_force_migrants`
		);

		if (!migrantsPerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${migrantsPerCountryResponse.status}`);
		}

		const refugeesPerCountryResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/refugee?populate=*`);

		if (!refugeesPerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${refugeesPerCountryResponse.status}`);
		}

		const remittancePerCountryResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/remittance?populate=*`
		);

		if (!remittancePerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${remittancePerCountryResponse.status}`);
		}

		const data: ApiResponseStats = {
			populationStats: await populationStatsResponse.json(),
			populationWithAgeGroup: await PopulationWithAgeGroupStatsResponse.json(),
			migrantsPerCountry: await migrantsPerCountryResponse.json(),
			refugeesPerCountry: await refugeesPerCountryResponse.json(),
			remittancePerCountry: await remittancePerCountryResponse.json()
		};

		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
