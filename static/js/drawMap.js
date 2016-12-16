//draw the map dot

$("canvas#myCanvas").on("mousedown", function(e) {
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
