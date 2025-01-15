import fs from 'fs';
import { minify } from 'minify';
import tryToCatch from 'try-to-catch';

const map = {
	"src/js/main.js": "public/js/main.min.js",
};

for (const src in map) {
	const dst = map[src];
	console.log(src, dst);
	const [error, data] = await tryToCatch(minify, src);
	if (error) {
		console.error(error);
	} else {
		fs.writeFile(dst, data, err => {
			if (err) {
				console.log(err.message);

				throw err;
			}

			console.log('data written to file');
		});
	}
}
