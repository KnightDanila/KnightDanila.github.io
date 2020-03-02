/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * @Author: Egoshkin Danila (KnightDanila)
 * @Web: KnightDanila.github.io
 * @license: Apache-2.0
 */
/*
 * 1) Подумаем сколько функций может быть у лога:
 *  а) Добать в лог - add or log
 *  б) Очистить или обновить лог - logUpdata
 *  в) Изминить файл лога - logPath или logElem - если это HTML и JS
 */

var log = {
    ON: true,
    elemID: 'Log',
    mem: "",
    add: function (text) {
        /* FOR testing */
        if (this.ON) {
            //alert(text);
            try {
                console.log(text);
                document.getElementById(this.elemID).innerHTML += '<br>' + text;
                this.mem += text + "<br>" + '\n';
            } catch (err) {
                this.mem += text + "//It was error in: " + err + "<br>" + '\n';
                window.addEventListener('load', function () {
                    log.readMem();
                }); //???
            }

        }
    },
    readMem: function () {
        if (this.mem) {
            console.log("MEMORY:\n" + this.mem);
            document.getElementById(this.elemID).innerHTML += '<br>' + this.mem;
            this.mem = ""; // ???
        }
    },
    updata: function () {
        document.getElementById(this.elemID).innerHTML = "";
    },
    getLineNumber: function () {
        //See https://stackoverflow.com/a/27074218/470749
        var e = new Error();
        if (!e.stack)
            try {
                // IE requires the Error to actually be throw or else the Error's 'stack'
                // property is undefined.
                throw e;
            } catch (e) {
                if (!e.stack) {
                    return 0; // IE < 10, likely
                }
            }
        var stack = e.stack.toString().split(/\r\n|\n/);
        // We want our caller's frame. It's index into |stack| depends on the
        // browser and browser version, so we need to search for the second frame:
        var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
        do {
            var frame = stack.shift();
        } while (!frameRE.exec(frame) && stack.length);
        return frameRE.exec(stack.shift())[1];
    },
    getLineNumberAndInfo: function () {
        var e = new Error();
        if (!e.stack)
            try {
                // IE requires the Error to actually be thrown or else the 
                // Error's 'stack' property is undefined.
                throw e;
            } catch (e) {
                if (!e.stack) {
                    return 0; // IE < 10, likely
                }
            }
        var stack = e.stack.toString().split(/\r\n|\n/);
        return stack[stack.length - 1];
    },
    logSetElemID: function (elemID) {
        this.elemID = elemID;
    }
};