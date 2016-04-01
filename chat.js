$(document).ready(function() {

	var fbRef = new Firebase("https://burning-inferno-220.firebaseio.com/");

	$("#form").submit(function(event) {
		event.preventDefault();
		console.log("submitted");
		var message = $("#message").val();
		fbRef.child('messages').push(message);
		$("#message").val('');
	});

	fbRef.child('messages').on('child_added', function(snapshot) {
		var message = snapshot.val();
		var item = '<li id=' + snapshot.key() + '>' +
			message +
			'<span class="remove">x</span>'
		'<li>';
		$('#messages').prepend(item);
		
		$('#messages #' + snapshot.key() + ' .remove').click(function()	{
			
			fbRef.child('messages').child(snapshot.key()).remove();
			
		});
	});
	
	fbRef.child('messages').on('child_removed', function(snapshot)	{
		
		$('#' + snapshot.key()).remove();
	
	});

});