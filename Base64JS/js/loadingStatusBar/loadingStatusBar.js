/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* For Animation*/
/*
var loadingStatusBarInt = 0;

setInterval(function(){
    //var elements = document.getElementsByClassName('.loading-progress-sparkle');
    //for (i = 0; i < elements.length; i++) {
        $(".loading-progress-sparkle").css("background", 
        "\
        repeating-linear-gradient(\
        135deg,\
        transparent 0%,\
        transparent "+(loadingStatusBarInt-20)+"%,\
        rgba(255,255,255,0.7) "+loadingStatusBarInt+"%,\
        transparent "+(loadingStatusBarInt+20)+"%,\
        transparent 100%\
        )"
            
        );
loadingStatusBarInt+=5;
if(loadingStatusBarInt>120){
    loadingStatusBarInt=-20;
}
    //}
},50);
*/

function loadingStatus(obj, current, max){
    //alert(document.getElementById("file-loading-progress").childNodes[0]);
    //alert($("#"+obj).children(".loading-progress-sparkle").css("background"));  
    var percent = (current/max)*100;
    $("#"+obj).children(".loading-progress").css("width", percent+"%");
    $("#"+obj).children(".loading-progress-sparkle").css("width", percent+"%");
    
}