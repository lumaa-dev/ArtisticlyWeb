var api = "https://artisticly.lumaa.fr";
var accessCode = "Artisticly";
var name = "Unknown";
var verified = false;

async function getArtisticlyServer() {
	return await fetch(`${api}/`).then(async (blob) => {
		return await blob.json();
	});
}

async function getSongs(page = 1) {
	if (!verified) return console.warn("Unverified server URL");

	const limit = 20;

	return await fetch(`${api}/musics?l=${limit}&p=${page}`, {
		headers: { Authorization: accessCode },
	}).then(async (blob) => {
		return await blob.json();
	});
}

async function getSongData(id) {
	if (!verified) return console.warn("Unverified server URL");

	const limit = 1;

	return await fetch(`${api}/musics?l=${limit}&q=${Number(id)}`, {
		headers: { Authorization: accessCode },
	}).then(async (blob) => {
		return await blob.json();
	});
}

function getSongFileUrl(id = 1) {
	if (!verified) return console.warn("Unverified server URL");

	return `${api}/music/${id}`;
}

async function isCorrectCode() {
	return await fetch(`${api}/code`, {
		headers: { Authorization: accessCode },
	}).then(async (blob) => {
		return (await blob.json())["correct"] == true;
	});
}

/**
 *
 * @param {string} serverUrl
 * @param {*} code
 */
function setServer(serverUrl, code) {
	if (serverUrl.endsWith("/")) {
		serverUrl.slice(serverUrl.length - 1, serverUrl.length - 1);
	}
	api = serverUrl;
	accessCode = code;
}

function hasVerified(bool) {
	verified = bool;
}

function isVerified() {
	return verified;
}

function setName(newName) {
	name = newName;
}

function getName() {
	return name;
}

module.exports = {
	getArtisticlyServer,
	setServer,
	isCorrectCode,
	hasVerified,
	isVerified,
	getSongData,
	getSongs,
	getSongFileUrl,
	setName,
	getName,
};
