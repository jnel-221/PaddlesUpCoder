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

const signupFormHandler = async (event) => {
  event.preventDefault();

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

const changeView = () => {
  console.log("you clicked a link!");
};
// let test = document.getElementById("#sign-up-link");

// test.addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("made it to sign-up", e.target);

// });

// document.getElementById("#login-link").addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("made it", e.target);

// });
