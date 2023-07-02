const cacheFormHandler = async (event) => {
    event.preventDefault();


    // Collect values from the login form
    const name = document.querySelector('#cache-name').value.trim();
    const hints = document.querySelector('#cache-hints').value.trim();
    const description = document.querySelector('#cache-description').value.trim();
    const difficulty = document.querySelector('#cache-difficulty').value;
    console.log (name, hints, description, difficulty)

    // if (email && password) {
    //   // Send a POST request to the API endpoint
    //   const response = await fetch('/api/user/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
  
    //   if (response.ok) {
    //     // If successful, redirect the browser to the profile page
    //     document.location.replace('/profile');
    //     console.log("you are logged in")
    //   } else {
    //     alert(response.statusText);
    //   }
    // }
  };
  
  document
  .querySelector('.cache-form')
  .addEventListener('submit', cacheFormHandler);


  
