
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#new-user-name").value.trim();
    const password = document.querySelector("#new-user-password").value.trim();
  
    if (name && password) {
      const response = await fetch("/api/users/signup", {
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
.querySelector(".signup-form")
.addEventListener("submit", signupFormHandler);