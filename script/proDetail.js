
	//封装轮播图点击图片放大函数--------------------------------------------------
    $.fn.ImgZoomIn = function () {
		bgstr = '<div id="ImgZoomInBG" style=" background:#000000; filter:Alpha(Opacity=70); opacity:0.7; position:fixed; left:0; top:0; z-index:10000; width:100%; height:100%; display:none;"><iframe src="about:blank" frameborder="5px" scrolling="yes" style="width:100%; height:100%;"></iframe></div>';
		//alert($(this).attr('src'));
		imgstr = '<img id="ImgZoomInImage" src="' + $(this).attr('src')+'" onclick=$(\'#ImgZoomInImage\').hide();$(\'#ImgZoomInBG\').hide(); style="cursor:pointer; display:none; position:absolute; z-index:10001;" />';
		if ($('#ImgZoomInBG').length < 1) {
			$('body').append(bgstr);
		}
		if ($('#ImgZoomInImage').length < 1) {
			$('body').append(imgstr);
		}else {
			$('#ImgZoomInImage').attr('src', $(this).attr('src'));
		}
		//alert($(window).scrollLeft());
		//alert( $(window).scrollTop());
		$('#ImgZoomInImage').css('left', $(window).scrollLeft() + ($(window).width() - $('#ImgZoomInImage').width()) / 2);
		$('#ImgZoomInImage').css('top', $(window).scrollTop() + ($(window).height() - $('#ImgZoomInImage').height()) / 2);
		$('#ImgZoomInBG').show();
		$('#ImgZoomInImage').show();
	};

	//封装点击加入购物车,弹出购物模态框--------------------------------------------
	$.fn.modelFn=function(){
		// 获取屏幕宽高
		var objWidth=0;
		var objHeight=0;
		if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
            objWidth = document.documentElement.clientWidth;
            objHeight = document.documentElement.clientHeight;
        } else {
            if (document.body) { // other Explorers    
                objWidth = document.body.clientWidth;
                objHeight = document.body.clientHeight;
            }
        }
        // 把宽高赋值给模态框
        $('.pro-car').css({
        	'width':objWidth,
        	'height':objHeight,
        	'display':'block',
        	'z-index':10005
        });
        //禁止屏幕滑动,方案1
        $(document).bind("touchmove",function(e) {
		   if(e.target.className.indexOf("pro-car") >= 0) {
		        e.preventDefault();      
		    } else {
		        e.stopPropagation();     
		    }
		});
		//禁止屏幕滑动,方案2
		/*
		document.ontouchstart=function(){
		 	return false;
		}
		*/
	}

	//模态框中---点击选择产品规格------------------------------------------------------
	$.fn.specificationFn=function(){
		//点击改变自身颜色,移出兄弟节点的颜色
		$(this).addClass("red").siblings("span").removeClass("red");
		//同步修改对应信息
		var Count= $(this).find("em").html();
		var price_1=45;
		var price_2=88;
		$(".pro-car-right h4 em").text(Count);
		//获取上面的值
		var temp=$(".pro-car-right h4 em").html();
		//设置价钱
		if(temp=="8"){
			$(".pro-car-right p em").text(price_1);
		}else if(temp=="16"){
			$(".pro-car-right p em").text(price_2);
		}
	}

	//模态框中------修改购买数量------------------------------------------------------------
	function countFn(){
		//初始化input的值
		var inputDom=$(".pro-car-desc input");
		// console.log(inputDom);

		//判断input是否获得焦点
		inputDom.focus(function(){
			// 按键时触发的事件；
			inputDom.keypress(function (e) {     
				//兼容写法
				var eventObj = event || e;
 		        var keyCode = eventObj.keyCode || eventObj.which; 

 		        //临时获取input的值
		        // var temp =inputDom.val();

		        // 如果key[48-57],那么key就是数字,阻止输入非数字
		        if(keyCode>57||keyCode<48){
		        	return false;
		        }
		        // 按键弹起时触发的事件；
		        //判断输入的值是否合法(1-99)
		        inputDom.keyup(function(){
		        	//临时获取input的值
		        	var temp =inputDom.val();
		        	// alert(temp);
		        	//输入的值大于0和小于100
		        	if(parseInt(temp)<1){
			        	inputDom.val(1);
			        }else if(parseInt(temp)>99){
			        	inputDom.val(99);
			        }
			        //判断第一个数字不能为零,如果是0就让input值等于1
			        if(inputDom.val()[0] == '0'){
			        	inputDom.val(1);
			        }
			        //调用函数
			        changeCounFn(inputDom.val());
		        }) ;
		    });      
		})

		// alert(typeof(inputVal));
		//左边的li点击
		$(".pro-car-desc li:first").click(function(){
			var temp=inputDom.val();
			if(temp>1){
				temp--;
				inputDom.val(temp);
			}
			//调用函数
			changeCounFn(inputDom.val());
		});	
		//右边边的li点击
		$(".pro-car-desc li:last").click(function(){
			var temp=inputDom.val();
			if(temp<99){
				temp++;
				inputDom.val(temp);
			}
			//调用函数
			changeCounFn(inputDom.val());
		});
		//写一个函数,在input值修改的时候,购买数量也跟着变化
		var changeCounFn=function(num){
			$(".pro-car-desc strong em").html(num);
		}
	}



	//模态框中-------点击加入购物车,把产品数据进行本地存储
	function addShoppingCart(id,name,price,pic,num){
	    var isSave=false;
	    var goods = window.localStorage.getItem("goods");//取回goods变量
	    goods = JSON.parse(goods);//把字符串转换成JSON对象
	    if(goods!=null&&goods!="undefined"){ //如果不为空，则判断购物车中是否包含了当前购买的商品
	     	var objs=goods.good;
		    for(var i=0;i<objs.length;i++){
		    	isSave=false;
		    	if(objs[i].id==id){ //说明该商品已在购物车，则数量加1
		    		objs[i].num+=num;	//原先数量加上现有数量
		    		isSave=true;
		    		break;
		    	}
		    }
		    if(!isSave){
		    	objs[objs.length]={id:id,name:name,price:price,pic:pic,num:num};
		    }
	    }else{
	     	var goods ={good:[
	     		{id:id,name:name,price:price,pic:pic,num:num}]
	     	}//要存储的JSON对象
	    }
	    goods = JSON.stringify(goods);//将JSON对象转化成字符串
		window.localStorage.setItem("goods",goods);//用localStorage保存转化好的的字符串
	 //    $("#tishiInfo").fadeIn("show",function(){
		// 	$("#tishiInfo").fadeOut(2000);
		// });
	}
	
	//实时刷新购物车数量-----------------
	//窗口加载就调用本地存储,立即刷新购物车产品的数量---------------------
	function getCarNumFn(){
		var goods = window.localStorage.getItem("goods");	//获取本地数据
		goods = JSON.parse(goods);					//将获取的字符串数据转换为JSON对象
		if(goods!=null&&goods!="undefined"){ //如果不为空，则判断购物车中是否包含了当前购买的商品
			var objs = goods.good;						//获取产品对象数组
			// var goods = window.localStorage.removeItem("goods");//删除本地数据的方法
			// console.log(goods.good[0].num);			//获取第一件商品的属性方法
			
			//获取所有产品的总数量
			var temp =0;	//初始化临时变量
			for (var i = 0; i < objs.length; i++) {
				var num=objs[i].num;
				temp += num;
			}
			console.log(temp);

			//最终给购物车赋值
			$("#proNum").text(temp);
		}
	};














