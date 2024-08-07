
import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

export const load: Load = async ({ fetch, params }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/projects?filters[slug][$eq]=${params.slug}&populate=*`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }



        const projects = await response.json();

        console.log({ 'projects====': projects.data[0] });

        return {
            projects: projects.data[0]
        };
    } catch (e: unknown) {
        console.log({ e });
        return { error: (e as Error).message };
    }
};