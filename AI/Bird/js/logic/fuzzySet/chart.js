/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ctx;
var myChart;
var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

function loadPage() {
    ////////// Smile
    var x = [1, 2, 3, 4, 5];
    var y = [10, 2, 1, 2, 10];
    drawChart(x, y, 0, 0.5, "SMILE");

    // TEST GRAPH
    /*
    var x1 = [1, 2, 3, 4, 5];
    var y1 = [1, 2, 3, 4, 5];

    var x2 = [6, 7, 8, 9, 10];
    var y2 = [1, 2, 3, 4, 5];
    drawChart(x1, y1);
    drawChart(x2, y2);
    */
    // TEST GRAPH POINTS
    /*
    drawPoint(3, 4, 'testPoint');
    drawPoint(5, 8, 'Batmen');
    */
}

// Рисует график по массивам arrX, arrY цвета color - может это стринг,
// пока не знаю, надо почитать документацию,
// transparent - прозрачность этого графика :)
function drawChart(arrX, arrY, color, transparent, label){
    var _label = typeof label !== 'undefined' ?  label : 'Component';
    var obj = {
        type: 'line',
        data: arrY,
        backgroundColor:`rgba(${random()}, ${random()}, ${random()}, ${transparent || 0.5})`,
        label: _label
    };
    //init
    if(!ctx){
        ctx = document.getElementById("myChartResult");
        myChart = new Chart(ctx, {
            data: {
                labels: arrX,
                datasets: [obj]
            },
            options: options
        });
        return;
    }
    //add new value
    myChart.data.labels = myChart.data.labels.concat(arrX);
    //удаляем повторяющиеся элементы
    myChart.data.labels = Array.from(new Set(myChart.data.labels));
    if(arrX[0] != myChart.data.labels[0]){
        var index = myChart.data.labels.indexOf(arrX[0]);
        for(var i=0; i<index; i++){
            obj.data.unshift(null);
        }
    }
    myChart.data.datasets.push(obj);
    myChart.update();
}

// Очищает график
function drawChartClear(){
    myChart = null;
    if(!ctx) return;
    ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
    ctx = null;
}

// Рисует точку, при наведении на которую выводится её название
// myChart на этот момент уже должен быть иницилизирован
function drawPoint(x, y, label){
    drawChart([x], [y], 1, 1, label );
    myChart.data.datasets[myChart.data.datasets.length - 1].showLine = false;
}

function random() {
    return Math.floor(Math.random() * 150).toString(10);
}