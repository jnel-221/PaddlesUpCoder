const commentButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-comment")) {
    const post_id = event.target.getAttribute("data-comment");

    const text = document.querySelector("#comment").value.trim();

    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ post_id, text }),
      headers: { "Content-Type": "application/json" },
    });

    if(response.ok){
        document.location.replace("/viewonepost")
    } else{
        alert(response.statusText);
    }
  }
};

document.querySelector("#btn-comment").addEventListener('click', commentButtonHandler)