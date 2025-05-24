<?php
$statusCode = http_response_code();
$https = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on" ? "s" : "";
$fullUrl = "http" . $https . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

$errorMessages = [
    404 => [
        "title" => t('error.404-error-header', $translations),
        "message" => str_replace("{url}", htmlspecialchars($fullUrl), t('error.404-error-message', $translations)),
        "subMessage" => t('error.error-standard-message', $translations),
        "homeButton" => t('error.error-home-button', $translations),
        "backButton" => t('error.error-back-button', $translations),
        "errorCode" => "404"
    ],
    403 => [
        "title" => t('error.403-error-header', $translations),
        "message" => str_replace("{url}", htmlspecialchars($fullUrl), t('error.403-error-message', $translations)),
        "subMessage" => t('error.error-standard-message', $translations),
        "homeButton" => t('error.error-home-button', $translations),
        "backButton" => t('error.error-back-button', $translations),
        "errorCode" => "403"
    ],
    "default" => [
        "title" => t('error.default-error-header', $translations),
        "message" => sprintf(t('error.default-error-message', $translations), htmlspecialchars($fullUrl)),
        "subMessage" => t('error.error-standard-message', $translations),
        "homeButton" => t('error.error-home-button', $translations),
        "backButton" => t('error.error-back-button', $translations),
        "errorCode" => "404"
    ]
];

$error = $errorMessages[$statusCode] ?? $errorMessages["default"];
?>

<div class="container mt-5 mb-3 full-height">
    <div class="row w-100">
        <div class="col-md-6 order-2 order-md-1">
            <h2 class="mb-4"><?php echo $error["title"]; ?></h2>
            <p><?php echo $error["message"]; ?></p>
            <p><?php echo $error["subMessage"]; ?></p>
            <div class="mt-4">
                <a href="/" class="btn btn-primary w-100"><?php echo $error["homeButton"]; ?></a>
                <br>
                <a href="javascript:history.back()" class="btn btn-secondary w-100 mt-2"><?php echo $error["backButton"]; ?></a>
            </div>
        </div>
        <div class="col-md-6 order-1 order-md-2 text-center">
            <img src="https://img.icons8.com/ios/452/error.png" alt="Error icon" style="width: 150px; height: 150px;">
            <h1 class="display-3 text-danger"><?php echo $error["errorCode"]; ?></h1>
        </div>
    </div>
</div>
