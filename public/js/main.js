
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
$('.article-s').hover(function(){
	$(this).find(".article-bars").transition({ height: '70px' });
});
$('.article-s').mouseleave(function(){
	$(this).find(".article-bars").transition({ height: '0px' });
});

var $moreArticle = $('#more-article');
var $moreArticleLoading = $('.more-article-loading');
var $odestTime = $('#odest-time');
$moreArticle.click(function(){
	var $this = $(this);
	if($this.data('status') != 'loading'){
		$this.trigger("loading");
		console.log()
		var beginTime = $odestTime.val();
		$.ajax({
			url:"/article/more",
			dataType:"json",
			data:{ beginTime : beginTime},
			type:"post",
			success:function(json){
				console.log(json);
				if(json != null && json.articles != null ){
					var articles = json.articles 
					if(articles.length > 0){
						var width = $(window).width();
						var total = $(".article-s").length;
						console.log(total);
						for(var index in articles ){
							var article = articles[index];
							var $articleS = $('<div class="col-sm-12 article-s"></div>');
							
							var $articleImg = $('<div class="col-md-12 article-img-s"><a href="/article/'+article.id+'"><img src="'+article.img+'"/></a></div>');
							var $articleTitle = $('<div class="col-md-12 article-title-s" ><a href="/article/'+article.id+'">'+article.title+'</a></div>');
							var $articleBrief = $('<div class="col-md-12 article-content-s" >'+article.brief+'</div>');
							var $articleBars = $('<div class="col-md-12 article-bars" ></div>');
							
							$articleS.append($articleImg);
							$articleS.append($articleTitle);
							$articleS.append($articleBrief);
							$articleS.append($articleBars);

							var $articleLike = $('<div class="col-xs-6 article-bars-btn artice-like-s"><i class="glyphicon glyphicon-heart"></i><i class="like-num">'+article.like_num+'</i></div>');
							var $articleComment = $('<div class="col-xs-6 article-bars-btn artice-comment-s"><i class="glyphicon glyphicon-comment"></i><i class="comment-num">'+article.comment_num+'</i></div>');
							$articleLike.appendTo($articleBars);
							$articleComment.appendTo($articleBars);
							if(width > 992){
								var num = parseInt(index) + total + 1;
								console.log(num);
								if(num % 2 == 0){
									$(".aritilce-waterfall-l").append($articleS);
								}else{
									$(".aritilce-waterfall-r").append($articleS);
								}
							}else{
								$(".aritilce-waterfall-r").append($articleS);
							}
							$articleS.hover(function(){
								$(this).find(".article-bars").transition({ height: '70px' });
							});
							$articleS.mouseleave(function(){
								$(this).find(".article-bars").transition({ height: '0px' });
							});
						}
						var oldest = articles[articles.length-1].create_time;
						$("#odest-time").val(oldest);
					}else{
						console.log("没有更多文章");
					}
				}else{
					console.log("获取更多文章失败");
				}

				//设置新的oldestTime
				

				$moreArticle.trigger('loaded');
			}
		});

	}
	
});
$moreArticle.on('loading',function(){
	$(this).data("status","loading");
	$moreArticleLoading.show();

});
$moreArticle.on('loaded',function(){
	//避免动画太快消失
	setTimeout(function(){
		$moreArticleLoading.hide();
	},1000)
	$(this).data("status","loaded");
});