#!/bin/bash

mkdir -p m3u
rm -f m3u/channels.csv
touch m3u/channels.csv
echo '"via","group_title","tvg_id","tvg_logo","name","url"' >> m3u/channels.csv

IFS=$'\n'

for LINE in `cat m3u/luongz.jp.m3u | sed -z "s|\r\n|\n|g" |sed "s|png\", |png\" name=|g" | sed -z -e  "s|\nhttp| url=http|g" | grep "^#EXTINF" | grep -v "Information"`
do
	group_title=`echo ${LINE} | grep -oP 'group-title=\"([a-zA-z0-9\.\/\-]+)\"' | sed 's|group-title="\(.*\)"|\1|'`
	tvg_id=`echo ${LINE} | grep -oP 'tvg-id=\"([a-zA-z0-9\.\/\-]+)\"' | sed 's|tvg-id="\(.*\)"|\1|'`	
	tvg_logo=`echo ${LINE} | grep -oP 'tvg-logo=\"(.+)\"' | sed 's|tvg-logo="\(.*\)"|\1|'`
	name=`echo ${LINE} | grep -oP 'name=(.+) url' | sed 's|name=\(.*\) url|\1|'`
	url=`echo ${LINE} | grep -oP 'url=(.+)' | sed 's|url=\(.*\)|\1|'`
	echo '"luongz.jp","'${group_title}'","'${tvg_id}'","'${tvg_logo}'","'${name}'","'${url}'"' >> m3u/channels.csv
done

for LINE in `cat m3u/iptv-org.jp.m3u | sed -z "s|\r\n|\n|g" | sed -z -e  "s|\nhttp| url=http|g" | grep "^#EXTINF" | grep -v "Information"`
do
	tvg_id=`echo ${LINE} | grep -oP 'tvg-id=\"([a-zA-z0-9\.\/\-]+)\"' | sed 's|tvg-id="\(.*\)"|\1|'`
	name=`echo ${LINE} | grep -oP 'name=(.+) url' | sed 's|name=\(.*\) url|\1|'`
	url=`echo ${LINE} | grep -oP 'url=(.+)' | sed 's|url=\(.*\)|\1|'`
	echo '"iptv-org.jp","","'${tvg_id}'","","'${name}'","'${url}'"' >> m3u/channels.csv	
done

for LINE in `cat m3u/iptv-org.jp_primehome.m3u | sed -z "s|\r\n|\n|g" | sed -z -e  "s|\nhttp| url=http|g" | grep "^#EXTINF" | grep -v "Information"`
do
        tvg_id=`echo ${LINE} | grep -oP 'tvg-id=\"([a-zA-z0-9\.\/\-]+)\"' | sed 's|tvg-id="\(.*\)"|\1|'`
        name=`echo ${LINE} | grep -oP 'name=(.+) url' | sed 's|name=\(.*\) url|\1|'`
        url=`echo ${LINE} | grep -oP 'url=(.+)' | sed 's|url=\(.*\)|\1|'`
        echo '"iptv-org.jp_primehome","","'${tvg_id}'","","'${name}'","'${url}'"' >> m3u/channels.csv
done

mkdir -p json
rm -f json/channels.json
npx csvtojson m3u/channels.csv > json/channels.json

