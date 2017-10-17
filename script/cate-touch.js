
/*
	//这是一个手指上下滑动的函数---------------------------------------------------------------------
	参数1:headerDom(页面顶部搜索框)
	参数2:moveUl(滚动的jq对象)
	参数3:parentDom(参考的父元素的高度)
	参数4:callback(回调函数)
 */
function left_upToDownScroll(headerDom,moveUl,parentDom){

	//获取header的高度,计算下面的偏移值
	var headerHeight=headerDom.outerHeight();

	//ul的高度
	var ulHeight=moveUl.outerHeight();

	//获取 ul父盒子的 高度
	var parentHeight=parentDom.outerHeight();

	//计算移动的范围,因为往上是y轴负方向,所以这里是减而不是加---------
	var minDistance=parentHeight-ulHeight-headerHeight;
	
	var maxDistance=0;
	
	//定义变量,用来标识吸附的距离
	var delayDistance=100;
	
	//2.通过touch事件进行滑动
	//定义一些变量,记录距离
 	var startY=0;
	//移动值
	var moveY=0;
	//总的移动距离
	var distanceY=0;

	//将重复的代码进行封装------
	var startTransition=function(){
		//开启过渡
		moveUl.get(0).style.transition='all .5s';
	}

	var endTransition=function(){
		//关闭过渡
		moveUl.get(0).style.transition='';
	}

	var setTransform=function(distance){
		//移动
		moveUl.get(0).style.transform='translateY('+distance+'px)';
	}


	//手指触摸事件开启--------
	moveUl.on('touchstart',function(event){

		//鼠标按下,该点距离浏览器的距离
		startY=event.originalEvent.changedTouches[0].pageY;
	});

	moveUl.on('touchmove',function(event){

		//阻止冒泡和默认行为
		preventDefa(event);
		stopBubble(event);

		//鼠标移动的距离
		moveY=event.originalEvent.changedTouches[0].pageY-startY;

		//判断是否满足移动的条件
		if((moveY+distanceY)>(maxDistance+delayDistance)){
			//修正moveY
			moveY=0;
			distanceY=maxDistance+delayDistance;
 			// 为什么是减法 因为 往上移动 是负值 要比最小值 还要更小	
		}else if((moveY+distanceY)<(minDistance-delayDistance)){
			//修正moveY
			moveY=0;
			distanceY=minDistance-delayDistance;

		}
		//关闭过渡
		// moveUl.style.transition='';
		endTransition();

		//移动
		// moveUl.style.transform='translateY('+(distanceY+moveY)+'px)';
		setTransform(distanceY+moveY);
	});

	moveUl.on('touchend',function(event){

		//修改移动的总距离
		distanceY+=moveY;

		//3.手指松开吸附回去
		//判断吸附的方位
		if(distanceY>maxDistance){
			distanceY=maxDistance;
		}else if(distanceY<minDistance){
			distanceY=minDistance;
		}

		//吸附回去
		//移动
		// moveUl.style.transition='all .3s';
		// moveUl.style.transform='translateY('+distanceY+'px)';
		startTransition();
		setTransform(distanceY);
	});


	//第二大部分逻辑,点击跳转
	/*
		逻辑1
		绑定tab事件绑定ul即可
			事件参数中是能够拿到触发该事件的dom元素

		逻辑2
			获取当前点击的li标签的索引值
			让我们的 ul移动索引值*li高度的距离
				索引值的获取
					可以用for循环获取
				为每隔li保存一个索引值属性
					<div data-index='1'>
					点击li的时候,获取该值的属性
					dom.dataSet['index']
	 */
	
	
	
	//在使用之前为li标签绑定一个data-index属性
	//所有的li绑定data-index
	var liArr=moveUl.find('li');

	//获取当前点击的li标签的索引值,每一个li标签的高度
	var liHeight=liArr.outerHeight();

	//js绑定自定义属性
	for (var i = 0; i < liArr.length; i++) {
		//dataset['index'],如果html标签中有了该属性,那就是赋值操作
		//如果没有该属性,就是添加该属性操作
		liArr[i].dataset['index']=i;
	}

	// 调用移动端点击事件
	fox_tap(moveUl,function(e){
		//修改当前点击的li标签的class
		//清空所有的
		for (var i = 0; i < liArr.length; i++) {
			liArr[i].className='';
		}
		//高亮当前的
		e.target.parentNode.className='current';

		//获取当前点击li元素的的index
		var currentIndex=e.target.parentNode.dataset['index'];
		// console.log('索引值为:'+currentIndex);

		//计算移动的距离
		var moveDistance=currentIndex*liHeight*-1;

		//对moveDistance进行规范
		if(moveDistance>maxDistance){
			//如果大于最大值
			moveDistance=maxDistance;
		}else if(moveDistance<minDistance){
			//如果小于最小值
			moveDistance=minDistance;
		}

		//开始移动
		startTransition();

		//设置移动距离
		setTransform(moveDistance);

		// //如果存在回调函数,就调用回调函数
		// if(fn){
		// 	fn();
		// }

		//调用右侧数据
		// $(".main_right .sort").removeClass('active');
		// $(".main_right .sort").eq(currentIndex).addClass('active');

	});

}

