//add login function here
const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const userName = document.querySelector("#user-name").value.trim();
  const password = document.querySelector("#password-login").value.trim();
    
  if (userName && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};



document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);


