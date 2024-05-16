import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type PriorityArea = {
	data: {
		id: number;
		attributes: {
			Title: string;
			ShortDescription: string;
			Content: string;
			IgadActions: {
				id: number;
				ActionTitle: string;
				actionItemList: { item: string }[];
			}[];
			memberStateActions: {
				id: number;
				ActionTitle: string;
				item: string;
			}[];
			expectedOutcomes: {
				id: number;
				item: string;
			}[];
			partners: {
				id: number;
				label: string;
				url: string;
			}[];
			stackholders: {
				id: number;
				label: string;
				url: string;
			}[];
			icon: {
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
		};
	};
	meta: any;
};

export type ApiResponse = {
	priorityArea: PriorityArea;
};

export const load: Load = async ({ fetch, params }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const priorityAreaResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/priority-areas/${params.id}?populate=*,IgadActions.actionItemList,icon,expectedOutcomes,,stackholders,partners`
		);

		console.log({ priorityAreaResponse });
		if (!priorityAreaResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreaResponse.status}`);
		}

		const priorityArea = await priorityAreaResponse.json();

		const data: ApiResponse = {
			priorityArea: priorityArea
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
