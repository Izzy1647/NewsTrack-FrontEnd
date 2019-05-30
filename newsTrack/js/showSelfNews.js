var titles = document.getElementsByClassName("title");
var topics = document.getElementsByClassName("topic");
var newscontents = document.getElementsByClassName("newscontent");
var cuid = document.getElementById("currentuserid");
var rectimes = document.getElementsByClassName("rectime");

$(function () {
    cuid.innerHTML = "当前用户id:"+localStorage.getItem("currentID");

    //推荐新闻渲染

    $.ajax({
        url:"http://129.211.6.69:8081/api/news/feed",
        datatype:"json",
        type:"get",
        async:false,
        headers: {'content-type':'application/json'},
        data: {"page":0,"pageSize":6,"userId":localStorage.getItem("currentID")},
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization",localStorage.getItem("CurrentUserToken"));
        },

        success:function (data,textStatus) {
            //console.log(data[0].url);
            //console.log(data[0].title);
            for (var i = 0;i < titles.length;i++){
                titles[i].innerHTML=data[i].title;
                titles[i].setAttribute("id",data[i].id);
                // titles[i].setAttribute("href",data[i].url);
                // titles[i].setAttribute("target","_blank");
                $(".title").click(function () {
                    //var selfurl = "http://129.211.6.69:8081/api/news/";
                    var newsid = $(this).attr("id");
                    localStorage.setItem("clickedNewsID", newsid);
                })

                rectimes[i].innerHTML = data[i].pubtime.substring(0,10)+" "+data[i].pubtime.substring(11,19);
                switch (data[i].topic) {
                    case "china": topics[i].innerHTML+="国内";break;
                    case "world": topics[i].innerHTML+="国际";break;
                    case "mil": topics[i].innerHTML+="军事";break;
                    case "taiwan": topics[i].innerHTML+="港台";break;
                    case "opinion": topics[i].innerHTML+="论点";break;
                    case "look": topics[i].innerHTML+="观察";break;
                    case "oversee": topics[i].innerHTML+="外媒";break;
                    case "society": topics[i].innerHTML+="社会";break;

                }
                newscontents[i].innerHTML = data[i].summary;




            }

        },
        error:function (err) {
            console.log(err);
        }
    })

    var historyurl = "http://129.211.6.69:8081/api/news/record?userId=";
    historyurl+=localStorage.getItem("currentID");
    var historytitles = document.getElementsByClassName("historytitle");
    var historycontents = document.getElementsByClassName("historycontent");
    console.log(historyurl);
    var historytimes = document.getElementsByClassName("historytime");


    //历史记录渲染


    // historyurl = "http://129.211.6.69:8081/api/news/record?userId="+localStorage.getItem("currentID");
    $.ajax({
        url:historyurl,
        datatype:"json",
        type:"get",
        async:false,
        headers: {'content-type':'application/json'},
        data: {"userId":localStorage.getItem("currentID")},
        beforeSend:function(xhr){
            xhr.setRequestHeader("Authorization",localStorage.getItem("CurrentUserToken"));
        },

        success:function (data,textStatus) {
            //console.log(data[0].url);
            //console.log(data[0].title);
            for (var i = 0;i < data.length;i++){
                historytitles[i].innerHTML = data[i].title;
                historycontents[i].innerHTML = data[i].summary;
                historytimes[i].innerHTML = data[i].pubtime.substring(0,10)+" "
                    +data[i].pubtime.substring(11,19);
                historytitles[i].setAttribute("id",data[i].newsId);
                $(".historytitle").click(function () {
                    //var selfurl = "http://129.211.6.69:8081/api/news/";
                    var newshisid = $(this).attr("id");
                    localStorage.setItem("clickedNewsID", newshisid);
                })

                //newscontents[i].innerHTML = data[i].summary;




            }

        },
        error:function (err) {
            console.log(err);
        }
    })
})