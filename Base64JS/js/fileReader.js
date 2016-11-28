/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fileReader = new FileReader();
var FILE_READER_BIN_RESULT = 0;

//Обработчик для события load. Это событие срабатывает при каждом успешном завершении операции чтения.
fileReader.onload = function(event) {
    FILE_READER_BIN_RESULT = "111";
    FILE_READER_BIN_RESULT = event.target.result;
    /*FOR REAL BASE64 VERSION (But ti must be written)*/
    realBase64(FILE_READER_BIN_RESULT);
    
    /*FOR AUTO BASE64 VERSION*/
    //autoBase64(FILE_READER_BIN_RESULT);
};

fileReader.onerror = function(event) {
    console.error("Файл не может быть прочитан! код " + event.target.error.code);
};

// Обработчик события загрузки :)
progressNode = document.getElementById("file-loading-progress");
fileReader.onprogress = function(event) {
    if (event.lengthComputable) {
        progressNode.max = event.total;
        progressNode.value = event.loaded;
        
        loadingStatus("file-loading-progress", progressNode.value, progressNode.max);
    }
};