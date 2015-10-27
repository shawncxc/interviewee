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
	
	//check browser size
	var window_width = $(window).width();
	
	if(window_width <= 500){
		console.log("into mobile");
		//login page
		$('#formbg').before("<h2 id='mobileHeadup'>Manage Your Interviews</h2>");
		$('#headup').css("display","none");
	}
});