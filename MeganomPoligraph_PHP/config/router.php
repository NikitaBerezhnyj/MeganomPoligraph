<?php
$requestUri = trim($_SERVER['REQUEST_URI'], '/');
$allowedCategories = ['paper-bags-laminated', 'logo-bags', 'cardboard-bags', 'kraft-bags', 'gift-bags', 'branded-folders', 'designer-paper-bags', 'uv-lacquer-bags', 'embossed-bags'];

if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico)$/', $requestUri)) {
    $filePath = $_SERVER['DOCUMENT_ROOT'] . '/' . $requestUri;
    if (file_exists($filePath)) {
        return false;
    }
}

if ($requestUri === '' || $requestUri === 'home') {
    include('templates/home.php');
} elseif (preg_match('/^example\/([a-zA-Z0-9_-]+)$/', $requestUri, $matches)) {
    $category = $matches[1];

    if (in_array($category, $allowedCategories)) {
        include('templates/example.php');
    } else {
        http_response_code(404);
        include('templates/error.php');
    }
} elseif (preg_match('/^([a-zA-Z0-9_-]+)$/', $requestUri, $matches)) {
    $templateName = $matches[1];
    $templateFile = "templates/{$templateName}.php";

    if (file_exists($templateFile)) {
        include($templateFile);
    } else {
        http_response_code(404);
        include('templates/error.php');
    }
} else {
    http_response_code(404);
    include('templates/error.php');
}
