<template>
	<div class="home section">
		<h1>{{ name }}'s Library</h1>
		<div class="songs">
			<SongRow
				v-for="item in songs"
				:key="item"
				:item="item"
				@click="playSong(item)"
				:id="item['id']"
			/>
		</div>
		<button @click="getMoreSongs" class="styled load" v-if="hasMore">
			<p>Load more</p>
		</button>
	</div>
	<NowPlaying
		v-if="playingId != -1"
		:item="playingItem"
		@click="playSong(playingItem)"
	/>
</template>

<style scoped>
	h1 {
		padding: 7.5vw 0;
	}

	.songs {
		margin-bottom: 5vh;
		cursor: pointer;
	}
</style>

<script>
	import router from "@/router";
	import {
		getName,
		getSongFileUrl,
		getSongs,
		isVerified,
	} from "@/artisticly.js";
	import SongRow from "@/components/SongRow.vue";
	import NowPlaying from "@/components/NowPlaying.vue";

	export default {
		data() {
			return {
				songs: [],
				name: "",
				hasMore: true,
				loadedPages: 1,
				/**@type {HTMLAudioElement} */
				audioPlayer: null,
				playingId: -1,
				playingItem: null,
			};
		},
		components: {
			SongRow,
			NowPlaying,
		},
		async beforeRouteEnter(to, from, next) {
			const songs = await getSongs();
			next((vm) => vm.setSongs(songs));
		},
    beforeRouteLeave() {
      if (this.audioPlayer) {
        this.audioPlayer.pause()
      }
    },
		beforeMount() {
			let v = isVerified();
			if (!v) {
				router.push("/settings");
			}
		},
		methods: {
			setSongs(songs) {
				this.songs = songs;
				this.name = getName();
				if (this.songs) {
					this.hasMore = this.songs.length >= 20;
				}
			},

			async getMoreSongs() {
				this.loadedPages += 1;
				let newSongs = await getSongs(this.loadedPages);
				this.hasMore = newSongs.length >= 20;
				this.songs.push(...newSongs);
			},

			playSong(item) {
				const id = item["id"];
				if (this.audioPlayer) {
					if (id == this.playingId) {
						if (!this.audioPlayer.paused) {
							this.audioPlayer.pause();
						} else {
							this.audioPlayer.play();
						}
					} else {
						this.audioPlayer.pause();
						this.playingItem = null;
						this.playingId = -1;
					}
				}
				if (id !== this.playingId) {
					this.audioPlayer = new Audio(`${getSongFileUrl(id)}`);
					this.audioPlayer.play();

					setTimeout(() => {
						this.playingItem = item;
						this.playingId = id;
					}, 0.15 * 1000);

					const el = document.getElementById(`${id}`);
					const play = document.querySelector(`.song.playing`);
					if (play) {
						play.classList.remove("playing");
					}
					el.classList.add("playing");
				}
			},
		},
	};
</script>
