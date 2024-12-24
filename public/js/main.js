$(document).ready(function () {
    $.getJSON("json/jp.json", function (data) {
        console.log(data);
        const customData = $.map(data, function (datum, index) {
            datum.logo_img = `<img width="128" src="${datum.logo}" />`
            datum.link = `<a target="_blank" href="${datum.url}"><i class="fa-solid fa-play"></i></a>`
            datum.vlc=`<a target="_blank" href="vlc-x-callback://x-callback-url/stream?url=${encodeURI(datum.url)}"><i class="fa-solid fa-play"></i></a>`
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
                    data: 'name',
                    title: 'name',
                    orderable: true,
                },
                {
                    data: 'logo_img',
                    title: 'logo_img',
                    orderable: true,
                },
                {
                    data: 'link',
                    title: 'link',
                    orderable: true,
                },
                {
                    data: 'vlc',
                    title: 'vlc',
                    orderable: true,
                },
            ],
        });
    });
});
