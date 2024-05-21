import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type Publication = {
	data: {
		id: number;
		attributes: {
			title: string;
			content: string;
			publicationDate: string;
			featured: boolean;
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
						width: number;
						height: number;
						url: string;
					};
				}[];
			};
		};
	};
	meta: any;
};

export type ApiResponse = {
	publication: Publication;
};

export const load: Load = async ({ fetch, params }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const publicationResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/publications/${params.id}?populate=*`
		);

		console.log({ publicationResponse });
		if (!publicationResponse.ok) {
			throw new Error(`HTTP error! status: ${publicationResponse.status}`);
		}

		const publication = await publicationResponse.json();

		const data: ApiResponse = {
			publication: publication
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
