import { M3uParser } from '@pawanpaudel93/m3u-parser';
import fs from 'fs';
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36";
const timeout = 5
const parser = new M3uParser({ userAgent, timeout });

(async () => {
    await parser.parseM3u("https://iptv-org.github.io/iptv/countries/jp.m3u");
    let data = parser.getStreamsInfo();
    console.log(data);
    //    fs.writeFile('public/json/jp.json', JSON.stringify(data));
})();

