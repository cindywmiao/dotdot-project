var drawMap = function() {
    var width = $('img').width();
    height = $('img').height();

    $('canvas').width(screen.availWidth);

    var canvas = document.getElementById("myCanvas");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");
    var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

    // That's how you define the value of a pixel //
    function drawPixel(x, y, r, g, b, a) {
        var index = (x + y * canvasWidth) * 4;
        canvasData.data[index + 0] = r;
        canvasData.data[index + 1] = g;
        canvasData.data[index + 2] = b;
        canvasData.data[index + 3] = a;
    }

    // That's how you update the canvas, so that your //
    // modification are taken in consideration //
    function updateCanvas() {
        ctx.putImageData(canvasData, 10, 0);
    }
    drawPixel(100, 10, 255,242,0,255);
    drawPixel(100, 20, 255,242,0,255);
    drawPixel(100, 30, 255,242,0,255);
    updateCanvas();
}


drawMap();
