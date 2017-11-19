/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MAP = {
    array: [],
    mapGeneration: function (rows, columns) {
        for (i = 0; i < (rows + 2); i++) {
            this.array[i] = [];
            for (j = 0; j < (columns + 2); j++) {
                this.array[i][j] = 4;
            }
        }

        for (i = 1; i < rows + 1; i++) {
            for (j = 1; j < columns + 1; j++) {
                if (Math.round(Math.random()*2) == 2) {
                    this.array[i][j] = Math.random() * 3; // [0-1) * 3 -> [0,3)
                } else {
                    this.array[i][j] = 0;
                }
            }
        }
    }
};