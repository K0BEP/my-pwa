<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#5a3921">
    <link rel="manifest" href="/my-pwa/manifest.json">
    <link rel="icon" href="/my-pwa/icons/icon-192x192.png">
    <title>Спасибо за отзыв!</title>
    <link rel="stylesheet" href="/my-pwa/style.css">
</head>
<body>
    <header>
        <h1>Спасибо за ваш отзыв!</h1>
    </header>
    <nav>
        <ul>
            <li><a href="/my-pwa/">Главная</a></li>
            <li><a href="/my-pwa/sad_stones.html">Топ 5 грустных камней</a></li>
            <li><a href="/my-pwa/funny_stones.html">Топ 5 смешных камней</a></li>
            <li><a href="/my-pwa/weird_stones.html">Топ 5 необычных камней</a></li>
            <li><a href="/my-pwa/feedback.html">Обратная связь</a></li>
        </ul>
    </nav>
    <main>
        <div class="success-message">
            <p>Ваше сообщение успешно отправлено. Мы ценим ваш вклад в развитие нашего каменного сообщества!</p>
            
            <?php if (isset($_SESSION['current_feedback'])): ?>
            <div class="feedback-display">
                <h3>Ваш отзыв:</h3>
                <p><strong>ФИО:</strong> <?= htmlspecialchars($_SESSION['current_feedback']['fullname']) ?></p>
                <p><strong>Email:</strong> <?= htmlspecialchars($_SESSION['current_feedback']['email']) ?></p>
                <p><strong>Комментарий:</strong> <?= nl2br(htmlspecialchars($_SESSION['current_feedback']['comment'])) ?></p>
            </div>
            <?php endif; ?>
            
            <a href="/my-pwa/index.html" class="home-button">Вернуться на главную</a>
        </div>
    </main>
    <footer>
        &copy; 2025 Каменный прикол
    </footer>
    <script>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/my-pwa/sw.js');
        }
    </script>
</body>
</html>