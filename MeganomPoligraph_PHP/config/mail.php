<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

function sendUserEmail($name, $phone, $mail, $message)
{
    $mailSender = new PHPMailer(true);
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $senderMail = $_ENV['EMAIL_ADDRESS'] ?? null;
    $senderPassword = $_ENV['EMAIL_PASSWORD'] ?? null;
    $recipientMail = $_ENV['RECIPIENT_EMAIL'] ?? null;
    $smtpHost = $_ENV['SMTP_HOST'] ?? null;
    $smtpPort = $_ENV['SMTP_PORT'] ?? null;

    if (!$senderMail || !$senderPassword || !$recipientMail || !$smtpHost || !$smtpPort) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Змінні в .env не знайдено або пошкоджено'
        ]);
        return;
    }

    try {
        $mailSender->isSMTP();
        $mailSender->Host = $smtpHost;
        $mailSender->SMTPAuth = true;
        $mailSender->Username = $senderMail;
        $mailSender->Password = $senderPassword;
        $mailSender->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mailSender->Port = $smtpPort;
        $mailSender->CharSet = 'UTF-8';

        $mailSender->setFrom($senderMail, 'Меганом Поліграф');
        $mailSender->addAddress($recipientMail, 'Меганом Поліграф');

        $uniqueId = uniqid();
        $mailSender->Subject = "Замовлення з сайту (id: $uniqueId)";
        $mailSender->MessageID = "<$uniqueId@meganom.com>";

        $mailSender->isHTML(true);
        $mailSender->Body = "
            <div style='width:50%; padding:2.5%; background-color:#FFFFFF; margin:auto; border:1px solid #999999;'>
                <div style='padding:2.5%; color:#333333; background-color:#F5F5F5; font-size:1.25rem; border:1px solid #999999;'>
                    <h1 style='text-align:center; color:#2498EE;'>Замовлення з сайту!</h1>
                    <p><strong>Ім'я:</strong> {$name}</p>
                    <hr style='border-color: #999999;'>
                    <p><strong>Телефон:</strong> {$phone}</p>
                    <hr style='border-color: #999999;'>
                    <p><strong>E-Mail:</strong> {$mail}</p>
                    <hr style='border-color: #999999;'>
                    <p><strong>Повідомлення:</strong> {$message}</p>
                </div>
            </div>";
        $mailSender->AltBody = "Ім'я: {$name}\nТелефон: {$phone}\nEmail: {$mail}\nПовідомлення: {$message}";

        $mailSender->send();
        echo json_encode([
            'status' => 'success',
            'message' => 'Лист успішно відправлено'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => "Помилка при надсиланні листа: {$mailSender->ErrorInfo}"
        ]);
    }
}
