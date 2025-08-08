import got from 'got';
import superagent from 'superagent';
import { download as _download } from 'wget-improved';
import fs from 'fs';
import { createCommonJS } from 'mlly'
const { __dirname, __filename, require } = createCommonJS(import.meta.url)
import sharp from 'sharp'

const response = await superagent.get("https://raw.githubusercontent.com/luongz/iptv-jp/refs/heads/main/jp.m3u");
const body_array = response.text.split(/\r\n|\r|\n/);

let chArray = [];
let urlArray = [];

body_array.forEach((line) => {
    // console.log(line);
    if (line.startsWith('#EXTINF:-1 group-title="Information"')) {
        return;
    }
    if (line.startsWith('https://google.com')) {
        return;
    }
    if (line.startsWith('https://example.com')) {
        return;
    }
    if (line.startsWith('https://vn.utako.moe/test/intro.mp4/index.m3u8')) {
	return;
    }
    if (line.startsWith('#EXTINF')) {
        console.log(line);
        let line_array = line.split(',');
        let chName = line_array[1];

		let line_array_array = line_array[0].split(" ");
		let groupTitle = line_array_array[1].split("=")[1].replaceAll('"', '');
		let tvgId = line_array_array[2].split("=")[1].replaceAll('"', '');
		let tvgLogo = line_array_array[3].split("=")[1].replaceAll('"', '');

		minifyTvgLogo(tvgLogo, tvgId);

		let datum = {
			name: chName,
			groupTitle: groupTitle,
			tvgId: tvgId,
			tvgLogo: "image/" + tvgId + ".png",
		};

		chArray.push(datum);
		return;
	}
	if (line.startsWith('http')) {
		console.log(line);
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
fs.writeFile('public/json/luongz.iptv-jp.json', JSON.stringify(chArray), err => {
	if (err) {
		console.log(err.message);

		throw err;
	}

	console.log('data written to file');
});


function minifyTvgLogo(tvgLogo, tvgId) {
	console.log(tvgLogo, tvgId);

	const filename_sharpen = "public/image/" + tvgId + ".png";
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
				// console.log(err, info);
				if (err) {
					return tvgLogo;
				}
			});
		return filename_sharpen;
	})();
}
