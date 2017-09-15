$(document).ready(function () {

    // 点击“推荐主题曲”按钮会跳转到对应位置
	$("#tuijian").click(function () {
		$("body,html").animate({scrollTop:$(".theme_song").offset().top},200);
	});

    //点击“推荐电影”下的标签跳转到对应内容
	$("#navDiv .dropdown-menu a").click(function () {
		var href = $(this).attr("href");
		$("#movieName a[href='" + href + "']").tab("show");
	});


$('audio').click(function() {

	if ($(this).hasClass('pause')) {
	   $("audio").trigger("pause");
	   $(this).removeClass('pause');
	   $(this).addClass('play');
	} else {
	   $("audio").trigger("pause");
	   $(this).removeClass('play');
	   $(this).addClass('pause');
	}

});




























});

