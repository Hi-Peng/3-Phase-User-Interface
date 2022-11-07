function Graph(config) {
    // user defined properties
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = 'white';
    this.font = '8pt whitemonospace';
    this.tickSize = 20;

    // relationships
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 5000;
    this.scaleX = ((this.canvas.width / this.rangeX) + window.devicePixelRatio);
    this.scaleY = ((this.canvas.height / this.rangeY) + window.devicePixelRatio);
}

Graph.prototype.drawEquation = function (minX_cus, maxX_cus, equation, color, thickness) {
    var context = this.context;


    context.save();
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(minX_cus, equation(minX_cus));

    for (var x = minX_cus + this.iteration; x <= maxX_cus; x += this.iteration) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};

Graph.prototype.clearGraph = function () {
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Graph.prototype.transformContext = function () {
    var context = this.context;

    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);

    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    context.scale(this.scaleX, -this.scaleY);
};

var myGraph = new Graph({
    canvasId: 'myCanvas',
    minX: 0,
    minY: -1.2,
    maxX: Math.PI * 2,
    maxY: 1.2,
    unitsPerTick: Math.PI
});

var firingMode = 0;
const modeButton = document.getElementById("modeSelectButton")



function changeMode() {
    if (firingMode == 0) {
        firingMode = 1;
        console.log(firingMode);
    }
    else {
        firingMode = 0
    }
}

myGraph.drawEquation(0, 2 * Math.PI, function (x) { return (Math.sin(x)) }, 'green', 1);
myGraph.drawEquation(0, 2 * Math.PI, function (x) { return (Math.sin(x - (120 * (Math.PI / 180)))) }, 'red', 1);
myGraph.drawEquation(0, 2 * Math.PI, function (x) { return (Math.sin(x - (240 * (Math.PI / 180)))) }, 'blue', 1);

function update_plot() {
    var value = document.getElementById("input-slider").value;
    myGraph.clearGraph();
    if (firingMode == 0) {
        myGraph.drawEquation(0, 2 * Math.PI, function (x) { return (Math.sin(x)) }, 'green', 0.5);
        myGraph.drawEquation(0, Math.PI, function (x) {
            return ((((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x - (value / 100))) + 1)) - 0.5) - ((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x)) + 1)) - 0.5)) * Math.sin(x))
        }, 'whitesmoke', 1);

        myGraph.drawEquation(Math.PI, 2 * Math.PI, function (x) {
            return ((-((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x - (value / 100))) + 1)) - 0.5) + ((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x)) + 1)) - 0.5)) * Math.sin(x))
        }, 'whitesmoke', 1);
    }
    else {
        myGraph.drawEquation(0, 2 * Math.PI, function (x) { return (Math.sin(x)) }, 'green', 0.5);
        myGraph.drawEquation(0, Math.PI, function (x) {
            return ((((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x - (value / 100))) + 1)) - 0.5) - ((1 / (Math.pow(Math.abs(10), 1000 * Math.sin(x)) + 1)) - 0.5)) * Math.sin(x))
        }, 'whitesmoke', 1);
        myGraph.drawEquation(Math.PI, 2 * Math.PI, function (x) { return (Math.sin(x)) }, 'whitesmoke', 1);
    }
    document.getElementById("angle-value-span").textContent = (Math.abs((Math.abs((value) / 100) * (180 / Math.PI)) - 180)).toFixed() + "°";
    console.log("uS :",(((Math.abs((Math.abs((value) / 100) * (180 / Math.PI)) - 180)))*(10000/180)).toFixed());

}






