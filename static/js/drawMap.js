//draw the map dot
var name,city,unit,category;

var drawMap = function() {
    var canvas = document.getElementById("myCanvas");
    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;

    var ctx = canvas.getContext("2d");
    var radial = ctx.createRadialGradient(250, 250, 0, 200, 200, 100);
    radial.addColorStop(0, "#FFDD00");
    radial.addColorStop(1, "#FFDD00");

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
             name = $('#name').text();
             city = $('#city').text();
             unit = $('#unit').text();
             category = $('#category').text();


            ctx.beginPath();
            ctx.fillStyle = radial;
            ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
            ctx.fill();
        });

    });
    //make data loading automatically
    var trigeerClick = function(){
        $('a#calculate').trigger('click');
    }
    setInterval(trigeerClick, Math.random()*100+100);

}
drawMap();

function showInfoModel(userName, city, unit, category) {
    
    var self = this;
    self.customerInfo = ko.observableArray(
        [{
            name: userName,
            city: city,
            item: {
                unit: unit,
                category: category
            }
        }]
    );
    self.addCustomer = function() {
        console.log(userName);
        self.customerInfo.push({ name: 'userName', city: 'city', item: {
                unit: 'unit',
                category: 'category'
            }});
    };
}

ko.applyBindings(new showInfoModel(name, city, unit, category), document.querySelector('.forkit-curtain'));

$("canvas#myCanvas").on("mousedown", function(e) {
    var getX = e.pageX,
        getY = e.pageY;
    console.log(getX + " / " + getY);
});
