// const grabIdHandler = async (event) => {
//     // event.preventDefault;
//     const id = await event.target.getAttribute('data-id');

  
//     console.log("made it to grabIdHandler", id)
//     if (id) {
//       console.log("you tried to get an id: ", id);
//     const response = await fetch("/api/posts/:id", {
//         method: "POST",
//         body: JSON.stringify({id}),
//         headers: { "Content-Type": "application/json" },
//     });

//     // if(response.ok) {
//     //     document.location.replace("/updatepost");
//     // }else{
//     //     alert(response.statusText);
//     // }

// //     }
// //   };
  

// //   const updateBlogHandler = async (event) => {
// //     event.preventDefault();
// //   };

// // //   document.querySelectorAll(".card-header").forEach(function(element) 
// //   {element.addEventListener("click", grabIdHandler)});

//delete button handler
const delButtonHandler = async (event) => {
    // event.preventDefault;
    if (event.target.hasAttribute('data-delete')) {
      const id = event.target.getAttribute('data-delete');
        console.log("updateblogpost.js del handler", id);
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('#btn-delete')
  .addEventListener('click', delButtonHandler);
