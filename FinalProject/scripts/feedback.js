document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        alert('Thank you for your feedback!');
        form.reset();
    });
});
