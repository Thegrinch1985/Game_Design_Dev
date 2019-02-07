// Get a reference to the canvas
var ctx = myCanvas.getContext('2d');
var line = myCanvas.getContext('2d');
var line2 = myCanvas.getContext('2d');
// Get canvas width and height
var width = myCanvas.width;
var height = myCanvas.height;

// x,y at centre
var x = width / 2;
var y = height / 2;


var radius = 125;
var startAngle =  .28 * Math.PI;
var endAngle =  1.80* Math.PI;
var counterClockwise = false;

ctx.beginPath();
ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;
ctx.stroke();
ctx.fillStyle = 'yellow';
ctx.fill();
line.beginPath();
line.moveTo(x,y);
line.lineTo(width, 10);
line.lineWidth = '1'
line.strokeStyle = 'blue';
line.stroke();

line2.beginPath();
line2.moveTo(x,y);
line2.lineTo(width, width);
line2.lineWidth = '1'
line2.strokeStyle = 'blue';
line2.stroke();
