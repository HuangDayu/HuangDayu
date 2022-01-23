

// https://www.cnblogs.com/momo798/p/6797670.html
// 禁止右键菜单
document.oncontextmenu = function() {
    return false;
};
// 禁止文字选择
document.onselectstart = function() {
    return false;
};
// 禁止复制
document.oncopy = function() {
    return false;
};
// 禁止剪切
document.oncut = function() {
    return false;
};
// 禁止粘贴
document.onpaste = function() {
    return false;
};

// https://blog.csdn.net/qq_19898283/article/details/81142769
// https://blog.csdn.net/baidu_23275675/article/details/83302425
//禁用F12
window.onkeydown = window.onkeyup = window.onmousedown = window.onkeypress = function(event) {
  //    console.log("keyCode:"+event.keyCode+" button:"+event.button+" ctrlKey:"+event.ctrlKey+" buttons:"+event.buttons);
    // 判断是否按下F12，F12键码为123
    if (event.keyCode == 123) {
        event.preventDefault(); // 阻止默认事件行为
        event.returnValue = false;
        // Ctrl+Shift+I
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault(); // 阻止默认事件行为
        event.returnValue = false;
        // F12
    } else if (event.shiftKey && event.keyCode == 123) {
        event.preventDefault(); // 阻止默认事件行为
        event.returnValue = false;
        // Ctrl+U
    } else if (event.ctrlKey && event.keyCode == 85) {
        event.preventDefault(); // 阻止默认事件行为
        event.returnValue = false;
        // Ctrl+S
    } else if (event.ctrlKey && event.keyCode == 83) {
        event.preventDefault(); // 阻止默认事件行为
        event.returnValue = false;
        // Ctrl+左键
    } else if (event.ctrlKey && (event.button == 0 || event.buttons == 1) ) {
        event.preventDefault(); // 阻止默认事件行为
        event.button=8;
        event.keyCode=0;
        event.returnValue = false;
        console.log("keyCode:"+event.keyCode+" button:"+event.button+" ctrlKey:"+event.ctrlKey+" buttons:"+event.buttons);
        // alert("sorry");
    }

};

var threshold = 160; // 打开控制台的宽或高阈值
// 每秒检查一次
var check = setInterval(function() {
    if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        // 如果打开控制台，则刷新页面
        window.location.reload();
    }
},
1000);