//add login function here
const newBlogHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const blogTitle = document.querySelector("#title").value.trim();
  const blogContent = document.querySelector("#content").value.trim();
  console.log("you made it to newblogpost.js", blogTitle, blogContent);
  if (blogTitle && blogContent) {
    // Send a POST request to the API endpoint
    // const response = await fetch("/api/posts/newpost", {
    //   method: "POST",
    //   body: JSON.stringify({ blogTitle, blogContent }),
    //   headers: { "Content-Type": "application/json" },
    // });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};



document
  .querySelector(".newpost-form")
  .addEventListener("submit", newBlogHandler);


