import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type PriorityArea = {
	data: {
		id: number;
		attributes: {
			Title: string;
			header: string;
			ShortDescription: string;
			mainContent: string;
			IgadActions: {
				id: number;
				ActionTitle: string;
				actionItemList: { item: string }[];
			}[];
			memberStateActions: {
				id: number;
				ActionTitle: string;
				actionItemList: { item: string }[];
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
type PriorityAreas = {
	data: {
		id: number;
		attributes: {
			Title: string;
			header: string;
			ShortDescription: string;
			mainContent: string;
			IgadActions: {
				id: number;
				ActionTitle: string;
				actionItemList: { item: string }[];
			}[];
			memberStateActions: {
				id: number;
				ActionTitle: string;
				actionItemList: { item: string }[];
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
	}[];
	meta: any;
};

export type ApiResponse = {
	priorityArea: PriorityArea;
	priorityAreas: PriorityAreas;
};

export const load: Load = async ({ fetch, params }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const priorityAreaResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/priority-areas/${params.id}?populate=*,IgadActions.actionItemList,icon,expectedOutcomes,,stackholders,partners,memberStateActions.actionItemList`
		);

		console.log({ priorityAreaResponse });
		if (!priorityAreaResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreaResponse.status}`);
		}

		const priorityAreasResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/priority-areas?populate=*`);

		if (!priorityAreasResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreasResponse.status}`);
		}

		const priorityArea = await priorityAreaResponse.json();
		const priorityAreas = await priorityAreasResponse.json();

		const data: ApiResponse = {
			priorityArea: priorityArea,
			priorityAreas: priorityAreas
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
