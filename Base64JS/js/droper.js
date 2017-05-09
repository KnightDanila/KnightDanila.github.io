/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fileDialog = document.getElementById("file-dialog");
var target = document.getElementById("your-files");
var targetURL = document.getElementById("your-files-url");
var fileInfo = document.getElementById("file-info");

target.addEventListener("dragover", function (event) {
    event.preventDefault(); // отменяем действие по умолчанию (типа открыть файл в браузере)
}, false);
target.addEventListener("drop", function (event) {
    // отменяем действие по умолчанию (типа открыть файл в браузере)
    event.preventDefault();

    var files = event.dataTransfer.files;
    var len = files.length;

    showInfo(files, len);

}, false);
target.addEventListener("click", function (event) {
    fileDialog.click(); // Делаем вид что нажали на кнопку для загрузки файла
}, false);
fileDialog.addEventListener("change", function () {
    var files = fileDialog.files;
    var len = files.length;

    showInfo(files, len);
}, false);

function fileExists(url)
{
    var http = new XMLHttpRequest();
    try {
        http.open('HEAD', url, false);
        http.send();
    } catch (err) {
        console.log("LOG: dropper.js - fileExists - error: " + err.message);
        return false;
    }
    console.log("LOG: dropper.js - fileExists - http.status: " + http.status);
    return http.status != 404;
}
targetURL.addEventListener("change", function () {
    // отменяем действие по умолчанию (типа открыть файл в браузере)
    event.preventDefault();
    var yourFilesUrlError = document.getElementById("your-files-url-error");
    if (!fileExists(targetURL.value)) {
        yourFilesUrlError.style.display = "block";
    } else {
        yourFilesUrlError.style.display = "none";

        var myBlob;
        var http = new XMLHttpRequest();
        http.open('GET', targetURL.value, true);
        http.responseType = 'blob';
        http.onload = function (e) {
            if (this.status == 200) {
                myBlob = this.response; // myBlob is now the blob that the object URL pointed to.
                var files = [myBlob];
                var len = 1;
                showInfo(files, len);
            }
        };
        http.send();
    }
}, false);
function showInfo(files, len) {

    fileInfo.innerHTML = "";
    for (var i = 0; i < len; i++) {
        fileInfo.innerHTML +=
                "\
                <tr>\
                    <td>FullFilePath:   " + files[i].fullPath + "</td>\
                    <td>BlobFilePath:   " + URL.createObjectURL(files[i]) + "</td>\
                    <td>Filename:       " + files[i].name + "</td>\
                    <td>Type:           " + files[i].type + "</td>\
                    <td>Size:           " + files[i].size + " byte</td>\
                </tr>\
            ";

        /*FOR REAL BASE64 VERSION (But ti must be written)*/
        //fileReader.readAsArrayBuffer(files[i]);
        //fileReader.readAsText(files[i]);
        fileReader.readAsBinaryString(files[i]);

        /*FOR AUTO BASE64 VERSION*/
        //fileReader.readAsDataURL(files[i]);
    }

}




