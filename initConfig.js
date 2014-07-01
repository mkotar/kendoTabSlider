$(document).ready(function () {
    var cities = ['Atlanta', 'Georgia', 'Chicago', 'Washington', 'Manchester', 'Leeds', 'York', 'Newcastle', 'Bonn', 'Munich', 'Bremen', 'Warsaw', 'Gdansk', 'Perth', 'Dubai', 'Oslo'];
    $("#tabStrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });


    var tabStrip = $("#tabStrip").data('kendoTabStrip'),
        append = function (name) {
            tabStrip.append({
                text: 'City: ' + name,
                content: "This is content for: " + name
            });
            tabStrip.select(tabStrip.contentElements.length - 1);
        };


    $('.addNewTab').on('click', function () {
        var tabName = cities[Math.floor(Math.random() * cities.length)]
        append(tabName);
    });

    $('#tabStrip').kendoTabSlider();

});