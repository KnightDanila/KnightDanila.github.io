/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var EnBase64;

(function () {

    var ConvertBase = function (num) {
        return {
            from: function (baseFrom) {
                return {
                    to: function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
    // binary to decimal
    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };
    // binary to hexadecimal
    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };
    // decimal to binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };
    // decimal to hexadecimal
    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };
    // hexadecimal to binary
    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    // hexadecimal to decimal
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    this.ConvertBase = ConvertBase;
})(this);

var hexTextArea = document.getElementById("hex-result");
var charTextArea = document.getElementById("char-result");
var base64TextArea = document.getElementById("base64-result");
var deBase64TextArea = document.getElementById("deBase64-result");
function autoBase64(obj) {
    //base64textArea.innerHTML = obj
    //var from = obj.search('base64,'); 
    //var to = obj.length;
    //var newstr = obj.substring(from+7,to);

    //newstr = "data:application/base64;" + newstr;

    //var aaa = "data:attachment/text,"+encodeURI("<body"+"//"+"style='background-repeat: no-repeat; background-image: url(" + obj + ") ;'></body>");
    //var aaa = "data:attachment/text,"+encodeURI("<body"+"//"+"style='background-repeat: no-repeat; background-image: url(" + obj + ") ;'></body>");
    //var aaa = "data:text/plain,"+"<body"+"//"+"style='background-repeat: no-repeat; background-image: url(" + obj + ") ;'></body>";

    //location.href = aaa;

    //base64textArea.innerHTML = obj;

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onInitFs, function () {
    });
    function onInitFs(fs) {

        /* IT WORK TOO, BUT BAD! SAVING TEMP FILE INSIDE */
        fs.root.getFile('newTest.bin', {create: true}, function (fileEntry) {

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function (e) {
                    console.log('Write completed.');
                };
                fileWriter.onerror = function (e) {
                    console.log('Write failed: ' + e.toString());
                };
                var BlobBilder = function () {
                    this.parts = [];
                }
                BlobBilder.prototype.append = function (part) {
                    this.parts.push(part);
                    this.blob = undefined; // Invalidate the blob
                };
                BlobBilder.prototype.getBlob = function () {
                    if (!this.blob) {
                        this.blob = new Blob(this.parts, {type: "text/plain"});
                    }
                    return this.blob;
                };
                // Create a new Blob and write it to log.txt.
                var blob = new BlobBilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
                //blob.append('Lorem Ipsum');
                //bb.append();
                blob.append("<video width='640' height='480' controls><source src='" + obj + "'></video>");
                fileWriter.write(blob.getBlob());
                fileWriter.addEventListener("writeend", function () {
                    // navigate to file, will download
                    location.href = fileEntry.toURL();
                }, false);
            }, function () {
            });
        }, function () {
        });
    }


    /*  
     window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
     
     window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
     fs.root.getFile('test.bin', {create: true}, function(fileEntry) { // test.bin is filename
     fileEntry.createWriter(function(fileWriter) {
     var arr = new Uint8Array(3); // data length
     
     arr[0] = 97; // byte data; these are codes for 'abc'
     arr[1] = 98;
     arr[2] = 99;
     
     var blob = new Blob();//Blob();
     blob[0]=("<video width='640' height='480' controls><source src='"+obj+"'></video>");
     
     
     fileWriter.addEventListener("writeend", function() {
     // navigate to file, will download
     location.href = fileEntry.toURL();
     }, false);
     
     fileWriter.write(blob);
     }, function() {});
     }, function() {});
     }, function() {});
     */
    ////////////////////////// BEST WAY
    /*
     window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
     
     window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
     fs.root.getFile('test.bin', {create: true}, function(fileEntry) { // test.bin is filename
     fileEntry.createWriter(function(fileWriter) {
     var arr = new Uint8Array(3); // data length
     
     arr[0] = 97; // byte data; these are codes for 'abc'
     arr[1] = 98;
     arr[2] = 99;
     
     var blob = new Blob([arr]);
     
     fileWriter.addEventListener("writeend", function() {
     // navigate to file, will download
     location.href = fileEntry.toURL();
     }, false);
     
     fileWriter.write(blob);
     }, function() {});
     }, function() {});
     }, function() {});
     */
