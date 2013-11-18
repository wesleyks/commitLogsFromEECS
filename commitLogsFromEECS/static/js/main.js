$(document).ready(function() {
	var lastPage = 0,
		row = $('<div class="row commit"><div class="small-2 large-2 columns avatar"><img width="75px"></div><div class="small-3 large-3 columns timestamp"><p></p></div><div class="small-7 large-7 columns message"><p></p></div></div>');
	$('.commits').infinitescroll({
		navSelector: 'div.pagination',
		nextSelector: 'div.pagination a:first',
		loading: {
			msg: $('<div></div>')
		},
		state: {
			isDone: false,
			currPage: 0
		},
		animate: false,
		dataType: 'json',
		appendCallback: false,
		prefill: true,
		path: function(page) {
			return '/commits/jsonPageAfter/?page=' + page;
		}
	}, function(data, opts) {
		console.log(data);
		if (data.length === 0) {
			opts.state.isDone = true;
		}
		for (var i = 0; i < data.length; i++) {
			var newRow = row.clone(),
				timestamp = moment(data[i].timestamp);
			$('img', newRow).attr('src', data[i].avatar);
			$('.timestamp p', newRow).text(timestamp.format('MM/DD/YY, h:mm:ss A'));
			$('.message p', newRow).text(data[i].message);
			$('.commits').append(newRow);
		}
	});
});