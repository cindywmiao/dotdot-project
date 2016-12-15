//draw the map dot
var drawMap = function() {
    var canvas = document.getElementById("myCanvas");
    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;
    var ctx = canvas.getContext("2d");

    $('a#calculate').unbind('click').click(function() {
        $.getJSON($SCRIPT_ROOT + '/_add_numbers', {}, function(data) {
            $('#dx').text(data.x);
            $('#dy').text(data.y);
            $('#name').text(data.name);
            $('#city').text(data.city);
            $('#unit').text(data.unit);
            $('#category').text(data.category);
            var x = $('#dx').text(),
                y = $('#dy').text();

            ctx.beginPath();
            //ctx.fillStyle = RGB(171,181,118);
            ctx.fillStyle = 'yellow';
            ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
            ctx.fill();
        });
    });

    //make data loading automatically
    var trigeerClick = function() {
            $('a#calculate').trigger('click');
        }
    //setInterval(trigeerClick, Math.random()*100+100);

}
drawMap();

function showInfoModel() {
    var self = this;

    self.customerInfo = ko.observableArray(
        [{
            name: 'userName',
            city: 'city',
            unit: 'unit',
            category: 'category'

        }]
    );
    self.addCustomer = function() {
        var name_c = $('#name').text(),
        city_c = $('#city').text(),
        unit_c = $('#unit').text(),
        category_c = $('#category').text();

        self.customerInfo.push({
            name: name_c,
            city: city_c,
            unit: unit_c,
            category: category_c
        });
    };
}

ko.applyBindings(new showInfoModel(), document.querySelector('.container'));

$("canvas#myCanvas").on("mousedown", function(e) {
    $.getJSON($SCRIPT_ROOT + '/_add_prob', {}, function(data) {
        var getX = e.pageX,
            getY = e.pageY;

        $('div.modelCurtain').css({ 'top': getY - 100, 'left': getX - 100 });
        $('div.modelCurtain').animate({ opacity: "0.2" });
        setTimeout(function() {
            $('div.modelCurtain').animate({ opacity: "0" });
        }, 5000);
        console.log(getX + " / " + getY);

        $('#top1').text(data.top1);
        $('#top2').text(data.top2);
        $('#top3').text(data.top3);

        $('#prob1').text(data.prob1);
        $('#prob2').text(data.prob2);
        $('#prob3').text(data.prob3);

        var top1 = $('#top1').text();
        var top2 = $('#top2').text();
        var top3 = $('#top3').text();

        var prob1 = $('#prob1').text();
        var prob2 = $('#prob2').text();
        var prob3 = $('#prob3').text();

        console.log('top1' + top1);
    });
});
