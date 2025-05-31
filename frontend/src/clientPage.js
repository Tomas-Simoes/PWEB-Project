document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-registration');

  if (!form) {
    console.error('Form not found!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch('panels/submit-registration', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        alert(result.message || "Installation submitted successfully!");
        form.reset();
      } else {
        alert(result.error || "Failed to submit installation.");
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred while submitting the installation. Please try again later.");
    }
  });
});
