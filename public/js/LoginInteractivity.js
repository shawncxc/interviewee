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

	$('#linkedinIcon').hide();

	$('#developerBtn').on('click', function(){
		$(this).empty();
		$(this).append("<a href='https://www.linkedin.com/in/xuchangchen'><b>Check Him On</b>      <img id='linkedinIcon' src='linkedinIcon.png'>");
	});
})