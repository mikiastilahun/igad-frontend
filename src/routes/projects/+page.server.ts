import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type ProjectType = {
    id: number;
    attributes: {
        name: string;
        implementing_organization: string;
        region: string;
        funding_organization: string;
        budget: number;
        duration: {
            component: 'time-span.duration';
        };
        objectives: {
            component: 'plugin::ckeditor.CKEditor';
            output: 'HTML';
            preset: 'rich';
        };
        key_outcomes: {
            component: 'plugin::ckeditor.CKEditor';
            output: 'HTML';
            preset: 'rich';
        };
        major_activities_and_achievement: {
            component: 'plugin::ckeditor.CKEditor';
            output: 'HTML';
            preset: 'rich';
        };
        project_background: {
            component: 'plugin::ckeditor.CKEditor';
            output: 'HTML';
            preset: 'standard';
        };
        cover_image: {
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
        };
    };
};

type ApiResponse = {
    projects: {
        data: ProjectType[];
        meta: {
            pagination: {
                page: number;
                pageCount: number;
                pageSize: number;
                total: number
            }
        }
    }
}

export const load: Load = async ({ fetch }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/projects?populate=*`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }



        const
            projects = await response.json()





        return {
            projects
        };
    } catch (e: unknown) {
        console.log({ e });
        return { error: (e as Error).message };
    }
};
