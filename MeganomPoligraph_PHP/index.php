<?php include('config/lang.php'); ?>
<?php
$current_page = basename($_SERVER['REQUEST_URI'], ".php");
$allowedCategories = ['paper-bags-laminated', 'logo-bags', 'cardboard-bags', 'kraft-bags', 'gift-bags', 'branded-folders', 'designer-paper-bags', 'uv-lacquer-bags', 'embossed-bags'];

if (empty($current_page)) {
    $description_key = t('home.home-page-description', $translations);
} elseif (in_array($current_page, $allowedCategories, true)) {
    $description_key = t("example.example-" . $current_page . '-page-description', $translations);
} else {
    $description_key = t($current_page . '.' . $current_page . '-page-description', $translations);
}
?>

<!DOCTYPE html>
<html lang="<?= htmlspecialchars($lang) ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="<?= t('keywords', $translations) ?>">
    <meta name="description" content="<?= htmlspecialchars(t($description_key, $translations), ENT_QUOTES, 'UTF-8') ?>">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="/assets/images/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/header.css">
    <?php if ($current_page == 'home' || $current_page == ''): ?>
        <link rel="preload" href="/assets/images/hero-background.png" as="image">
        <link rel="stylesheet" href="/assets/css/home.css">
    <?php elseif ($current_page == 'contacts'): ?>
        <link rel="stylesheet" href="/assets/css/contacts.css">
    <?php elseif ($current_page == 'about'): ?>
        <link rel="stylesheet" href="/assets/css/about.css">
    <?php elseif ($current_page == 'example'): ?>
        <link rel="stylesheet" href="/assets/css/example.css">
        <link rel="stylesheet" href="/assets/css/image-modal.css">
    <?php elseif ($current_page == 'delivery'): ?>
        <link rel="stylesheet" href="/assets/css/delivery.css">
    <?php endif; ?>
    <?php if ($current_page != 'home' && $current_page != ''): ?>
        <link rel="stylesheet" href="/assets/css/contact-modal.css">
    <?php endif; ?>
    <link rel="preload" href="/assets/images/mail.png" as="image">
    <link rel="stylesheet" href="/assets/css/contact-button.css">
    <link rel="stylesheet" href="/assets/css/footer.css">
    <title><?= t('title', $translations) ?></title>
</head>

<body>
    <?php include('includes/header.php'); ?>
    <?php include('config/router.php'); ?>
    <?php include('includes/footer.php'); ?>
    <?php include('includes/contact-button.php'); ?>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>