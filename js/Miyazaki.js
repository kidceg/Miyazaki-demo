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
var song = document.getElementsByClassName("song");
// 获取播放开始、暂停按钮
var btn_audio = document.getElementsByClassName("btn_audio");
// 获取进度条
var progress_bar = document.getElementsByClassName("progress_bar");
// 获取歌曲已播放时间
var time_count = document.getElementsByClassName("time_count");
// 获取歌曲总时间
var time_all = document.getElementsByClassName("time_all");
//获取小圆圈
var yuan = document.getElementsByClassName("yuan");
// 获取隐藏的audio
var audio = document.getElementsByTagName("audio");


//获取总共的歌曲数量
var len = song.length;

// 注意！获取宽度，如果是非内联css样式，只能用offsetWidth
//获取进度条的最大长度，整个框架x55%
var Pmax = song[0].offsetWidth * 55  /100;

for (var i = 0; i < len; i++) {
  btn_audio[i].addEventListener("click", function () {
  	// 获取当前节点对于父节点的下标
  	var x = parseInt(this.getAttribute('index'));

  	if ($(this).hasClass('glyphicon-play') ) {
	   	//让圆点显示出来
	   	yuan[x].style["display"] = "block";

 	   	for (var j = 0; j < len; j++) {
	   		audio[j].pause();
            $(".btn_audio").removeClass('glyphicon-pause').addClass('glyphicon-play');
	   	}
        
	   	$(this).removeClass('glyphicon-play').addClass('glyphicon-pause');

	  	audio[x].play();
	  	var Atime = minSecond(audio[x].duration);
	  	time_all[x].innerHTML = Atime;	

	  	var a = setInterval(function(){
	  		if (audio[x].paused){
	  			clearInterval(a);

	  		}
            var Ctime = audio[x].currentTime;

            // 进度条的宽度变化
	  		progress_bar[x].style["width"] = (Pmax* 88 / 100  * Ctime / audio[x].duration) +'px';
	  		// 小圆点的移动
	  	    yuan[x].style["left"] = (Pmax * 88 / 100 * Ctime / audio[x].duration + 3)+"px";

            time_count[x].innerHTML= minSecond(Ctime);

	  	},1000)




  	} else {
	   	$(this).removeClass('glyphicon-pause').addClass('glyphicon-play');	  	
	  	audio[x].pause();  		
  	}
 

  })//addEventListener

}//最大的for


function minSecond(n) {
	var second_ = Math.floor(n%60);
	if(second_<10){
		second_ = '0'+ second_;
	}
	var a = Math.floor(n/60) + ':' + second_;
	return a;
}








































});

