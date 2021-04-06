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
