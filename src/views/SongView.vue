<template>
	<div class="showcase" @click="playSong">
		<div class="data" v-if="song != null">
			<img
				:src="coverArt"
				:alt="
					'Cover of ' +
					song['metadata']['name'] +
					' by ' +
					song['metadata']['artist']
				"
				draggable="false"
			/>
			<p class="title">{{ song["metadata"]["name"] }}</p>
			<p class="artist">{{ song["metadata"]["artist"] }}</p>
			<p class="tip" v-if="audioPlayer == null">Tap to play and pause</p>
		</div>
	</div>
</template>

<script>
	import router from "@/router";
	import {
		getArtisticlyServer,
		getSongFileUrl,
		getSongData,
		hasVerified,
		isVerified,
		setServer,
		setName,
	} from "@/artisticly.js";
	import img from "@/assets/artisticly-colorized.jpg";

	export default {
		data() {
			return {
				song: null,
				id: -1,
				/**@type {HTMLAudioElement} */
				audioPlayer: null,
				playingItem: false,
				coverArt: "",
			};
		},
		async beforeRouteEnter(to, from, next) {
			let { id } = to.params;
			if (!id) return;

			let { url, code } = to.query;
			if (url) {
				setServer(url, code ?? "");
				let info = await getArtisticlyServer();
				let valid = info["artisticly"] == true;
				hasVerified(valid);
				setName(info["username"]);
			}
			const song = await getSongData(id);
			next((vm) => vm.setSong(id, song));
		},
		beforeRouteLeave() {
			if (this.audioPlayer) {
				this.audioPlayer.pause();
			}
		},
		beforeMount() {
			let v = isVerified();
			if (!v) {
				router.push("/settings");
			}
		},
		methods: {
			setSong(id, song) {
				this.id = id;
				this.song = song;

				if (this.song["metadata"]["artwork"].length > 0) {
					this.coverArt =
						"data:image/png;base64," + this.song["metadata"]["artwork"];
				} else {
					this.coverArt = img;
				}
			},

			playSong() {
				if (this.id == -1) return console.error("ID isn't correct");
				if (this.audioPlayer) {
					if (this.playingItem) {
						if (!this.audioPlayer.paused) {
							this.audioPlayer.pause();
						} else {
							this.audioPlayer.play();
						}
					} else {
						this.audioPlayer.pause();
						this.playingItem = false;
					}
				}
				if (this.playingItem == false) {
					this.audioPlayer = new Audio(`${getSongFileUrl(this.id)}`);
					this.audioPlayer.play();

					setTimeout(() => {
						this.playingItem = true;
					}, 0.15 * 1000);
				}
			},
		},
	};
</script>

<style scoped>
	.showcase {
		width: 100vw;
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.showcase img {
		border-radius: 6%;
		width: 30vh;
		height: 30vh;
	}

	.showcase .title {
		font-weight: 700;
		padding: 2vh;
		font-size: 26px;
	}

	.showcase .artist {
		font-size: 15px;
		color: #ffffff5d;
	}

	.showcase .tip {
		font-weight: 700;
		padding-top: 10vh;
		font-size: 21px;
	}
</style>
