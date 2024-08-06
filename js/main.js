$(function () {
	$.ajax({
		url: 'json/channels.json',
		type: 'GET',
		dataType: "json",
	}).done(function (data) {
		const data_json = JSON.parse(JSON.stringify(data));
		const modified_data = data_json.map(function (datum){
			const img = (datum.tvg_logo) ? `<br /><img src="${datum.tvg_logo}" width="64" />` : '';
			datum.title = (datum.name) ? datum.name+ img : datum.tvg_id + img;
			datum.link = `<a target="_blank" href="${datum.url}"><i class="fa-solid fa-play"></i></a>`;
			const vlc_scheme = `vlc-x-callback://x-callback-url/stream?url=`+encodeURI(datum.url);
			datum.vlc = `<a href="${vlc_scheme}"><i class="fa-regular fa-circle-play"></i></a>`;
			return datum;
		});
		console.log(modified_data);
		$('#table').DataTable(
			{
				language: {
					url: "//cdn.datatables.net/plug-ins/2.0.1/i18n/ja.json",
				},
				layout: {
					topStart: {
						searchBuilder: {
							// config options here
						}
					}
				},
				searching: true,
				ordering: true,
				lengthChange: true,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				deferRender: true,
				stateSave: false,
				data: modified_data,
				columns: [
					{
						data: 'via',
						title: 'via',
						orderable: true,
						visible: true, 
					},
					{
						data: 'group_title',
						title: 'group',
						orderable: true
					},
					{
						data: 'tvg_id',
						title: 'tvg_id',
						orderable: true,
						visible: false, 
					},
					{
						data: 'title',
						title: 'title',
						orderable: true,
						visible: true, 
					},
					{
						data: 'link',
						title: 'link',
						orderable: false,
						visible: true, 
					},
					{
						data: 'vlc',
						title: 'vlc',
						orderable: false,
						visible: true, 
					},
				],
				order: [
					[0, 'asc']
				],
			});
	}).fail(function (data) {
		// error
		console.log('error');
	});
});