$(document).ready(function () {
    $.getJSON("json/luongz.iptv-jp.json", function (data) {
        console.log(data);
        const customData = $.map(data, function (datum, index) {
            datum.logo = `<img width="64" src="${datum.tvgLogo}" />`
            datum.m3u8 = `<a target="_blank" href="${datum.url}"><i class="fa-solid fa-link"></i></a>`
            datum.player = `<a target="_blank" href="player.html?m3u8=${datum.url}"><i class="fa-solid fa-tv"></i></a>`
            const urlencoded = encodeURIComponent(datum.url);
            datum.vlc = `<a target="_blank" href="vlc-x-callback://x-callback-url/stream?url=${urlencoded}"><i class="fa-solid fa-play"></i></a>`
            return datum;
        });

        $('#table').DataTable({
            searching: true,
            ordering: true,
            lengthChange: false,
            scrollX: true,
            scrollCollapse: true,
            deferRender: true,
            dom: "fliptrip",
            lengthMenu: [
                [10, 20, 100, Number.MAX_SAFE_INTEGER],
                ["10", "20", "100", "all"],
            ],
            pageLength: Number.MAX_SAFE_INTEGER,
            stateSave: false,
            serverSide: false,
            data: customData,
            columns: [
                {
                    data: 'm3u8',
                    title: 'm3u8',
                    orderable: false,
                },
                {
                    data: 'vlc',
                    title: 'vlc',
                    orderable: false,
                },
                {
                    data: 'player',
                    title: 'player',
                    orderable: false,
                },
                {
                    data: 'logo',
                    title: 'logo',
                    orderable: true,
                },
                {
                    data: 'name',
                    title: 'name',
                    orderable: true,
                },
            ],
        });
    });
});
