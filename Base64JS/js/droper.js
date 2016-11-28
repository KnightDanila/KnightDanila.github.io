/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fileDialog = document.getElementById("file-dialog");
var target = document.getElementById("your-files");
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




