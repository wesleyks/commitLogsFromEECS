$(document).ready(function() {
	var row = $('<div class="row commit"><div class="small-3 large-2 columns avatar"><img width="75px"></div><div class="small-4 large-3 columns timestamp"><p></p></div><div class="small-5 large-7 columns message"><p></p></div></div>'),
		rowType = 0;
	$('.commits').infinitescroll({
		navSelector: 'div.pagination',
		nextSelector: 'div.pagination a:first',
		//itemSelector: '.commits div.commit',
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
		if (data.length === 0) {
			opts.state.isDone = true;
		}
		for (var i = 0; i < data.length; i++) {
			var newRow = row.clone(),
				timestamp = moment(data[i].timestamp);
			$(newRow).addClass('type-' + rowType);
			rowType = (rowType + 1) % 2;
			$('img', newRow).attr('src', data[i].avatar);
			$('.timestamp p', newRow).text(timestamp.format('MM/DD/YY, h:mm:ss A'));
			$('.message p', newRow).text(data[i].message);
			$('.commits').append(newRow);
		}
	});
});