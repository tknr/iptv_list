$(function () {
	$.ajax({
		url: 'json/channels.json',
		type: 'GET',
		dataType: "json",
	}).done(function (data) {
		const data_json = JSON.parse(JSON.stringify(data));
		const modified_data = data_json.map(function (datum){
			const img = (datum.tvg_logo) ? `<img src="${datum.tvg_logo}" width="64" />` : '';
			const title = (datum.name) ? datum.name : datum.tvg_id;
			datum.link = `<a target="_blank" href="${datum.url}">${img}${title}</a>`;
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
						orderable: true
					},
					{
						data: 'group_title',
						title: 'group',
						orderable: true
					},
					{
						data: 'link',
						title: 'link',
						orderable: true
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