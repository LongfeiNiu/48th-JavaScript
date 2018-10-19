'use strict';
/*
 * 运动框架
 * param：
 *      ele     - object 必须 表示要进行运动的节点
 *      attr    - string 必须 表示要改变的css属性
 *      target  - number 必须 表示属性的终点值
 *      step    - number 选填 表示运动速度的正值，默认5
 *return：
 *
 */
window.Move = function () {
    //兼容定时器
    window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
        setTimeout(fn, 1000 / 60);
    };
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

    //框架函数
    return function Move(ele, attr, target) {
        var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

        //ele.style.marginLeft  只能获取行内样式
        //console.log(getComputedStyle(ele));              //原生JS，存储着节点对象全部的样式

        //获取存储着ele展示样式的对象
        var cssObj = ele.currentStyle || getComputedStyle(ele); //解决兼容性问题IE8用currentStyle
        //初始的值
        var sVal = parseFloat(cssObj[attr]); //去掉单位，变成数字
        //兼容IE的opacity
        if(attr === "opacity" && isNaN(sVal))sVal=1;

        //考虑初始值与目标值大小的问题
        var bool = sVal>target;
        if(sVal > target){
            step = -Math.abs(step);   //负值
        }else if (sVal < target){
            step = Math.abs(step);    //正值
        }else{
            return;
        }

        function f() {
            sVal += step;         // + -step
            if (bool?sVal<=target:sVal>=target) {
                sVal = target;
            }else {
                requestAnimationFrame(f);
            }
            if(attr === 'opacity'){
                ele.style[attr] = sVal;
                ele.style.filter = "alpha(opacity="+100*sVal+")";
            }else if(attr === 'zIndex'){
                ele.style[attr] = sVal;         //不加单位
            }else{
                ele.style[attr] = sVal + 'px';   //加单位
            }

        }
        requestAnimationFrame(f);
    };
}();
















