<template>
	<NavBar />
	<router-view />
</template>

<script>
	import NavBar from "@/components/NavBar.vue";

	export default {
		name: "HomeView",
		components: {
			NavBar,
		},
	};
</script>

<style>
	@font-face {
		font-family: "SF Pro";
		src: url("./assets/SF-Pro.ttf");
	}

	:root {
		--branded: #dd5205;
		--bg: #1e1e1e;
		--txt: #fff;
		--font: "SF Pro", Arial, sans-serif;
	}

	* {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	body {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: var(--txt);
		background: var(--bg);
		font-family: var(--font);
		padding-bottom: 10vh;
	}

	a {
		color: var(--txt);
		text-decoration: none;
	}

	a.router-link-active {
		color: var(--branded);
		font-weight: 700;
	}

	input[type="text"],
	input[type="url"] {
		background: #0000003f;
		outline: none;
		border: 0;
		padding: 15px 20px;
		font-size: 15px;
		font-family: var(--font);
		border-radius: 20vw;
		color: var(--txt);
	}

	button.styled {
		background: var(--branded);
		color: var(--bg);
		outline: none;
		border: 0;
		padding: 15px 20px;
		font-size: 17px;
		font-family: sans-serif;
		border-radius: 20vw;
		cursor: pointer;
	}

	.section {
		padding: 10px 0;
	}

	.mobile {
		display: none;
	}

	.song {
		display: flex;
		flex-direction: row;
		gap: 6vw;
		align-items: center;
		margin: 0 5vw;
		padding: 0.5vw 3vw;
		background: #ffffff20;
		text-align: left;
	}

	.song p {
		font-size: 2.2vh;
	}

	.song p.caption {
		font-size: 1.3vh;
		color: #ffffffa0;
	}

	.song:not(:first-child) {
		border-top: 1px #0000003d solid;
	}

	.song:first-child {
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
	}

	.song:last-child {
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.song img {
		width: 3.25vw;
		aspect-ratio: 1 / 1;
		border-radius: 7.5px;
	}

	@media screen and (max-width: 900px) {
		.song {
			gap: 10vw;
			margin: 0 5vw;
			padding: 2vw 3vw;
		}

		.song p {
			font-size: 2vw;
		}

		.song img {
			width: 10vw;
		}

		.mobile {
			display: initial;
		}

		.screen {
			display: none;
		}

		.song p {
			font-size: 4vw;
		}
	}

	@media screen and (min-width: 900px) {
		button.styled:hover {
			filter: brightness(0.8);
		}
	}
</style>
