/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var SimpleTimer = {
    divID: "SimpleTimer",
    mainBodyID: "", //

    start: new Date().getTime(), //

    init: function (mainBodyID) {
        this.start = new Date().getTime();
        this.mainBodyID = mainBodyID;
        var div = document.createElement("div");
        div.setAttribute("id", this.divID);
        div.className = 'SimpleTimer';
        document.getElementById(this.mainBodyID).appendChild(div);

        setInterval(function () {
            SimpleTimer.showTime(); // this will run after every 1 seconds
        }, 1000);
    },
    startAgain: function () {
        this.start = new Date().getTime();
    },
    getTime: function () {
        return (new Date().getTime()) - this.start;
    },
    showTime: function () { //https://www.youtube.com/watch?v=LUapZhcsdx8
        var date = new Date(this.getTime());
        var values = [date.getUTCHours(), date.getMinutes(), date.getSeconds()];

        for (var i = 0; i < 3; i++)
            if (values[i] < 10)
                values[i] = "0" + values[i];
        
        document.getElementById(this.divID).innerHTML = values.join(":");;
    }


};