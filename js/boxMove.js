define([],function(){
	// 给所有的元素translate值
		var box = document.querySelectorAll(".container .box"),
			len = box.length,
			W = parseInt(getStyle(box[0],'width')),
			flag = 'hu',
			arr = [];

			function getStyle(ele, attr){
				if(ele.currentStyle){
					return ele.currentStyle[attr];
				}else{
					return getComputedStyle(ele,null)[attr];
				}
			}

			for(var i = 0;i<len;i++){
				box[i].style.webkitTransform = 'translate3d('+(i*W)+'px,0,0)'; 
				box[i].setAttribute('data-id',flag+i);
				arr.push(flag+i)
			}

			// var arr = ['hu1',"hu0","hu2",'hu3'];
			// 通过调换数组里值得位置来改变盒子移动
			function moveBox(arr){
				arr.forEach(function(val,idx){
					//console.log(val+"=============="+idx)
					Array.apply(null,box).forEach(function(v,i){
						//console.log(v+"----"+i)
						if(v.getAttribute("data-id") == val){
							v.style.webkitTransform = 'translate3d('+W*idx+'px,0,0)';
						}
					})
				})
			}
			var str = arr.join("-");
			// 为所有的span添加元素
			for(var j=0;j<len;j++){
				box[j].addEventListener("click",function(ev){
					var ev = ev || window.event,
						target = ev.target || ev.srcElement,
						dir = target.getAttribute('data-direct'),
						_id = target.parentNode.parentNode.getAttribute("data-id");

					if(target.nodeName=='SPAN'){ // "hu0-hu1-hu2-hu3"
						var reg = new RegExp('(\\w+)-('+_id+')');
						if(dir=='left'){
							if(reg.test(str)){
								str = str.replace(reg,function(a,b,c){
									return c+"-"+b;
								})
							}else{
								reg = new RegExp('('+_id+')(-[\\w-]+-|-)(\\w+)$');
								str = str.replace(reg,function(a,b,c,d){
									console.log(b+"*********"+c+"**********"+d)
									return d+c+b;
								})
							}
						}else if(dir=='right'){ //"hu0-hu1-hu2-hu3"
							reg = new RegExp('('+_id+')-(\\w+)')
							if(reg.test(str)){
								str = str.replace(reg,function(a,b,c){
									return c+"-"+b;
								})
							}else{
								reg = new RegExp('(\\w+)(-[\\w-]+-|-)('+_id+')$');
								str = str.replace(reg,function(a,b,c,d){
									return d+c+b;
								})
							}
						}else{ //"hu0-hu1-hu2-hu3"
							reg = new RegExp(_id+'[-]*');
							if(reg.test(str)){
								str=str.replace(reg,"").replace(/-$/,'');
							}
							document.querySelector(".container").removeChild(target.parentNode.parentNode);
							    
						

						}
					}
					// console.log(str);
					arr = str.split("-");
					moveBox(arr);
				},false)
			}
			
			/*function fun(num){
				if(num>10){
					return num;
				}else{
					num++;
					fun(num);
					return num;
				}
			}
			var datal=fun(5);
			alert(datal);
			var datal2=fun(13)
			alert(datal2)*/
})