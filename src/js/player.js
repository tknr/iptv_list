$(document).ready(function () {
    let params = new URLSearchParams(window.location.search);
    let m3u8Url = params.get('m3u8');
    console.log(m3u8Url);

    $.ajax({
        url: m3u8Url,
        type: "GET",
    }).done(function (data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
        let data_array = data.split('\n');
        let found = data_array.find((element) => element.endsWith('.m3u8'));
        console.log(found)
        let url = m3u8Url.replace('index.m3u8','')+ found;
        console.log(url);

        let player = videojs('vid1');
        player.src({
            src: url,
            type: 'application/x-mpegURL',
            withCredentials: true
        });
        player.play();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error(jqXHR, textStatus, errorThrown);
    });

});