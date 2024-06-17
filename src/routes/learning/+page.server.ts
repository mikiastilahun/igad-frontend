import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type LearningMaterial = {
    data: {
        id: number;
        attributes: {
            title: string;
            description: string;
            URL: string;
            thumbnail: {
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
            learning_material_type: LearningMaterialType,
            createdAt: string;
            updatedAt: string;

        };
    }[];
    meta: any;
};

type LearningMaterialType = {
    data: {
        id: number;
        attributes: {
            type: string;
        }
    }
}

type ApiResponse = {
    learningMaterial: LearningMaterial;
    learningMaterialType: string[];
};

export const load: Load = async ({ fetch }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


    try {
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/learning-links?populate=*`);


        const learningMaterialTypesResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/learning-material-types`);


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!learningMaterialTypesResponse.ok) {
            throw new Error(`HTTP error! status: ${learningMaterialTypesResponse.status}`);
        }

        const data: ApiResponse = {
            learningMaterial: await response.json(),
            learningMaterialType: (await learningMaterialTypesResponse.json()).data.map(
                (type: { attributes: { type: string } }) => type.attributes.type
            )
        };

        return { data };
    } catch (e: unknown) {
        console.log({ e });
        return { error: (e as Error).message };
    }
};
