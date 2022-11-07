const { SerialPort } = require("serialport")

const selectPort = document.getElementById("app-content-port-select")

console.log(selectPort)
var i = 0

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
 
 
function portPopulate() {
    i = 0;
    removeOptions(selectPort);
    SerialPort.list().then(function (ports) {
        ports.forEach(function (port) {
            console.log("Port: ", port.path, i);
            selectPort.options[i] = new Option(port.path)
            i++;
        })
    });
}

function connectPort(){
    console.log("connect");
    const port = new SerialPort ({
        path: selectPort.options[selectPort.selectedIndex].text,
        baudRate: 57600
    })
}