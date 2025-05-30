const form = document.getElementById('submit-registration');


form.addEventListener('submit', async (e) => {

    const formData = new FormData(form);
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    try {
        const res = await fetch('/submit-registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData, token, user})
          });

        console.log("finish")
    } catch (error) {
        console.log("erro : ", error); 
    }



    

})