//下面是电脑PC端的本地存储================================================================================

	// //模态框中-------点击加入购物车,把产品数据进行本地存储
	// function addShoppingCart(id,name,price,pic,num){
	//     var isSave=false;
	//     var goods = localStorage.getItem("goods");//取回goods变量
	//     goods = JSON.parse(goods);//把字符串转换成JSON对象
	//     if(goods!=null&&goods!="undefined"){ //如果不为空，则判断购物车中是否包含了当前购买的商品
	//      	var objs=goods.good;
	// 	    for(var i=0;i<objs.length;i++){
	// 	    	isSave=false;
	// 	    	if(objs[i].id==id){ //说明该商品已在购物车，则数量加1
	// 	    		objs[i].num+=num;	//原先数量加上现有数量
	// 	    		isSave=true;
	// 	    		break;
	// 	    	}
	// 	    }
	// 	    if(!isSave){
	// 	    	objs[objs.length]={id:id,name:name,price:price,pic:pic,num:num};
	// 	    }
	//     }else{
	//      	var goods ={good:[
	//      		{id:id,name:name,price:price,pic:pic,num:num}]
	//      	}//要存储的JSON对象
	//     }
	//     goods = JSON.stringify(goods);//将JSON对象转化成字符串
	// 	localStorage.setItem("goods",goods);//用localStorage保存转化好的的字符串
	//     $("#tishiInfo").fadeIn("show",function(){
	// 		$("#tishiInfo").fadeOut(2000);
	// 	});
	// }
	
	// //实时刷新购物车数量-----------------
	// //窗口加载就调用本地存储,立即刷新购物车产品的数量---------------------
	// function getCarNumFn(){
	// 	var goods = localStorage.getItem("goods");	//获取本地数据
	// 	goods = JSON.parse(goods);					//将获取的字符串数据转换为JSON对象
	// 	var objs = goods.good;						//获取产品对象数组
	// 	// var goods = localStorage.removeItem("goods");//删除本地数据的方法
	// 	// console.log(goods.good[0].num);			//获取第一件商品的属性方法
		
	// 	//获取所有产品的总数量
	// 	var temp =0;	//初始化临时变量
	// 	for (var i = 0; i < objs.length; i++) {
	// 		var num=objs[i].num;
	// 		temp += num;
	// 	}
	// 	console.log(temp);

	// 	//最终给购物车赋值
	// 	$("#proNum").text(temp);
	// };
