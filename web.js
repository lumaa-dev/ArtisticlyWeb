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

    console.log(`new from: "${source}"`);

	if (url.endsWith("/")) {
		url.slice(url.length - 1, url.length - 1);
	}

	const data = await (await fetch(`${url}/musics?q=${id}&l=1`, {
		headers: {
			Authorization: code ?? "",
		},
	})).json()

	/**@type {{name: string, artist: string, album: string, artwork: string}} */
	let metadata = data["metadata"];

	const htmlFile = `${__dirname}/dist/index.html`;
	let base = await fs.promises.readFile(htmlFile, 'utf-8');

	var htmlBase = $.load(base);
    
    htmlBase("meta[name=title]").attr('content', `${metadata.name} by ${metadata.artist} - Artisticly`);
    htmlBase("meta[property=og:title]").attr('content', `${metadata.name} by ${metadata.artist} - Artisticly`);
    htmlBase("meta[property=twitter:title]").attr('content', `${metadata.name} by ${metadata.artist} - Artisticly`);

    htmlBase("meta[name=description]").attr("content", "")
    htmlBase("meta[property=og:description]").attr("content", "")
    htmlBase("meta[property=twitter:description]").attr("content", "")

    if (metadata.artwork.length > 0) {
        const b64 = `data:image/png;base64,${metadata.artwork}`;
        htmlBase("meta[name=image]").attr("content", b64)
        htmlBase("meta[property=og:image]").attr("content", b64)
        htmlBase("meta[property=twitter:image]").attr("content", b64)
        htmlBase("meta[property=twitter:card]").attr("content", "summary")
    }

    res.send(htmlBase.html());
}

/**
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
})