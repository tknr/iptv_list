import got from 'got';
import superagent from 'superagent';
import { download as _download } from 'wget-improved';
import fs from 'fs';
import { createCommonJS } from 'mlly'
const { __dirname, __filename, require } = createCommonJS(import.meta.url)
import sharp from 'sharp'

const response = await superagent.get("https://github.com/Free-TV/IPTV/raw/refs/heads/master/playlists/playlist_japan.m3u8");
const body_array = response.text.split(/\r\n|\r|\n/);

let chArray = [];
let urlArray = [];

body_array.forEach((line) => {
	// console.log(line);
	if (line.startsWith('#EXTM3U')) {
		return;
	}
	if (line.startsWith('#EXTINF')) {
		console.log('line', line);
		let line_array = line.split(',');
		let chName = line_array[1];

		let groupTitle = line_array[0].match(/group-title="([^"]+)"/)[1];
		let tvgLogo = line_array[0].match(/tvg-logo="([^"]+)"/)[1];

		let minifyLogo = minifyTvgLogo(tvgLogo).then((minifyLogo)=>{
			console.log({'minifyLogo':minifyLogo});
		        let datum = {
                        	name: chName,
                        	groupTitle: groupTitle,
                        	tvgLogo: "image/" +getBaseFileName(tvgLogo),
                	};
                	console.log(datum);
                	chArray.push(datum);
		});
		return;
	}
	if (line.startsWith('http')) {
		console.log('line startswith http', line);
		urlArray.push(line);
		return;
	}
});

chArray.forEach((datum, index) => {
	let url = urlArray[index];
	datum.url = url;
	chArray[index] = datum;
})

console.log(chArray);
fs.writeFile('public/json/iptv-japan.json', JSON.stringify(chArray), err => {
	if (err) {
		console.error(err.message);
		throw err;
	}

	console.log('data written to file');
});

function getBaseFileName(tvgLogo){
	console.log(getBaseFileName.name, tvgLogo);
	let baseFilename = tvgLogo.split('/').slice().reverse()[0];
	return baseFilename;
}

async function minifyTvgLogo(tvgLogo){
	console.log(minifyTvgLogo.name, tvgLogo);

	let baseFileName = getBaseFileName(tvgLogo);
	console.log({'baseFileName':baseFileName});

	const filename_sharpen = "public/image/" + baseFileName;
	console.log({'filename_sharpen':filename_sharpen});
	(async () => {
		const imageBuffer = await got(tvgLogo).buffer();

		// Resize the image using sharp
		await sharp(imageBuffer)
			.resize(64, null)
			.png({
				pallete: true,
				effort: 10,
				quality: 70,
				compressionLevel: 9
			})
			.toFile(filename_sharpen, (err, info) => {
				// console.error(err, info);
				if (err) {
					return tvgLogo;
				}
			});
		return filename_sharpen;
	})();
}
