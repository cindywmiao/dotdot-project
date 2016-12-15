//draw the map dot
var drawMap = function() {

    var canvas = document.getElementById("myCanvas");
    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;

    var ctx = canvas.getContext("2d");
    var radial = ctx.createRadialGradient(250,250,0,200,200,100);
    radial.addColorStop(0,"#ff0000");
    radial.addColorStop(0.5,"#FFDD00");
    radial.addColorStop(1,"#FFDD00");



        $('a#calculate').unbind('click').click(function() {
        $.getJSON($SCRIPT_ROOT + '/_add_numbers', {}, function(data) {
            $('#dx').text(data.x);
            $('#dy').text(data.y);
            $('#name').text(data.name);
            $('#city').text(data.city);

            $('#unit').text(data.unit);
            $('#category').text(data.category);

            var x = $('#dx').text();
            var y = $('#dy').text();
            var name = $('#name').text();
            var city = $('#city').text();
            var unit = $('#unit').text();
            var category = $('#category').text();


            ctx.beginPath();
            ctx.fillStyle = radial;
            ctx.arc(x, y ,3, 0, 2*Math.PI,false);
            ctx.fill();
        });

    });

}
drawMap();


function showInfoModel(userName,address,item) {
    this.userName = userName;
    this.address = address;
    this.item = item;
}
ko.applyBindings(new showInfoModel('Monica','Shanghai','Food'),document.querySelector('.forkit-curtain h2'));
