const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(currentLocation);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const cacheFormHandler = async (event) => {
  event.preventDefault();

 

  let currentLocation;

  try {
    currentLocation = await getCurrentLocation();
    console.log("Current location:", currentLocation);
  } catch (error) {
    console.log("Error getting location:", error);
  }

  const name = document.querySelector('#cache-name').value.trim();
  const hints = document.querySelector('#cache-hints').value.trim();
  const description = document.querySelector('#cache-description').value.trim();
  const difficulty = document.querySelector('#cache-difficulty').value;
  console.log(name, hints, description, difficulty, currentLocation);
};

document.querySelector('.new-cache-form').addEventListener('submit', cacheFormHandler);
