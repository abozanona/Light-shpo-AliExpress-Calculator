$(document).ready(function(){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL("js/calculator.js");
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(s);
});