function addLoadEvent(func) {   //出现bug
    var oldevent = window.onload;
    if(typeof window.onload != 'function'){
        window.onload=func;
    }
    else{
        window.onload=function () {
            oldevent();
            func();
        }
    }
}

