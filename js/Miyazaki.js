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

//// 只有火狐能用
// $('audio').click(function() {

// 	if ($(this).hasClass('pause')) {
// 	   $("audio").trigger("pause");
// 	   $(this).removeClass('pause');
// 	   $(this).addClass('play');
// 	} else {
// 	   $("audio").trigger("pause");
// 	   $(this).removeClass('play');
// 	   $(this).addClass('pause');
// 	}

// });

// 获取整个播放器div
var $song = $(".song");
// 获取播放开始、暂停按钮
var $btn_audio = $(".btn_audio");
// 获取进度条
var $progress_bar = $(".progress_bar");
// 获取歌曲已播放时间
var $time_count = $(".time_count");
// 获取歌曲总时间
var $time_all = $(".time_all");
//获取小圆圈
var $yuan = $(".yuan");
// 获取隐藏的audio
// var audio = document.getElementsByTagName("audio");
var $audio = $("audio");


//获取总共的歌曲数量
var len = $song.length;
//用来储存上一个播放的audio
var pre_audio;
//用来储存上一个播放的按钮的下标
var pre_index;

for (var i = 0; i < len; i++) {
	// 注意！获取宽度，如果是非内联css样式，只能用offsetWidth
	//获取进度条的最大长度，整个框架x55%
	var Pmax = $song[0].offsetWidth * 55 /100;
	// 当点击播放按钮时
  $btn_audio.eq(i).on("click", function () {
  	// 获取当前节点data-index属性值，和对应audio的ID一样
  	var y = $(this).attr('data-index');
  	var x = y.match(/\d/);
    // 点击时判断是否是三角形播放按钮
  	if ($(this).hasClass('glyphicon-play') ) {
	   	//让圆点显示出来
	   	$yuan.eq(x).css("display","block");
        // 判断上一个点击的audio，让其暂停，并改变按钮图标
        if (pre_audio!=undefined) {
        	pre_audio.pause();      	
        	$btn_audio.eq(pre_index).removeClass('glyphicon-pause').addClass('glyphicon-play');
        }
        // 储存当前audio的id作为下一次点击的判断
	        pre_audio = $("#"+y)[0];
	    //获得当前audio的下标作为下一次点击的按钮下标
	        pre_index = x;



        //当前符号条件的audio按钮背景换成暂停
	   	$(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
		//当前符号条件的audio播放
	  	$("#"+y)[0].play();
	  	//定义Atime表示当前audio的总时间
	  	var Atime = minSecond($("#"+y)[0].duration);	
        //设置定时器，
	  	var a = setInterval(function(){
	  		//当audio暂停的时候，清除定时器
	  		if ($("#"+y)[0].paused){
	  			clearInterval(a);
	  		}
	  		//定义当前audio已播放时间
            var Ctime = $("#"+y)[0].currentTime;
	  		// 让(class为time_count)p标签内容变成当前播放时间
	  		if (Ctime > 0.01) {
            $time_count.eq(x).html(minSecond(Ctime) + "/" + Atime);	  			
	  		}
            // 播放的时候进度条的宽度变化
	  		$progress_bar.eq(x).css("width",(Pmax* 85 / 100  * Ctime / $("#"+y)[0].duration) +'px');
	  		// 播放时候小圆点的移动
	  	    $yuan.eq(x).css("left", (Pmax * 85 / 100 * Ctime / $("#"+y)[0].duration + 3)+"px");

	  	},1000)
	  	

  	} else {
  		// 当点击按钮的时候如果按钮是暂停图标，就改成播放图标
	   	$(this).removeClass('glyphicon-pause').addClass('glyphicon-play');	
  		// 当前audio暂停	
	  	$("#"+y)[0].pause();  		
  	}
 

  })//按钮的click function

}//最大的for


//把秒数转换才分钟
function minSecond(n) {
	var second_ = Math.floor(n%60);
	if (second_ < 10) {
		second_ = '0'+ second_;
	}
	if (Math.floor(n / 60) < 10) {
	var a = "0" + Math.floor(n / 60) + ':' + second_;		
	} else {
	var a = Math.floor(n / 60) + ':' + second_;		
	}
	return a; 
}








































});

