$(document).ready(() => {
    // ============================================================================================//
    // When RestaurantReviews.html page completes loading,
    // makes an Ajax request to the server to get restaurant names
    // ============================================================================================//
    $.ajax({
        type: 'GET',
        url: urlGetDropdownList,
        dataType: 'json',
        /*Once the request successfully process to the server side,
        RestaurantReviews.php will be run and return a JSON string of restaurant names.*/
        success: function (response) {
            //console.log(response);
            if (response !== null && response.length > 0) {
                $.each(response, function(index, value) {
                    $('#drpRestaurant').append(
                        "<option name='" + index + "' value='" + index + "'>" + value + "</option>"
                    );
                });
            }
        },
        error: function (event, request, settings) {
            window.alert('AjaxError: ' + settings);
        }
    });


    // ====================================================================================================//
    // When the user selects a restaurant from the dropdown list,
    // makes an Ajax request with restaurantId to the server to get the details of the selected restaurant.
    // ====================================================================================================//
    $('#drpRestaurant').on('change', function(event) {
        let restaurantId = $('#drpRestaurant').val();
        $.ajax({
            type: 'GET',
            url: urlGetDetails + restaurantId,
            dataType: 'json',
            /*Once the request successfully process to the server side,
            RestaurantReviews.php will be run and return a JSON string of restaurant details.*/
            success: function (response) {
                //console.log(response);
                if (response.length !== 0) {
                    $('#txtStreetAddress').val(response.street);
                    $('#txtCity').val(response.city);
                    $('#txtProvinceState').val(response.province);
                    $('#txtPostalZipCode').val(response.postalcode);
                    $('#txtSummary').val(response.summary);
                    let drpRating = document.getElementById('drpRating');
                    if (!drpRating.hasChildNodes()) {
                        const max = response.rating['@attributes'].max;
                        const min = response.rating['@attributes'].min;
                        for (let i = min; i <= max; i++) {
                            $('#drpRating').append(
                                $("<option>", {
                                    name: i,
                                    value: i,
                                    text: i
                                })
                            );
                        }
                    }
                    $('#drpRating').val(response.rating[0]);
                    $('#btnSave').prop('disabled', false);
                } else {
                    $('#txtStreetAddress').val('');
                    $('#txtCity').val('');
                    $('#txtProvinceState').val('');
                    $('#txtPostalZipCode').val('');
                    $('#txtSummary').val('');
                    $('#drpRating').val('');
                    $('#btnSave').prop('disabled', true);
                }
            },
            error: function (event, request, settings) {
                window.alert('AjaxError: ' + settings);
            }
        });
    })

    // ======================================================================================================//
    // When the user clicks the Save button,
    // makes an Ajax request to the server sending the revised restaurant data to a server in a JSON string.
    // ======================================================================================================//
    $('#btnSave').on('click', function(event) {
        let restaurant = {
            restaurantId: $("#drpRestaurant").val(),
            street: $('#txtStreetAddress').val(),
            city: $('#txtCity').val(),
            province: $('#txtProvinceState').val(),
            postalcode: $('#txtPostalZipCode').val(),
            summary: $('#txtSummary').val(),
            rating: $('#drpRating').val()
        };
        $.ajax({
            type: 'POST',
            url: urlPostDetails,
            data: {restaurant: JSON.stringify(restaurant)}, // convert JS object to JSON string
            dataType: 'json',
            /*Upon receiving the save request,
            RestaurantReviews.php updates the restaurant data and save back in restaurant_review.xml file,
            and return a JSON string of message*/
            success: function (response) {
                //console.log(response);
                $('#lblConfirmation').attr('class', 'form-control alert-' + response.status);
                // finish() used to clear any previous delay if the user is quick with editing
                $('#lblConfirmation').text(response.message).finish().show().delay(1000).fadeOut();
            },
            error: function (event, request, settings) {
                window.alert('AjaxError: ' + settings);
            }
        });
    })
})