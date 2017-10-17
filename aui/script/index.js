//加载完毕事件
	window.onload=function(){
		//顶部导航栏滚动透明度效果
		headerScroll();
		//倒计时效果
		cutDownTime(3);
		
		//轮播图
	    var slide3 = new auiSlide({
	        container:document.getElementById("aui-slide3"),
	        // "width":300,
	        "height":200,
	        "speed":500,
	        "autoPlay": 3000, //自动播放
	        "loop":true,
	        "pageShow":true,
	        "pageStyle":'dot',
	        'dotPosition':'center'
	    })
	    
	    //宫格布局
	    apiready = function(){
	        api.parseTapmode();
	    }
	    var tab = document.querySelectorAll(".aui-tab-item");
	    for(var i in tab){
	        tab[i].onclick = function(e){
	            document.querySelector(".aui-tab-item.aui-active").classList.remove("aui-active");
	            e.target.classList.add("aui-active");
	        }
	    }
	}
	
	//顶部导航栏
	/*
			获取导航栏的高度
			在onscroll事件中修改颜色
				0-1透明度
				获取滚动距离
				滚动距离/导航栏	0-1的浮点数
				通过js修改透明度
	 */
	function headerScroll(){
		//1,获取一些参数
		/*
			导航栏的高度
			顶部的通栏
		 */
		//距离顶部的高度
		// console.log(document.querySelector(".index_nav").offsetTop);
		//元素自身高度
		// console.log(document.querySelector(".index_nav").offsetHeight);
		//获取导航栏
		var navDom=document.querySelector(".index_nav");
		//获取导航栏底部到浏览器顶部距离
		var maxDistance=navDom.offsetTop+navDom.offsetHeight;
		//获取顶部通栏
		var headerDom=document.querySelector('.index_header');
	
		//2,注册onscroll事件
		window.onscroll=function(){
			// console.log(123);
			//获取滚动距离
			var scrollDistance=window.scrollY;
			// 方法2 var scrollDistance=window.document.body.scrollTop;
			// console.log('scrollY:'+scrollDistance);
	
			//计算百分数
			var percent=scrollDistance/maxDistance;
			// console.log(percent);
			
			//如果超过1,把persont还原为1;
			if(percent>1){
				percent=1;
			} 
	
			//计算顶部通栏的透明度
			headerDom.style.backgroundColor='rgba(201,21,35,'+percent+')';
		}
	
	}
	
    //秒杀
	//倒计时方法
	/*
		定义一个初始倒计时的总时间
		获取想要修改的标签

		开启定时器
			判断是否到期
			递减时间
			修改对应标签显示
			time:小时
	 */
	function cutDownTime(time){
		//定义总时间
		// var totalHour=3;
		//转化为秒
		var totalSec=time*3600;
		//多加一秒,让用户看到的是整数
		totalSec++;
		//获取想要修改的所有li标签
		var liArr=document.querySelectorAll(".main_content:nth-child(1) .content_top li");
		// console.log(liArr);
		
		//开启定时器
		var timeId=setInterval(function(){
			//判断是否到期
			if(totalSec<=0){
				//清除定时器
				clearInterval(timeId);
				// console.log("结束了,你买不到了");
				return;
			}
	
			//递减
			totalSec--;
			//当前的时间对应多少小时/分/秒
			var hour=Math.floor(totalSec/3600);
			var minute=Math.floor(totalSec%3600/60);
			var sec=Math.floor(totalSec%60);
	
			//修改dom元素显示
			//小时
			liArr[0].innerHTML=Math.floor(hour/10);
			liArr[1].innerHTML=hour%10;
			//分
			liArr[3].innerHTML=Math.floor(minute/10);
			liArr[4].innerHTML=minute%10;
			//秒
			liArr[6].innerHTML=Math.floor(sec/10);
			liArr[7].innerHTML=sec%10;
	
		},1000);
	}
    