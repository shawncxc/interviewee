$.noConflict();
jQuery(function($){
	$('#signupform').hide();

	$('#signupBtn').click(function(){
		$('#loginform').hide();
		$('#signupform').fadeIn();
	});

	$('#loginBtn').click(function(){
		$('#loginform').fadeIn();
		$('#signupform').hide();
	});
})