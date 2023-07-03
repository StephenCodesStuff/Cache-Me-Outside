const cacheFormHandler = async (event) => {
  event.preventDefault();

  // let currentLocation;

  // function getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       currentLocation = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude
  //       };
  //       console.log("Current location:", currentLocation);
  //     }, function(error) {
  //       console.log("Error getting location:", error);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }

  // // Call the getCurrentLocation function to get the user's location
  // getCurrentLocation();

  // Collect values from the form
  const name = document.querySelector('#cache-name').value.trim();
  const hints = document.querySelector('#cache-hints').value.trim();
  const description = document.querySelector('#cache-description').value.trim();
  const difficulty = document.querySelector('#cache-difficulty').value;
  console.log(name, hints, description, difficulty);
};

document.querySelector('.cache-form').addEventListener('submit', cacheFormHandler);
  
