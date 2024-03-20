<script>
	import { page } from '$app/stores';
</script>

<div
	class="bg-gugut-bg h-screen grid justify-items-center place-content-center text-6xl w-full text-primary"
>
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>
