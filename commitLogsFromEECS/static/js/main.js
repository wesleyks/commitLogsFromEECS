$(document).ready(function() {
	var lastPage = 0,
		row = $('<div class="row commit"><div class="small-2 large-2 columns avatar"><img width="75px"></div><div class="small-3 large-3 columns timestamp"><p></p></div><div class="small-7 large-7 columns message"><p></p></div></div>');
	$.ajax('/commits/jsonPageAfter/?page=' + (++lastPage), {
		'async': false,
		'dataType': 'json',
		'success': function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var newRow = row.clone(),
					timestamp = moment(data[i].timestamp);
				$('img', newRow).attr('src', data[i].avatar);
				$('.timestamp p', newRow).text(timestamp.format('MM/DD/YY, h:mm:ss A'));
				$('.message p', newRow).text(data[i].message);
				$('.commits').append(newRow);
			}
		}
	});
});