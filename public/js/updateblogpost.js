const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-update')) {
        const id = event.target.getAttribute('data-update');
         
        const title = document.querySelector("#title").value.trim();

        const text = document.querySelector('#content').value.trim();

        console.log("updateblogpost.js update handler", id, title, text);

        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({id, title, text }),
          headers: { "Content-Type": "application/json" },
          });
        
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update post');
        }
    
    };
};
    
//delete button handler
const delButtonHandler = async (event) => {
    // event.preventDefault;
    if (event.target.hasAttribute('data-delete')) {
      const id = event.target.getAttribute('data-delete');
        
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

  document.querySelector('#btn-update').addEventListener('click', updateButtonHandler);

  document
  .querySelector('#btn-delete')
  .addEventListener('click', delButtonHandler);