function right_upToDownScroll(headerDom,moveUl,parentDom){

	//获取header的高度,计算下面的偏移值
	var headerHeight=headerDom.outerHeight();

	//ul的高度
	var ulHeight=moveUl.outerHeight();

	//获取 ul父盒子的 高度
	var parentHeight=parentDom.outerHeight();

	//计算移动的范围,因为往上是y轴负方向,所以这里是减而不是加---------
	var minDistance=parentHeight-ulHeight-headerHeight;
	
	var maxDistance=0;
	
	//定义变量,用来标识吸附的距离
	var delayDistance=100;
	
	//2.通过touch事件进行滑动
	//定义一些变量,记录距离
 	var startY=0;
	//移动值
	var moveY=0;
	//总的移动距离
	var distanceY=0;

	//将重复的代码进行封装
	var startTransition=function(){
		//开启过渡
		moveUl.get(0).style.transition='all .5s';
	}
	var endTransition=function(){
		//关闭过渡
		moveUl.get(0).style.transition='';
	}
	var setTransform=function(distance){
		//移动
		moveUl.get(0).style.transform='translateY('+distance+'px)';
	}
	//手指触摸事件开启
	moveUl.on('touchstart',function(event){

		//鼠标按下,该点距离浏览器的距离
		startY=event.originalEvent.changedTouches[0].pageY;
	});
	moveUl.on('touchmove',function(event){

		//阻止冒泡和默认行为
		preventDefa(event);
		stopBubble(event);

		//鼠标移动的距离
		moveY=event.originalEvent.changedTouches[0].pageY-startY;

		//判断是否满足移动的条件
		if((moveY+distanceY)>(maxDistance+delayDistance)){
			//修正moveY
			moveY=0;
			distanceY=maxDistance+delayDistance;
 			// 为什么是减法 因为 往上移动 是负值 要比最小值 还要更小	
		}else if((moveY+distanceY)<(minDistance-delayDistance)){
			//修正moveY
			moveY=0;
			distanceY=minDistance-delayDistance;

		}
		//关闭过渡
		// moveUl.style.transition='';
		endTransition();

		//移动
		// moveUl.style.transform='translateY('+(distanceY+moveY)+'px)';
		setTransform(distanceY+moveY);
	});
	moveUl.on('touchend',function(event){

		//修改移动的总距离
		distanceY+=moveY;

		//3.手指松开吸附回去
		//判断吸附的方位
		if(distanceY>maxDistance){
			distanceY=maxDistance;
		}else if(distanceY<minDistance){
			distanceY=minDistance;
		}

		//吸附回去
		//移动
		// moveUl.style.transition='all .3s';
		// moveUl.style.transform='translateY('+distanceY+'px)';
		startTransition();
		setTransform(distanceY);
	});
}

//这是移动端点击(模拟移动端点击)函数------------------------------------------------------------
/*
	参数1:绑定的dom元素
	参数2:回调函数
*/
function fox_tap(element,callBack) {
	// 绑定touch事件
	/*
		计算 start 跟 end的 时间差
			如果时间差 很长 也失效  if(time>200)
		如果move触发了 就失效

	*/

	// 1. 定义一些必须的变量
	// 开始的时间
	var startTime = 0;

	// 标示 是否触发了 move事件
	var isMove =false;

	// 定义 最大的 延迟时间
	var maxTime = 250;

	element.on('touchstart',function (e) {
		// 记录开始时间
		startTime = Date.now();
		// console.log(e);

		// 修正 我们标示变量的值
		isMove = false;
	})

	element.on('touchmove',function (e) {
		isMove = true;
	})

	element.on('touchend',function (e) {

		event = event || window.event;

		//阻止冒泡
        stopBubble(e)
		
		if (isMove == true) {
			// console.log('失效');
			return;
		}
		// 判断 延迟延迟的时间
		if ((Date.now()-startTime)>maxTime) {
			// console.log('太长了,都属于长按了');
			return;
		}

		// 如果能够到这里
		// console.log('成功');
		callBack(e);
	})
}

//阻止默认行为函数-------------------------------------------------------------------------------
function preventDefa(e){ 
	if(window.event){ 
		//IE中阻止函数器默认动作的方式  
		window.event.returnValue = false;  
	} 
	else{ 
		//阻止默认浏览器动作(W3C)  
		e.preventDefault(); 
	}  
} 

//阻止冒泡事件的兼容性处理 ---------------------------------------------------------------------
function stopBubble(e) { 
	if(e && e.stopPropagation) { //非IE 
		e.stopPropagation(); 
	} else { //IE 
		window.event.cancelBubble = true; 
	} 
}


//图片懒加载---------------------------------------------------------------------
function lazyload() {
	var n = 0;
	var imgNum = $(".lazy").length;
	var imgDom = $('.lazy');
	// lazyload();
	// $(window).scroll(lazyload);
	for (var i = n; i < imgNum; i++) {
		if (imgDom.eq(i).offset().top <  parseInt($(window).height()) + parseInt($(window).scrollTop())) {
			if (imgDom.eq(i).attr("src") == "") {
				var src = imgDom.eq(i).attr("data-original");
				imgDom.eq(i).attr("src", src);
				n = i + 1;
			}
		}
	}
}
