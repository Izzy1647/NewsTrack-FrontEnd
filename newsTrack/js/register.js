var favors = document.getElementsByClassName("favor");
var favorvalues = [];


$(function () {
    $("#send").click(function () {
        for (var i =0;i<favors.length;i++){
            if(favors[i].checked){
                favorvalues.push(favors[i].value);
            }
        }

        console.log(favorvalues);
        $.ajax({
            type: "POST",
            url:"http://129.211.6.69:8081/api/user",
            headers: {'content-type':'application/json'},
            data: JSON.stringify(GetJsonData()),
            dataType:"json",
            success:function (data,textStatus) {
                //console.log(data.email);
                var userid = data.id;
                alert("注册成功！您的id为"+userid);
                localStorage.setItem("currentID",userid);
                //localstorage中存入用户id和对应token
                //var userid = data.id;
                localStorage.setItem(userid,data.token);
                window.location.href = "login.html";
            },
            error:function () {
                alert("注册失败，请重试");
            }
        })


        function GetJsonData() {
            var json = {
                "username": $("#username").val(),
                "password": $("#password").val(),
                "email":$("#email").val(),
                "likeA":favorvalues[0],
                "likeB":favorvalues[1],
                "likeC":favorvalues[2],
            };
            return json;
        }
    })

})