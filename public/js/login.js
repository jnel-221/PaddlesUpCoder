//add login function here
const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("you made it to the login function!");
  // Collect values from the login form
  const userName = document.querySelector("#user-name").value.trim();
  const password = document.querySelector("#password-login").value.trim();
    console.log(userName, password);
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

const signupFormHandler = async (event) => {
  event.preventDefault();

  console.log("you made it to the signup function!");

  const name = document.querySelector("#new-user-name").value.trim();
  const password = document.querySelector("#new-user-password").value.trim();

  if (name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
