var Hotel;

$(document).ready(function() {
    Hotel = function(data) {
        var self = this;
        eachKeyValue(data, function(key, val) {
            self[key] = val;
        });
        // if there's a hotel, just delete previous and add this one
        if (currentDay.hotel) {
            currentDay.hotel.delete();
        }
        // building marker
        this.buildMarker()
            .drawMarker()
            .buildItineraryItem()
            .drawItineraryItem();
        currentDay.hotel = this;
    };

    // Hotel.prototype = generateAttraction({
    //     icon: '/images/lodging_0star.png',
    //     $listGroup: $('#my-hotel .list-group'),
    //     $all: $('#all-hotels'),
    //     all: all_hotels,
    //     constructor: Hotel
    // });

    // now using AJAX to make a get request for the data
    $.get('/hotels', function(data) {
        Hotel.prototype = generateAttraction({
            icon: '/images/lodging_0star.png',
            $listGroup: $('#my-hotel .list-group'),
            $all: $('#all-hotels'),
            // all: all_hotels,
            all: data,
            constructor: Hotel,
            addToDay: function(attraction) {
                $.post('/day/' + currentDay.number + '/hotel', attraction);
            }
        });

        // delete hotel
        Hotel.prototype.delete = function() {
            currentDay.hotel
                .eraseMarker()
                .eraseItineraryItem();
            currentDay.hotel = null;
            // adding AJAX
            $.ajax({
                url: '/day' + currentDay.number + '/hotel',
                type: 'DELETE'
            });
        };
    });

});