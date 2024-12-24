import fs from 'fs';
import superagent from "superagent";
const response = await superagent.get("https://raw.githubusercontent.com/luongz/iptv-jp/refs/heads/main/jp.m3u");
const body_array = response.text.split(/\r\n|\r|\n/);
let chArray = [];
let urlArray = [];
body_array.forEach((line) => {
    // console.log(line);
    if (line.startsWith('#EXTINF:-1 group-title="Information"')) {
        return;
    }
    if (line.startsWith('http://google.com')) {
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

        let datum = {
            name: chName,
            groupTitle: groupTitle,
            tvgId: tvgId,
            tvgLogo: tvgLogo
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
fs.writeFile('public/json/jp.json', JSON.stringify(chArray));