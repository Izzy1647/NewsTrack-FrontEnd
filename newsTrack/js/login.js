var logStatus = document.getElementById("log-status");
// sessionStorage.setItem("pageNumber",0);

$(function () {
    $("#send").click(function () {
        $.ajax({
            type: "POST",
            url:"http://129.211.6.69:8081/api/login",
            headers: {'content-type':'application/json'},
            data: JSON.stringify(GetJsonData()),
            dataType:"json",
            success:function (data,textStatus) {
                alert('登陆成功');
                //window.open("/Users/zzy/WebstormProjects/newsTrack/index.html")
                logStatus.innerHTML = "已登陆";
                localStorage.setItem("LogStatus","logged");
                window.location.href = "index.html";
                localStorage.setItem("CurrentUserToken",data.token);
                localStorage.setItem("currentID",data.id);


            },
            error:function (err) {
                alert('登陆失败！');
                console.log(err);
            }
        })
        function GetJsonData() {
            var json = {
                "password":$("#password").val(),
                "username":$("#username").val(),
            };
            return json;
        }
    })
})