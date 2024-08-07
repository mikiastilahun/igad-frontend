import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type Publication = {
	data: {
		id: number;
		attributes: {
			title: string;
			mainContent: string;
			publicationDate: string;
			featured: boolean;
			slug: string;
			publication_type: {
				data: {
					attributes: {
						type: string;
					};
				};
			};
			coverImage: {
				data: {
					id: number;
					attributes: {
						name: string;
						width: number;
						height: number;
						url: string;
					};
				};
			};
			files: {
				data: {
					id: number;
					attributes: {
						name: string;
						url: string;
					};
				};
			}[];
		};
	}[];
	meta: any;
};

type ApiResponse = {
	publications: Publication;
	featuredPublications: Publication;
	publicationTypes: string[];
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


	try {
		const response = await fetch(`${PUBLIC_STRAPI_URL}/api/publications?populate=*`);

		const featuredPublicationsResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/publications?featured=true&populate=*`
		);

		const publicationTypesResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/publication-types`);

		console.log({ response });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		if (!featuredPublicationsResponse.ok) {
			throw new Error(`HTTP error! status: ${featuredPublicationsResponse.status}`);
		}

		if (!publicationTypesResponse.ok) {
			throw new Error(`HTTP error! status: ${publicationTypesResponse.status}`);
		}

		const data: ApiResponse = {
			publications: await response.json(),
			featuredPublications: await featuredPublicationsResponse.json(),
			publicationTypes: (await publicationTypesResponse.json()).data.map(
				(type: { attributes: { type: string } }) => type.attributes.type
			)
		};


		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
