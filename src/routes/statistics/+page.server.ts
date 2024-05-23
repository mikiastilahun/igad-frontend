import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { PopulationStats } from '../+page.server.js';


export type AgeGroup = 'age 0-4' |
	'age 5-9' |
	'age 10-14' |
	'age 15-19' |
	'age 20-24' |
	'age 25-29' |
	'age 30-34' |
	'age 35-39' |
	'age 40-44' |
	'age 45-49' |
	'age 50-54' |
	'age 55-59' |
	'age 60-64' |
	'age 65-69' |
	'age 70-74' |
	'age 75-79' |
	'age 80+';
export type PopulationPerCountryStats = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Kenya: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			SouthSudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Eritrea: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Somalia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Uganda: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Sudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Djibouti: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
	meta: any;
}

type ApiResponseStats = {
	populationStats: PopulationStats;
	populationPerCountry: PopulationPerCountryStats;
}
export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	try {
		const populationStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population?populate=*`);

		if (!populationStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const populationPerCountryStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population-per-country?populate=*`);

		if (!populationPerCountryStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}


		const data: ApiResponseStats = {
			populationStats: await populationStatsResponse.json(),
			populationPerCountry: await populationPerCountryStatsResponse.json(),
		};



		return { data }
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
