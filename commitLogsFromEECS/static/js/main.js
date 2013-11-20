$(document).ready(function() {
	var row = $('<div class="row commit"><div class="small-4 large-2 columns avatar"><img width="75px"></div><div class="small-8 large-3 columns timestamp"><p></p></div><div class="small-12 large-7 columns message"><p></p></div></div>'),
		rowType = 0,
		topRowType = 1,
		lastUpdated = '';
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
		bufferPx: 1500,
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
			if (!lastUpdated) {
				lastUpdated = data[i].timestamp;
			}
			$(newRow).addClass('type-' + rowType);
			rowType = (rowType + 1) % 2;
			$('img', newRow).attr('src', data[i].avatar);
			$('.timestamp p', newRow).text(timestamp.format('MM/DD/YY, h:mm:ss A'));
			$('.message p', newRow).text(data[i].message);
			$('.commits').append(newRow);
		}
	});
	function continuouslyUpdateFeed() {
		if (lastUpdated) {
			$.ajax('/commits/jsonNewSince/?timestamp=' + encodeURIComponent(lastUpdated), {
				'dataType': 'json' 
			}).done(function(data) {
				for (var i = 0; i < data.length; i++) {
					var newRow = row.clone(),
						timestamp = moment(data[i].timestamp);
					lastUpdated = data[i].timestamp;
					$(newRow).addClass('type-' + topRowType);
					topRowType = (topRowType + 1) % 2;
					$('img', newRow).attr('src', data[i].avatar);
					$('.timestamp p', newRow).text(timestamp.format('MM/DD/YY, h:mm:ss A'));
					$('.message p', newRow).text(data[i].message);
					$('.commits').prepend(newRow);
				}
			});
		}
		setTimeout(continuouslyUpdateFeed, 60000);
	}
	continuouslyUpdateFeed();
});