/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Actions
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Actions

var iframeWP = {
    //https://stackoverflow.com/questions/6102636/html-code-as-iframe-source-rather-than-a-url
    //https://en.wikipedia.org/wiki/Data_URI_scheme
    error_html: "data:text/html;charset=utf-8," + encodeURIComponent("<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<title>TODO supply a title</title>\
        <meta charset='UTF-8'>\
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>\
        <style>\
            body {background-color: #CCFFC1;}\
            h1 {color: #ff5e99;}\
            div {font-size: 2em; color: #ff5e99;}\
        </style>\
        </head>\
        <body>\
        <h1>ERROR</h1>\
        <div>in href - Set href</div>\
        </body>\
        </html>"),
    href: "", // iframeWebpagePreview_error.html

    // IDs
    iframeID: "iframeWP_ID",
    mainBodyID: "", //

    // Styles - Classes
    styleSmall: "iframeWP-window-small",
    styleFull: "iframeWP-window-full", //

    //FUNCTIONS

    // Init - main function
    iframeWPInit: function (mainBodyID) {
        this.mainBodyID = mainBodyID;
        this.href = this.error_html;
        this.iframeUpdate();
    },
    // Update function
    iframeUpdate: function () {
        if (document.getElementById(this.iframeID) === null) {
            
             var iframe = document.createElement("iframe");
             iframe.setAttribute("id", this.iframeID);
             iframe.setAttribute("src", this.href);
             iframe.className = this.styleSmall;
             document.getElementById(this.mainBodyID).appendChild(iframe);
             
             // Future BUGs
             var div = document.createElement("div");
             div.setAttribute("onclick", "iframeWP.iframeWPSmallFull()"); // Here can be bugs :) iframeWP ???
             div.className = 'iframeWP-button-right-top';
             div.innerHTML = "&#128269;";
             document.getElementById(this.mainBodyID).appendChild(div);
            /*
             document.getElementById(this.mainBodyID).innerHTML +=
             "<iframe id=" + this.iframeID + " class=" + this.styleSmall + " src=" + this.href + ">" +
            "<p>Your browser does not support iframes.</p>" +
             "</iframe>";
             // Future BUGs
             //"<div class='iframeWP-button-right-top' onclick='iframeWP.iframeWPSmallFull()'>&#128269;</div>";    // Here can be bugs :)
             //*/
            //
        } else {
            document.getElementById(this.iframeID).src = this.href;
        }
    },
    iframeWPSetHref: function (href) {
        this.href = href;
        this.iframeUpdate();
    },
    iframeWPSmallFull: function () {
        if (!document.getElementById(this.iframeID).classList.contains(this.styleFull))
        {
            document.getElementById(this.iframeID).classList.add(this.styleFull);
            document.getElementById(this.iframeID).focus();
        } else {
            document.getElementById(this.mainBodyID).focus();
            document.getElementById(this.iframeID).classList.remove(this.styleFull);
        }
    }
};