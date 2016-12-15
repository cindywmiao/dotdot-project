//draw the map dot
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
            var name = $('#name').text();
            var city = $('#city').text();
            var unit = $('#unit').text();
            var category = $('#category').text();


            ctx.beginPath();
            ctx.fillStyle = radial;
            ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
            ctx.fill();
        });
    });


    make data loading automatically
       var trigeerClick = function(){
           $('a#calculate').trigger('click');
       }
    //setInterval(trigeerClick, Math.random()*100+100);

}
drawMap();

// function showInfoModel() {

//     var self = this;
//     var name_c = $('#name').text(),
//         city_c = $('#city').text(),
//         unit_c = $('#unit').text(),
//         category_c = $('#category').text();

//     self.customerInfo = ko.observableArray(
//         [{
//             name: 'userName',
//             city: 'city',

//                 unit: 'unit',
//                 category: 'category'

//         }]
//     );
//     self.changeInfo = ko.observableArray(
//         [{
//             name: ko.observable(name_c),
//             city: ko.observable(city_c),
//                 unit: ko.observable(unit_c),
//                 category: ko.observable(category_c)

//         }]
//     );
//     self.addCustomer = ko.dependentObservable(function() {
//         console.log('in');
//         self.customerInfo.push(self.changeInfo);
//     });
// }

// ko.applyBindings(new showInfoModel(), document.querySelector('.forkit-curtain'));


$("canvas#myCanvas").on("mousedown", function(e) {
    var getX = e.pageX,
        getY = e.pageY;

    $('div.modelCurtain').css({ 'top': getY - 100, 'left': getX - 100 });
    $('div.modelCurtain').animate({ opacity: "0.2" });
    setTimeout(function() {
        $('div.modelCurtain').animate({ opacity: "0" });
    }, 5000);
    console.log(getX + " / " + getY);
});
