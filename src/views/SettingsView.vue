<template>
	<div class="settings section">
		<div class="v center">
			<h1>Server</h1>
			<input
				type="url"
				v-model="serverUrl"
				name="server"
				id="server"
				placeholder="Server URL"
			/>
			<input
				type="text"
				v-model="accessCode"
				name="code"
				id="code"
				placeholder="Access Code"
			/>
			<button @click="checkServer" class="styled">
				<p>{{ validated ? authenticated ? "Logged in" : "Updated" : "Update" }}</p>
			</button>
		</div>
	</div>
</template>

<script>
	import {
		getArtisticlyServer,
		setServer,
		isCorrectCode,
		hasVerified,
		setName,
	} from "@/artisticly.js";

	export default {
		data() {
			return {
				serverUrl: "https://artisticly.lumaa.fr",
				accessCode: "Artisticly",
				authenticated: false,
        validated: false,
			};
		},
		methods: {
			async checkServer() {
				if (this.serverUrl.startsWith("http")) {
					setServer(this.serverUrl, this.accessCode);
					let info = await getArtisticlyServer();
					let valid = info["artisticly"] == true;
					if (valid) {
            let codeValid = await isCorrectCode()
            hasVerified(true);
            this.validated = true;
						this.authenticated = codeValid;
						setName(info["username"]);
						console.log("Validated credentials");
					}
				}
			},
		},
	};
</script>

<style scoped>
	.v {
		display: flex;
		flex-direction: column;
		width: fit-content;
		gap: 2vh;
	}

	.v.center {
		align-items: center;
		width: 100vw;
	}

	.v.center * {
		width: fit-content;
	}

	.settings input {
		width: 25vw !important;
	}

	@media screen and (max-width: 900px) {
		.settings input {
			width: 70vw !important;
		}
	}
</style>
