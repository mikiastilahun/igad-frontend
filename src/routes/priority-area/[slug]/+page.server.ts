import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type PriorityArea = {
	attributes: {
		title: string;
		header: string;
		shortDescription: string;
		mainContent: string;
		slug: string;
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

	meta: any;
};
type PriorityAreas = {
	data: {
		id: number;
		attributes: {
			title: string;
			header: string;
			shortDescription: string;
			mainContent: string;
			slug: string;
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


	try {
		const priorityAreasResponse = await fetch(
			`${PUBLIC_STRAPI_URL}/api/priority-areas?populate=*,IgadActions.actionItemList,icon,expectedOutcomes,,stackholders,partners,memberStateActions.actionItemList`
		);

		if (!priorityAreasResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreasResponse.status}`);
		}

		const priorityAreas = await priorityAreasResponse.json();
		const priorityArea = priorityAreas.data.find(
			(area: any) => area.attributes.slug === params.slug
		);



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
