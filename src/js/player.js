$(document).ready(function () {
    const $video = $('#video');
    const $title = $('title');
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    console.log(id);

    $.getJSON("json/luongz.iptv-jp.json", function (data) {
        console.log(data);
        $.each(data, function (index, item) {
            if (index === (id) - 1) {
                console.log("Found matching item:", item);
                $title.html(item.groupTitle + ' : ' + item.name);
                $video.attr('poster', item.tvgLogo);
                // https://github.com/dailymotion/hls.js
                if (Hls.isSupported()) {
                    var hls = new Hls();
                    hls.loadSource(item.url);
                    hls.attachMedia($video[0]);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {
                        $video[0].play();
                    });
                }
                // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
                // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
                // This is using the built-in support of the plain video element, without using hls.js.
                // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
                // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
                else if ($video[0].canPlayType('application/vnd.apple.mpegurl')) {
                    $video[0].src = item.url;
                    $video[0].addEventListener('loadedmetadata', function () {
                        $video[0].play();
                    });
                }
            }
        });
    })



});