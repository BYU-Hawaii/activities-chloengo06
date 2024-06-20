<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $comments = htmlspecialchars($_POST['comments']);
    $rating = htmlspecialchars($_POST['rating']);

    $feedback = "Name: $name\nEmail: $email\nComments: $comments\nRating: $rating\n\n";
    
    $file = fopen("feedback.txt", "a");
    if ($file) {
        fwrite($file, $feedback);
        fclose($file);
        echo "Thank you for your feedback!";
    } else {
        echo "Unable to save your feedback. Please try again later.";
    }
} else {
    echo "Invalid request method.";
}
?>
