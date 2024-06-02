<template>
	<nav>
		<div class="left">
			<router-link to="/">
				<img
					class="screen unselected"
					src="../assets/artisticly_wordmark-transp.png"
					alt="Artisticly Icon"
					srcset=""
				/>
				<img
					class="mobile unselected"
					src="../assets/artisticly.svg"
					alt="Artisticly Icon"
					srcset=""
				/>
				<img
					class="screen selected"
					src="../assets/artisticly_wordmark-colorized.jpg"
					alt="Artisticly Icon"
					srcset=""
				/>
				<img
					class="mobile selected"
					src="../assets/artisticly-colorized.jpg"
					alt="Artisticly Icon"
					srcset=""
				/>
			</router-link>
			<!-- <router-link to="/add">
				<p>Add</p>
			</router-link> -->
		</div>
		<div class="right">
			<router-link to="/settings">
				<p>Settings</p>
			</router-link>
		</div>
	</nav>
</template>

<style scoped>
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 2vw;
		background: #0000002a;
		backdrop-filter: blur(2em);
		font-size: 1.7vw;
	}

	nav * {
		max-height: 10vh;
		overflow: hidden !important;
	}

	nav div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2vw;
	}

	nav .selected {
		display: none;
		border-radius: 25px;
	}

	nav a.router-link-active .selected:not(.mobile) {
		display: initial;
	}

	nav a.router-link-active .unselected:not(.mobile) {
		display: none;
	}

	nav,
	img {
		height: 10vh;
	}

	@media screen and (max-width: 900px) {
		nav {
			font-size: 4vw;
			padding: 0 5vw;
		}

		nav div {
			gap: 5vw;
		}

		nav a.router-link-active .selected:not(.screen) {
			display: initial;
		}

		nav a.router-link-active .unselected:not(.screen) {
			display: none;
		}

		nav .unselected:not(.mobile) {
			display: none !important;
		}

		nav a.router-link-active .selected:not(.mobile) {
			display: none !important;
		}
	}
</style>
