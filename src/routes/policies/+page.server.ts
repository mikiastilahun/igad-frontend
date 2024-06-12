import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type Policy = {
	data: {
		id: number;
		attributes: {
			title: string;
			description: string;
			section: {
				title: string;
				content: string;
				subSection: {
					title: string;
					content: string;
				}[];
				files: {
					data: {
						id: number;
						attributes: {
							name: string;
							url: string;
						};
					}[];
				};
			}[];
		};
	};
	meta: any;
};

type ApiResponse = {
	policy: Policy;
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';



	try {
		const response = await fetch(
			`${PUBLIC_STRAPI_URL}/api/policy?populate=section.subSection,section.files`
		);

		console.log({ response });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: ApiResponse = {
			policy: await response.json()
		};


		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
