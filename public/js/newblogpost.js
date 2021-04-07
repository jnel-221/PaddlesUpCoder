
const newBlogHandler = async (event) => {
  event.preventDefault();
  
  const blogTitle = document.querySelector("#title").value.trim();
  const blogContent = document.querySelector("#content").value.trim();
  
  if (blogTitle && blogContent) {
    
    const response = await fetch("/api/posts/newpost", {
      method: "POST",
      body: JSON.stringify({ blogTitle, blogContent }),
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
  .querySelector(".newpost-form")
  .addEventListener("submit", newBlogHandler);


