var singletopic = document.getElementById("topic");
var singletitle = document.getElementById("title");
var singlecontent = document.getElementById("news-content");
var newstimes = document.getElementById("newstime");
var relatedtitles = document.getElementsByClassName("related-title");
var relatedcontents = document.getElementsByClassName("related-content");
var relatedtimes = document.getElementsByClassName("related-time");
var subrelateds = document.getElementsByClassName("subrelated");
var linkdiv = document.getElementsByClassName("editor text-center");

$(function () {   //进入页面时渲染
    var selfurl = "http://129.211.6.69:8081/api/news/";
    selfurl+=localStorage.getItem("clickedNewsID");

    $.ajax({
        url:selfurl,
        datatype:"json",
        type:"get",
        async:false,
        headers: {'content-type':'application/json',},
        data: {"newsId":localStorage.getItem("clickedNewsID")},

        beforeSend:function(xhr){
            if(localStorage.CurrentUserToken!=null){
                xhr.setRequestHeader("Authorization",localStorage.getItem("CurrentUserToken"));
            }
        },

        success:function (data,textStatus) {

            //渲染本条新闻

            //singletopic.innerHTML = data.currentNews.topic;
            singletitle.innerHTML = data.currentNews.title;
            singletitle.setAttribute("href",data.currentNews.url);
            singletitle.setAttribute("target","_blank");
            singlecontent.innerHTML = data.currentNews.summary;
            newstimes.innerHTML = data.currentNews.pubtime.substring(0,10);
            newstimes.innerHTML += " "+data.currentNews.pubtime.substring(11,19);
            //$("#related-content").innerHTML = data.clusteredNews.
            //relatedcontents.innerHTML = data.clusteredNews.summary;

            switch (data.currentNews.topic) {
                case "china": singletopic.innerHTML="国内";break;
                case "world": singletopic.innerHTML="国际";break;
                case "mil": singletopic.innerHTML="军事";break;
                case "taiwan": singletopic.innerHTML="港台";break;
                case "opinion": singletopic.innerHTML="论点";break;
                case "look": singletopic.innerHTML="观察";break;
                case "oversee": singletopic.innerHTML="外媒";break;
                case "society": singletopic.innerHTML="社会";break;
            }
            //for(var i =0;i<relatedcontents)

            //渲染相关新闻
            //动态创建标签
            var boxes = document.getElementsByClassName("related-box")[0];
            for(var i = 0;i<data.clusteredNews.length;i++){
                var la = document.createElement("a");
                la.setAttribute("class","subrelated");
                var ldiv = document.createElement("div");
                ldiv.setAttribute("class","editor");
                var lh = document.createElement("h3");
                lh.setAttribute("class","related-title");
                var lp = document.createElement("p");
                lp.setAttribute("class","related-content");
                var llabel = document.createElement("label");
                llabel.setAttribute("class","related-time");
                la.appendChild(ldiv);
                ldiv.appendChild(lh);
                ldiv.appendChild(lp);
                ldiv.appendChild(llabel);
                boxes.appendChild(la);
            }

            for(var i =0;i<data.clusteredNews.length;i++){
                relatedtitles[i].innerHTML = data.clusteredNews[i].title;
                relatedcontents[i].innerHTML = data.clusteredNews[i].summary;
                relatedtimes[i].innerHTML = data.clusteredNews[i].pubtime.substring(0,10)+" "
                    +data.clusteredNews[i].pubtime.substring(11,19);
                subrelateds[i].setAttribute("id",data.clusteredNews[i].id);
                //subrelateds[i].setAttribute("id",data.clusteredNews[i].id);
                subrelateds[i].setAttribute("href",data.clusteredNews[i].url);
                subrelateds[i].setAttribute("target","_blank");
            }
        },
        error:function (err) {
            console.log(err);
        }
    })




    $(".subrelated").click(function () {
        //点击相关的新闻单条后渲染
        selfurl+=$(this).attr("id");
        $.ajax({
            url:selfurl,
            datatype:"json",
            type:"get",
            async:false,
            headers: {'content-type':'application/json',},
            data: {"newsId":$(this).attr("id")},
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization",localStorage.getItem("CurrentUserToken"));
            },

            success:function (data,textStatus) {

                //singletopic.innerHTML = data.currentNews.topic;
                // singletitle.innerHTML = data.currentNews.title;
                // singlecontent.innerHTML = data.currentNews.summary;
                // newstimes.innerHTML = data.currentNews.pubtime.substring(0,10);
                // newstimes.innerHTML += " "+data.currentNews.pubtime.substring(11,19);
                //$("#related-content").innerHTML = data.clusteredNews.
                //relatedcontents.innerHTML = data.clusteredNews.summary;

                // switch (data.currentNews.topic) {
                //     case "china": singletopic.innerHTML="国内";break;
                //     case "world": singletopic.innerHTML="国际";break;
                //     case "mil": singletopic.innerHTML="军事";break;
                //     case "taiwan": singletopic.innerHTML="港台";break;
                //     case "opinion": singletopic.innerHTML="论点";break;
                //     case "look": singletopic.innerHTML="观察";break;
                //     case "oversee": singletopic.innerHTML="外媒";break;
                //     case "society": singletopic.innerHTML="社会";break;
                // }
                //for(var i =0;i<relatedcontents)
                for(var i =0;i<data.clusteredNews.length;i++){
                    relatedtitles[i].innerHTML = data.clusteredNews[i].title;
                    // relatedtitles[i].setAttribute("href",data.clusteredNews[i].url);
                    // relatedtitles[i].setAttribute("target","_blank");
                    relatedcontents[i].innerHTML = data.clusteredNews[i].summary;
                    relatedtimes[i].innerHTML = data.clusteredNews[i].pubtime.substring(0,10)+" "
                        +data.clusteredNews[i].pubtime.substring(11,19);



                    //linkdiv[i].setAttribute("href",data.clusteredNews[i].url);

                }
            },
            error:function (err) {
                console.log(err);
            }
        })



    })


})
