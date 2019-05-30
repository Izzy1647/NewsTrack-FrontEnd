//如果登陆状态 就把未登录改成已登陆 把登陆按钮改成登出
var loginstatus = document.getElementById("log-status");

var thebutton = document.getElementById("loginout")
if(localStorage.LogStatus=="logged"){
    loginstatus.innerHTML = "已登陆";
    thebutton.innerHTML = "登出";
    thebutton.setAttribute("href","index.html");
    // thebutton.onclick=function () {
    //     localStorage.removeItem("CurrentUserToken");
    // }
}

thebutton.onclick = function () {
    localStorage.LogStatus = "unlogged";
    thebutton.innerHTML = "未登录";
    localStorage.removeItem("CurrentUserToken");
    thebutton.setAttribute("href","login.html");
    window.location.href="index.html";
}



