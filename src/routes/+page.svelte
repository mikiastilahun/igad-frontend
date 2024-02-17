<script lang="ts">
	import HeroImg from '$lib/assets/hero-img.png?enhanced';
</script>

<div class="">
	<div class="absolute top-0 w-full h-screen max-h-[890px] flex items-center">
		<div
			class="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent"
		></div>
		<enhanced:img
			class="absolute -z-20 top-0 left-0 object-cover w-full h-full max-h-[890px]"
			src={HeroImg}
			alt="LumPad 2.0 tablet"
		/>

		<!-- hero text -->
		<div class="max-w-7xl mx-auto flex">
			<div class=" self-start">
				<h1 class="text-xl font-bold text-white">Migration and Forced Displacement Platform</h1>
				<p class="text-base font-normal text-white">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</div>
</div>
