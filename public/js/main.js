
$('.btn-blog-nav-full').hover(function(){
	$(this).transition({ scale: 2 });
},function(){
	$(this).transition({ scale: 1});
});
$('.btn-blog-nav-zoom').click(function(){

	if($(this).data('zoom') == 'full'){
		$('.nav-bar-blog').transition({ width: '350px' });
		$(this).find('span').removeClass('glyphicon-resize-small').addClass('glyphicon-fullscreen');
		$(this).data('zoom','small');
	}else{
		$('.nav-bar-blog').transition({ width: '90%' });
		$(this).find('span').removeClass('glyphicon-fullscreen').addClass('glyphicon-resize-small');
		$(this).data('zoom','full');
	}
	
});




$('.btn-blog-menu span').click(function(){
	$(this).transition({ rotate: '45deg' });
});