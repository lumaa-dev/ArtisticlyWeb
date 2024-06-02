<template>
	<div class="nowplaying">
		<div class="song blur">
			<img :src="coverArt" alt="Cover art" draggable="false" />
			<div>
				<p>{{ item["metadata"]["name"] }}</p>
				<p class="caption">{{ item["metadata"]["artist"] }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import img from "@/assets/artisticly-colorized.jpg";

	export default {
		props: {
			item: Object,
		},
		data() {
			return {
				coverArt: "",
			};
		},
		mounted() {
			if (this.item["metadata"]["artwork"].length > 0) {
				this.coverArt =
					"data:image/png;base64," + this.item["metadata"]["artwork"];
			} else {
				this.coverArt = img;
			}
		},
	};
</script>

<style scoped>
	.nowplaying {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 10vh;
        cursor: pointer;
	}

    .blur {
        backdrop-filter: blur(2em);
    }
</style>
