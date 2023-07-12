Use Ajax (asynchronous javascript and XML) to process requests and responses without reloading the entire HTML in a web application.
### Asynchronous
- After sending a request, not waiting for the response to come back.
- Set up a function that will be invoked when the response comes back from the server.
### JavaScript
- Use JavaScript to make a request to the server. 
- Use JavaScript to process the response data from the server and modify the current page’s DOM to present the response data to the user.
### XML (replaced by Json now)
- The response data from the server as XML (Json now)
- It can be easily processed with JavaScript. 


# Features
- When the `RestaurantReviews.html` page completes loading, make an Ajax request to the server to get restaurant names.
  Once the request successfully processes to the server side, `RestaurantReviews.php` will be run and return a JSON string of restaurant names.

  <img src="https://github.com/ywu279/ajax/assets/58931129/23b9bc1e-5fa0-46f4-920c-f707a254157d" width="500px">

- When the user selects a restaurant from the dropdown list, make an Ajax request with `restaurantId` to the server to get the details of the selected restaurant.
  Once the request successfully processes to the server side, `RestaurantReviews.php` will be run and return a JSON string of restaurant details.

  <img src="https://github.com/ywu279/ajax/assets/58931129/bcff266a-0663-44b3-a59e-7adc1d3a5290" width="500px">

- When the user clicks the Save button, makes an Ajax request to the server sending the revised restaurant data to a server (in a JSON string).
  Upon receiving the save request, `RestaurantReviews.php` updates the restaurant data and saves it back in `restaurant_review.xml` file, and returns a JSON string of message

  <img src="https://github.com/ywu279/ajax/assets/58931129/400dbade-93ea-4d43-b5af-da83b648a245" width="500px">
