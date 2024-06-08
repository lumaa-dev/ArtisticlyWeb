const express = require("express");
const fetch = require("node-fetch");
const $ = require("cheerio");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/*", async (req, res) => {
	let url = req.originalUrl;

	if (/\/music\/[0-9]+/gi.test(url)) await updateOpenGraph(req, res);
	if (/\/cover\/[0-9]+/gi.test(url)) await giveCover(req, res);
	else if (
		/\/static\/.+/gi.test(url) ||
		/\.((js)|(css)|(json)|(jpg)|(svg)|(png)|(jpeg)|(ico))$/gi.test(url)
	)
		return res.sendFile(`${__dirname}/dist${url}`);
	else res.sendFile(`${__dirname}/dist/index.html`);
});

/**
 * Updates the default Open Graph data to match the one with the song ID
 * @param {express.Request} req The request object
 * @param {express.Response} res The response object
 */
async function updateOpenGraph(req, res) {
	let { url, code, utm_source: source } = req.query;
	let id = getIdFromLink(req.originalUrl);
	if ((url ?? "").length <= 0) return console.error("No server URL");

	console.log(`new from: "${source ?? "unknown"}"`);

	if (url.endsWith("/")) {
		url.slice(url.length - 1, url.length - 1);
	}

	/**@type {{id: number, metadata: {name: string, artist: string, album: string, artwork: string}}} */
	const data = await (
		await fetch(`${url}/musics?q=${id}&l=1`, {
			headers: {
				Authorization: code ?? "",
			},
		})
	).json();

	/**@type {{name: string, artist: string, album: string, artwork: string}} */
	let metadata = data["metadata"];

	const htmlFile = `${__dirname}/dist/index.html`;
	let base = await fs.promises.readFile(htmlFile, "utf-8");

	var htmlBase = $.load(base);

	htmlBase("meta[property=og:url]").attr("content", `https://music.lumaa.fr/music/${id}?url=${url}`);
	htmlBase("meta[property=twitter:url]").attr("content", `https://music.lumaa.fr/music/${id}?url=${url}`);

	htmlBase("meta[name=title]").attr(
		"content",
		`${metadata.name} by ${metadata.artist} - Artisticly`
	);
	htmlBase("meta[property=og:title]").attr(
		"content",
		`${metadata.name} by ${metadata.artist} - Artisticly`
	);
	htmlBase("meta[property=twitter:title]").attr(
		"content",
		`${metadata.name} by ${metadata.artist} - Artisticly`
	);

	const dsc = `Listen to ${metadata.name} by ${metadata.artist} using Artisticly! Available for free, on all platforms.`;
	htmlBase("meta[name=description]").attr("content", dsc);
	htmlBase("meta[property=og:description]").attr("content", dsc);
	htmlBase("meta[property=twitter:description]").attr("content", dsc);

	htmlBase("meta[property=og:site_name]").attr("content", `Artisticly`);

	if (metadata.artwork.length > 0) {
		const img = `https://music.lumaa.fr/cover/${data.id}?url=${url}&code=${
			code ?? ""
		}`;
		htmlBase("meta[name=image]").attr("content", img);
		htmlBase("meta[property=og:image]").attr("content", img);
		htmlBase("meta[property=twitter:image]").attr("content", img);
		htmlBase("meta[property=twitter:card]").attr("content", "summary");
	}

	res.send(htmlBase.html());
}

/**
 * Returns the album cover file
 * @param {express.Request} req The request object
 * @param {express.Response} res The response object
 */
async function giveCover(req, res) {
	let { url, code } = req.query;
	let id = getIdFromLink(req.originalUrl);
	if ((url ?? "").length <= 0) return console.error("No server URL");

	const data = await (
		await fetch(`${url}/musics?q=${id}&l=1`, {
			headers: {
				Authorization: code ?? "",
			},
		})
	).json();

	/**@type {{name: string, artist: string, album: string, artwork: string}} */
	let metadata = data["metadata"];
	let img = Buffer.from(metadata.artwork, "base64");

	res.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": img.length,
	});
	res.end(img);
}

/**
 * Gets only the song ID from a link
 * @param {string} link The original full link from the request
 * @returns {number} The ID from the link
 */
function getIdFromLink(link) {
	let substring = link.search(/[0-9]+/gi);
	let lastI = link.search(/\?/gi);
	let id = link.substring(substring, lastI > 0 ? lastI : undefined);
	return Number(id);
}

app.listen(port, () => {
	console.log(`SERVER :${port}`);
});