////////////////////////////////////
    /*
     var hiddenElement = document.createElement('a');
     
     hiddenElement.href = 'data:attachment/text,' + encodeURI(obj);
     hiddenElement.target = '_blank';
     hiddenElement.download = 'myFile.txt';
     hiddenElement.click();
     */
    //alert(textWithURL);

    //var textWithURL = convertToLinks("data:attachment/html,"+"<body"+"//"+"style='background-repeat: no-repeat; background-image: url(" + obj + "); '></body>");
    //alert(textWithURL);
}

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        //alert(this._keyStr.length);
        //alert(this._keyStr.charAt(this._keyStr.length));
        //alert(this._keyStr.charAt(this._keyStr.length-1));
        
        var res = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        while (i < e.length) {
            chr1 = e.charCodeAt(i++); // 0100 1101
            chr2 = e.charCodeAt(i++); // 0110 0001
            chr3 = e.charCodeAt(i++); // 0110 1110

            //  [010 011]    [010 110]    [000 101] [101 110]
            enc1 = chr1 >> 2; //  0100 1101 >> 2 = 0001 0011
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); //  [ [0100 1101 & отрезаем последние два 0000 0011 = 0000 0001] << 4 = 0001 0000] | фактическ сложение с [ 0110 0001 >> 4 == 0000 0110] == 0001 1100
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); //  [ [ 0110 0001 & 0000 1111] сдвигаем на 2 что бы влезло 6] == 0000 0101
            enc4 = chr3 & 63; //  0110 1110 & 0011 1111 == 0010 1110
            
            if (isNaN(chr2)) {                          // enc2 != enc2 - то есть enc2 не равен вообще ничему :) - короче нельзя превратить в число что бы сравнить, абстракция как бесконечность
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            /*
            // It has bug - isNaN(enc2), isNaN(enc3) - it meen enc2, enc3 - why? This is bug :)
            if (isNaN(enc2)) {                          // enc2 != enc2 - то есть enc2 не равен вообще ничему :) - короче нельзя превратить в число что бы сравнить, абстракция как бесконечность
                enc3 = enc4 = 64;
            } else if (isNaN(enc3)) {
                enc4 = 64;
            }
            */
            res = res +
                    this._keyStr.charAt(enc1) +
                    this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) +
                    this._keyStr.charAt(enc4);
        }

        return res;
    },
    decode: function (e) {
        var res = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < e.length) {

            enc1 = this._keyStr.indexOf(e.charAt(i++));
            enc2 = this._keyStr.indexOf(e.charAt(i++));
            enc3 = this._keyStr.indexOf(e.charAt(i++));
            enc4 = this._keyStr.indexOf(e.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            res = res + String.fromCharCode(chr1);
            if (enc3 != 64) {
                res = res + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                res = res + String.fromCharCode(chr3);
            }

        }

        return res;
    }
};

function realBase64(obj) {
/// 
//base64textArea.innerHTML = "You don`t write it yet :)";

    if (obj.length < 1024 * 1024) {             // 1024*1024 = до метра
        var char = "";
        for (var i = 0; i < obj.length; i++) {
            var byteStr = obj.charCodeAt(i);
            char += " " + byteStr;
        }
        char = char.slice(1);
        charTextArea.innerHTML = char;
        var hex = "";
        for (var i = 0; i < obj.length; i++) {
            var byteStr = obj.charCodeAt(i).toString(16);
            if (byteStr.length < 2) {                       // Вот почему по два, мы по два символа читаем
                byteStr = "0" + byteStr;
            }
            hex += " " + byteStr;
        }
        hex = hex.slice(1);
        hexTextArea.innerHTML = hex;
        base64TextArea.innerHTML = Base64.encode(obj);
        deBase64TextArea.innerHTML = Base64.decode(Base64.encode(obj));
    } else {
        EnBase64 = "<video width='640' height='480' controls><source src='data:video/mp4;base64," + Base64.encode(obj) + "'></video>";
        $('.clip_button').css("visibility", "visible");

        var createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL || function () {};
        var blob = null;
        var content = "" + EnBase64;
        var mimeString = "application/octet-stream";
        window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;


        if (window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(content);
            blob = bb.getBlob(mimeString);
        } else {
            blob = new Blob([content], {type: mimeString});
        }
        var url = createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "file.txt";
        a.innerHTML = "download file";
        document.body.appendChild(a);


    }
}
