<?php
$defaultLang = 'en';

function getBrowserLanguage()
{
    if (!isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        return null;
    }

    $languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
    return strtolower(substr(trim($languages[0]), 0, 2));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['lang'])) {
    setcookie('lang', $_POST['lang'], time() + 3600 * 24 * 30, '/');
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit();
}

if (isset($_COOKIE['lang'])) {
    $lang = $_COOKIE['lang'];
} else {
    $lang = getBrowserLanguage() ?: $defaultLang;
    setcookie('lang', $lang, time() + 3600 * 24 * 30, '/');
}

$localizationFile = "assets/json/languages/{$lang}.json";
if (file_exists($localizationFile)) {
    $translations = json_decode(file_get_contents($localizationFile), true);
} else {
    $translations = json_decode(file_get_contents("assets/json/languages/{$defaultLang}.json"), true);
}

function t($key, $translations)
{
    $keys = explode('.', $key);
    $value = $translations;

    foreach ($keys as $keyPart) {
        if (isset($value[$keyPart])) {
            $value = $value[$keyPart];
        } else {
            return $key;
        }
    }
    return $value;
}
