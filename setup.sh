#!/bin/bash
mkdir -p m3u
curl -o m3u/luongz.jp.m3u https://raw.githubusercontent.com/luongz/iptv-jp/main/jp.m3u
curl -o m3u/iptv-org.jp.m3u https://raw.githubusercontent.com/iptv-org/iptv/master/streams/jp.m3u
curl -o m3u/iptv-org.jp_primehome.m3u https://raw.githubusercontent.com/iptv-org/iptv/master/streams/jp_primehome.m3u
