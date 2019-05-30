
var newstitles = document.getElementsByClassName("news-title");
var newssummary = document.getElementsByClassName("news-summary");
var newslinks = document.getElementsByClassName("news-link");
var userlogstatus = document.getElementById("log-status");
var pageNumber  = document.getElementById("pagenumber").innerHTML;
var platforms = document.getElementsByClassName("platform");
var categories = document.getElementsByClassName("category");
var newsids = document.getElementsByClassName("newsid");
var newstexts = document.getElementsByClassName("news-text");
var pagenumber = 0;

$(function () {
    $.ajax({
            url:"http://129.211.6.69:8081/api/news/feed",
            datatype:"json",
            type:"get",
            async:false,
            headers: {'content-type':'application/json'},
            data: {"page":pageNumber},
            success:function (data,textStatus) {
                //console.log(data[0].url);
                //console.log(data[0].title);
                for (var i = 0;i < newstitles.length;i++){
                    newstitles[i].innerHTML=data[i].title;
                    newssummary[i].innerHTML=data[i].summary.substring(0,50)+"...";
                    newslinks[i].setAttribute("href",data[i].url);
                    newslinks[i].setAttribute("target","_blank");
                    newstexts[i].setAttribute("id",data[i].id);



                    switch (data[i].topic) {
                        case "china": categories[i].innerHTML="国内";break;
                        case "world": categories[i].innerHTML="国际";break;
                        case "mil": categories[i].innerHTML="军事";break;
                        case "taiwan": categories[i].innerHTML="港台";break;
                        case "opinion": categories[i].innerHTML="论点";break;
                        case "look": categories[i].innerHTML="观察";break;
                        case "oversee": categories[i].innerHTML="外媒";break;
                        case "society": categories[i].innerHTML="社会";break;
                    }
                };
            },
            error:function (err) {
                console.log(err);
            }
        }
    )
    $("#nextpage").click(function () {
        pageNumber++;
        $.ajax({
            url:"http://129.211.6.69:8081/api/news/feed",
            datatype:"json",
            type:"get",
            async:false,
            headers: {'content-type':'application/json'},
            data: {"page":pageNumber},
            success:function (data,textStatus) {
                //console.log(data[0].url);
                //console.log(data[0].title);
                for (var i = 0;i < newstitles.length;i++){
                    newstitles[i].innerHTML=data[i].title;
                    newssummary[i].innerHTML=data[i].summary.substring(0,50)+"...";
                    newslinks[i].setAttribute("href",data[i].url);
                    newslinks[i].setAttribute("target","_blank");
                    newstexts[i].setAttribute("id",data[i].id);

                    // if(data[i].platform == "huanqiu"){
                    //     platforms[i].innerHTML="来源：环球网";
                    // }
                    switch (data[i].topic) {
                        case "china": categories[i].innerHTML="国内";break;
                        case "world": categories[i].innerHTML="国际";break;
                        case "mil": categories[i].innerHTML="军事";break;
                        case "taiwan": categories[i].innerHTML="港台";break;
                        case "opinion": categories[i].innerHTML="论点";break;
                        case "look": categories[i].innerHTML="观察";break;
                        case "oversee": categories[i].innerHTML="外媒";break;
                        case "society": categories[i].innerHTML="社会";break;
                    }
                };
            },
            error:function (err) {
                console.log(err);
            }
        })
    })
    $("#previouspage").click(function () {
        if(pageNumber>0){
            pageNumber--;
            $.ajax({
                url:"http://129.211.6.69:8081/api/news/feed",
                datatype:"json",
                type:"get",
                async:false,
                headers: {'content-type':'application/json'},
                data: {"page":pageNumber},
                success:function (data,textStatus) {
                    //console.log(data[0].url);
                    //console.log(data[0].title);
                    for (var i = 0;i < newstitles.length;i++){
                        newstitles[i].innerHTML=data[i].title;
                        newssummary[i].innerHTML=data[i].summary.substring(0,50)+"...";
                        newslinks[i].setAttribute("href",data[i].url);
                        newslinks[i].setAttribute("target","_blank");
                        newstexts[i].setAttribute("id",data[i].id);

                        if(data[i].platform == "huanqiu"){
                            platforms[i].innerHTML="来源：环球网";
                        }
                        switch (data[i].topic) {
                            case "china": categories[i].innerHTML="国内";break;
                            case "world": categories[i].innerHTML="国际";break;
                            case "mil": categories[i].innerHTML="军事";break;
                            case "taiwan": categories[i].innerHTML="港台";break;
                            case "opinion": categories[i].innerHTML="论点";break;
                            case "look": categories[i].innerHTML="观察";break;
                            case "oversee": categories[i].innerHTML="外媒";break;
                            case "society": categories[i].innerHTML="社会";break;
                        }


                    };


                },
                error:function (err) {
                    console.log(err);
                }
            })
        }


    })
    //console.log(pageNumber);
})