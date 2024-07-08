<script lang="ts">
	export let priorityAreasLinks: { title: string; slug: string }[];
	export let quickLinks: { label: string; href: string }[];
</script>

<div class=" bg-[#252525] text-white">
	<div class="mx-auto max-w-7xl px-4 py-10 lg:px-16">
		<div class="flex w-full flex-col justify-between text-left lg:flex-row">
			<div class="flex-1 pr-[10%]">
				<img
					width="220"
					class="mb-4"
					src="https://igad.int/wp-content/uploads/2021/07/White-Logo.svg"
					alt="IGAD Logo"
				/>
				<div>
					<p class="pb-5 text-sm">
						IGAD Secretariat Avenue Georges Clemenceau,
						<br />
						P.O. Box 2653 Djibouti,
						<br />
						Republic of Djibouti
					</p>
					<p class="pb-5 text-sm">
						+253-21354050
						<br />
						+253-21356994<br />
						<a
							class="text-xs leading-9 text-[#AEB6C7]"
							href="https://igad.int/privacy-policy/"
							target="_blank"
							rel="noopener">Privacy Policy |</a
						>
						<a
							class="text-xs leading-9 text-[#AEB6C7]"
							href="https://igad.int/cookie-policy/"
							target="_blank"
							rel="noopener"
						>
							Cookie Policy</a
						>
					</p>
				</div>
			</div>
			<div class="flex-shrink-[1] flex-grow-[1] text-left">
				<div class="flex h-full w-full flex-col flex-wrap justify-between">
					<div class="mb-3 flex flex-wrap justify-between text-left">
						<div class="flex flex-col">
							<h6 class="text-bold">About IGAD</h6>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/team"> The Team </a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/policies">
								Policies and Frameworks
							</a>
							<a
								class="text-xs leading-9 text-[#AEB6C7]"
								target="_blank"
								href="https://igadsupportplatform.org/"
							>
								Support Platforms
							</a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/projects"> Projects </a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="https://igad.int/contact-us/">
								Contact Us
							</a>
						</div>
						<div class="flex flex-col">
							<h6 class="text-bold">Priority Areas</h6>
							{#each priorityAreasLinks as priority}
								<a class="text-xs leading-9 text-[#AEB6C7]" href="/priority-area/{priority.slug}">
									{priority.title}
								</a>
							{/each}
						</div>
						<div class="flex flex-col">
							<h6 class="text-bold">Resources</h6>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/publications">
								Report and Publications
							</a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/learning">
								Research and Learning
							</a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/news"> News and Updates </a>
							<a class="text-xs leading-9 text-[#AEB6C7]" href="/events"> Upcoming Events </a>
						</div>
						<div class="flex flex-col">
							<h6 class="text-bold">Quick Links</h6>
							{#each quickLinks as link}
								<a class="text-xs leading-9 text-[#AEB6C7]" target="_blank" href={link.href}
									>{link.label}</a
								>
							{/each}
						</div>
					</div>
					<div class="flex justify-between">
						<div>
							<p class="text-xs">© 2024 Copyright. IGAD Migration and Statistics</p>
						</div>
						<div>
							<a href="https://www.facebook.com/igadsecretariat/" target="_blank" rel="noopener"
								><i class="fab fa-facebook"></i></a
							>
							<a href="https://twitter.com/igadsecretariat/" target="_blank" rel="noopener"
								><i class="fab fa-twitter"></i></a
							>
							<a
								href="https://www.youtube.com/channel/UCDgq86NAvL74tvpQx614qig/"
								target="_blank"
								rel="noopener"><i class="fab fa-youtube"></i></a
							>

							<a href="https://www.instagram.com/igad_secretariat/" target="_blank" rel="noopener"
								><i class="fab fa-instagram"></i></a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
