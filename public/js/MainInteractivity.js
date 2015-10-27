$.noConflict();
jQuery(function($){
	var window_width = $(window).width();
	
	if(window_width <= 500){
		console.log("into mobile");
		//main page

		//tabs
		$('#tabs').find('ul').attr('class', 'nav nav-pills');

		//infoform
		var infoInput = $('#infoform').detach();
		$('#body').prepend(infoInput);

		//userIcon
		$('#userIcon').find('h2').remove();
		var userIcon = $('#userIcon').find('canvas').css("width", "50%").detach();
		$('#body').prepend($('#tabs'));
		$('#tabs').prepend(userIcon);

		//table
		$('.dropdown-menu').find('a').css("width", "100px");
	}
});
