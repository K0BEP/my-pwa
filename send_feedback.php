<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "stone_feedback";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $conn->prepare("INSERT INTO feedback (fullname, email, comment) 
                              VALUES (:fullname, :email, :comment)");
        
        $stmt->bindParam(':fullname', $_POST['fullname']);
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->bindParam(':comment', $_POST['comment']);
        
        $stmt->execute();
        
        header("Location: /my-pwa/feedback_success.html");
        exit();
    } catch(PDOException $e) {
        echo "Ошибка: " . $e->getMessage();
    }
    $conn = null;
} else {
    header("Location: /my-pwa/feedback.html");
    exit();
}
?>