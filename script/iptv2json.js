import got from 'got';
import axios, { isCancel, AxiosError } from "axios";
//import { download as _download } from 'wget-improved';
import fs from 'fs';
import { createCommonJS } from 'mlly'
const { __dirname, __filename, require } = createCommonJS(import.meta.url)
import sharp from 'sharp'

const URL = "https://github.com/Free-TV/IPTV/raw/refs/heads/master/playlists/playlist_japan.m3u8";

axios.get(URL)
	.then((res) =>{
		// console.log(res.data);
		const body_array = res.data.split(/\r\n|\r|\n/);
		// console.log(body_array);
		let chArray = [];
		let urlArray = [];

		body_array.forEach((line) => {
			console.log(line);
			if (line.startsWith('#EXTM3U')) {
				return;
			}
			else if (line.startsWith('#EXTINF')) {
				let line_array = line.split(',');
				let chName = line_array[1];

				let groupTitle = '';
				let tvgLogo = '';
				let tvgLogoUrl = '';
				try{
					groupTitle = line_array[0].match(/group-title="([^"]+)"/)[1];
					tvgLogo = line_array[0].match(/tvg-logo="([^"]+)"/)[1];
				}catch(e){
					console.error(e);
				}
				if(tvgLogo.length > 0) {
					minifyTvgLogo(tvgLogo);
					tvgLogoUrl = "image/" + getBaseFileName(tvgLogo);
				}
				let datum = {
					name: chName,
					groupTitle: groupTitle,
					tvgLogo: tvgLogoUrl,
				};
				chArray.push(datum);
				return;
			}
			else {
				console.log('line startswith http', line);
				urlArray.push(line);
				return;
			}
		});

		console.log({ 'chArray': chArray });
		console.log({ 'urlArray': urlArray });

		chArray.forEach((datum, index) => {
			let url = urlArray[index];
			datum.url = url;
			console.log({ 'datum': datum });
			chArray[index] = datum;
		})

		console.log({ 'chArray': chArray });
		fs.writeFile('public/json/iptv-japan.json', JSON.stringify(chArray), err => {
			if (err) {
				console.error(err.message);
				throw err;
			}

			console.log('data written to file');
		});
	})
	.catch(err => {
		console.error(err);
	});


function getBaseFileName(tvgLogo) {
	console.log(getBaseFileName.name, tvgLogo);
	let baseFilename = tvgLogo.split('/').slice().reverse()[0];
	return baseFilename;
}

async function minifyTvgLogo(tvgLogo) {
	console.log(minifyTvgLogo.name, tvgLogo);

	let baseFileName = getBaseFileName(tvgLogo);
	console.log({ 'baseFileName': baseFileName });

	const filename_sharpen = "public/image/" + baseFileName;
	console.log({ 'filename_sharpen': filename_sharpen });
	(async () => {
		try {
			const imageBuffer = await got(tvgLogo).buffer();

			// Resize the image using sharp
			sharp(imageBuffer)
				.resize(64, null)
				.png({
					pallete: true,
					effort: 10,
					quality: 70,
					compressionLevel: 9
				})
				.toFile(filename_sharpen, (err, info) => {
					if (err) {
						console.error(err);
					}
					if (info) {
						// console.log(info);
					}
				});
		} catch( error ) {
			console.error(error);
		}
	})();
}
