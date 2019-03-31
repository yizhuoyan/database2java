(function (window, document) {
    "use strict";
    /**
     * how to :
     *
     * toast("message");//默认2000
     * toast("message",300);
     *
     */

    var defautSetting = {
        timeout: 2000,
        fadeIn: 500,
        fadeOut: 1000,
    };
	/**
	 * 创建toastview
	 */
    var toastEL = (function (setting) {

        var divCss = {
            position: "fixed",
            zIndex: 2147483647,
            bottom: "150px",
            background: "#000",
            color: "#fff",
            border: "1px solid #000",
            fontSize: "14px",
            padding: "5px 1em",
            borderRadius: "5px",
            boxShadow: "inset 0 1px 1px rgba(0, 0, 0, .075)",
            display:"none"
        };
        var toastEL = document.createElement("div");
        var k;
        for (k in divCss) {
            toastEL.style[k] = divCss[k];
        }
        window.addEventListener("load", function () {
            window.document.body.appendChild(toastEL);
        });
        return toastEL;
    })(defautSetting);


    //save all messages
    var messages = [];


    //显示消息
    var toastMessages = function () {
        if (messages.length === 0) {
        	toastEL.show=false;
        	toastEL.style.display="none";
            return;
        }
    	if(!toastEL.show){
    		toastEL.style.display="block";
    		toastEL.show=true;
		}

        var m = messages.shift();
        toastEL.textContent = m.message;
        //计算宽度
        var left=(document.body.offsetWidth-toastEL.offsetWidth)/2;
        if(left>0){
			toastEL.style.left=left+"px";
        }
        fadeIn(toastEL, defautSetting.fadeIn, function () {
            setTimeout(function () {
                fadeOut(toastEL, defautSetting.fadeOut, function () {
                    if (m.done) {
                       try{
                        	m.done.apply(window,m.message);
                       }catch(e){
                       	 console.log(e);
                       }
                    }
                    toastMessages();
                });
            },m.timeout);
        });
    };
    /**
     * 淡入
     * @param {Object} e 目标
     * @param {Object} t 时间
     * @param {Object} f 完成回调
     */
    var fadeIn = function (e, t, f) {
        e.style.opacity = 0;
        e.opacity = 0;
        var timeout = 30;//1000/30;
        //每次递增
        var increase = (100 * timeout / t) ^ 0;
        function run() {
            var next = e.opacity + increase;
            if (next >= 100) {
                e.style.opacity = 1;
                delete e.opacity;
                f();
                return;
            }
            e.opacity = next;
            e.style.opacity = next / 100;
            setTimeout(run, timeout);
        }

        run(timeout);
    };
    /**
     * 淡入
     * @param {Object} e 目标
     * @param {Object} t 时间
     * @param {Object} f 完成回调
     */
    var fadeOut = function (e, t, f) {
        e.style.opacity = 1;
        e.opacity = 100;
        var timeout = 30;//1000/30;
        //每次递增
        var increase = (100 * timeout / t) ^ 0;
        function run() {
            var next = e.opacity - increase;
            if (next <= 0) {
                e.style.opacity = 0;
                delete e.opacity;
                f();
                return;
            }
            e.opacity = next;
            e.style.opacity = next / 100;
            setTimeout(run, timeout);
        }

        run(timeout);
    };

    //expode
    window.toast = function () {
        var message, timeout=defautSetting.timeout, whenDone;
        for (var i = arguments.length, arg; i-- > 0;) {
            arg = arguments[i];
            if (typeof arg === "function") {
                whenDone = arg;
            } else if (typeof arg === "number") {
                timeout = arg;
            }else{
                message = arg;
            }
        }
        if(Array.isArray(message)){
            message=message.join("<br>");
        }
        if(message){
	        messages.push({message: message, timeout: timeout, done: whenDone});
	        toastMessages();
        }
    };

})(window, document);






