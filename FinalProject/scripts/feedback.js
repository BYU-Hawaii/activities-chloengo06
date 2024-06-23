document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        saveFeedback({ name, email, message });
        alert('Thank you for your feedback!');
        form.reset();
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function saveFeedback(feedback) {
        // Simulating saving feedback to a text file on the server
        console.log('Feedback saved:', feedback);
    }
});
