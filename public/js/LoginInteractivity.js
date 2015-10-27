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

	//$('#linkedinIcon').hide();

/*	$('#developerBtn').on('click', function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
			$(this).empty();
			$(this).text("Developer Info");
		}
		else{
			$(this).addClass("open");
			$(this).empty();
			$(this).append("<a href='https://www.linkedin.com/in/xuchangchen'><b>Check Him On</b>      <img id='linkedinIcon' src='linkedinIcon.png'>");
		}
	});*/
	
	//check browser size
	var window_width = $(window).width();
	
	if(window_width <= 500){
		$('#formbg').before("<h2 id='mobileHeadup'>Manage Your Interviews</h2>");
		$('#headup').css("display","none");
	}

})