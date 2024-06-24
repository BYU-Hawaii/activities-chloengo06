document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var comments = document.getElementById('comments').value;
    var rating = document.getElementById('rating').value;

    var nameValid = /^[a-zA-Z\s]{3,}$/.test(name); // Name should be at least 3 characters long and contain only letters and spaces
    var emailValid = /^[^@]+@\w+(\.\w+)+\w$/.test(email); // Simple email pattern check
    var commentsValid = comments.length > 0; // Comments should not be empty
    var ratingValid = rating !== ""; // Rating should be selected

    document.getElementById('nameFeedback').style.display = nameValid ? 'none' : 'block';
    document.getElementById('emailFeedback').style.display = emailValid ? 'none' : 'block';
    document.getElementById('commentsFeedback').style.display = commentsValid ? 'none' : 'block';
    document.getElementById('ratingFeedback').style.display = ratingValid ? 'none' : 'block';

    document.getElementById('nameFeedback').textContent = nameValid ? '' : 'Name should be at least 3 characters long and contain only letters and spaces.';
    document.getElementById('emailFeedback').textContent = emailValid ? '' : 'Please enter a valid email address.';
    document.getElementById('commentsFeedback').textContent = commentsValid ? '' : 'Please enter your comments.';
    document.getElementById('ratingFeedback').textContent = ratingValid ? '' : 'Please select a rating.';

    var formValid = nameValid && emailValid && commentsValid && ratingValid;

    if (formValid) {
        document.getElementById('feedbackSubmissionFeedback').textContent = 'Thank you for your feedback!';
        document.getElementById('feedbackSubmissionFeedback').style.display = 'block';
        // Here you can also handle the form submission, e.g. send data to the server
    } else {
        document.getElementById('feedbackSubmissionFeedback').textContent = '';
        document.getElementById('feedbackSubmissionFeedback').style.display = 'none';
    }
});
