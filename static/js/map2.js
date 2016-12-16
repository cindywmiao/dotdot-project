var UK = new google.maps.LatLng(53.409532, -2.010498);
var IT = new google.maps.LatLng(42.745334, 12.738430);

google.maps.event.addDomListener(window, 'load', init);

var map;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {

        zoom: 2,

        center: new google.maps.LatLng(40.6700, -73.9400), // New York

                    // How you would like to style the map.
                    // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}],
        draggable : false,

        zoomControl: false,

        scrollwheel: false,

        disableDoubleClickZoom: true,

        disableDefaultUI: true,

        mapTypeId: google.maps.MapTypeId.PLAN
    };
    var mapElement = document.getElementById('map');

    map = new google.maps.Map(mapElement, mapOptions);

//    var marker = new google.maps.Marker({
//        position: new google.maps.LatLng(40.6700, -73.9400),
//        map: map
//    });
}



var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
    parking: {
        icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
        icon: iconBase + 'library_maps.png'
    },
    info: {
        icon: iconBase + 'info-i_maps.png'
    },
    orange: {
        icon: "../static/images/orange.png"
    }
};
var icon = {
    url: "../static/images/orange.png", // url
    scaledSize: new google.maps.Size(8, 8), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

function addmarker(latilongi) {
    var marker = new google.maps.Marker({
        position: latilongi,
        icon: icon,
        title: 'new marker',
        draggable: true,
        map: map
    });
}



var drawMap = function() {
//    var canvas = document.getElementById("myCanvas");
//    canvas.width = window.screen.availWidth;
//    canvas.height = window.screen.availHeight;
//    var ctx = canvas.getContext("2d");

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

            var latitude = parseFloat(x);
            var longitude = parseFloat(y);

            var point = new google.maps.LatLng(latitude, longitude);

//            ctx.beginPath();
//            //ctx.fillStyle = RGB(171,181,118);
//            ctx.fillStyle = 'yellow';
//            ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
//            ctx.fill();
            addmarker(point);
        });
    });

    //make data loading automatically
    var trigeerClick = function() {
            $('a#calculate').trigger('click');
        }
    setInterval(trigeerClick, Math.random()*500+100);

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



//$('#demo').on('click', function() {
//    console.log('here')
//    myFunction();
//})

$("div#map").on("mousedown", function(e) {
    $.getJSON($SCRIPT_ROOT + '/_add_prob', {}, function(data) {
        var getX = e.pageX,
            getY = e.pageY;

        $('div.modelCurtain').css({ 'top': getY - 100, 'left': getX - 100 });
        $('div.modelCurtain').animate({ opacity: "0.8" });
        setTimeout(function() {
            $('div.modelCurtain').animate({ opacity: "0" });
        }, 7000);

        $('#top1').text(data.top1);
        $('#top2').text(data.top2);
        $('#top3').text(data.top3);

        $('#prob1').text(data.prob1);
        $('#prob2').text(data.prob2);
        $('#prob3').text(data.prob3);

        var top1 = $('#top1').text();
        var top2 = $('#top2').text();
        var top3 = $('#top3').text();

        var prob1 = parseFloat($('#prob1').text()).toFixed(2)*100;
        var prob2 = parseFloat($('#prob2').text()).toFixed(2)*100;
        var prob3 = parseFloat($('#prob3').text()).toFixed(2)*100;

        dataTatal = [
        {
            data: [[0, prob1]],
            label: top1
        }, {
            data: [
                [1, prob2]
            ],
            label: top2
        }, {
            data: [
                [3, prob3]
            ],
            label: top3
        }];
        Flotr.draw(document.getElementById("chart"), dataTatal, {
            pie: {
                show: true,
                labelFormatter : function(pie, slice){
                return null;  //去除Label
            }
            },
            yaxis: {
                showLabels: false,
            },
            xaxis: {
                showLabels: false,
            },
            grid: {
                horizontalLines: false,
                verticalLines: false,
                outlineWidth: 0,
            },
            legend : {
                backgroundColor : null ,
                backgroundOpacity: 0.3,
            }

        });
    });
});
