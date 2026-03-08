<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot: Feld muss leer sein
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

// Zeitcheck: Formular muss mindestens 3 Sekunden offen gewesen sein
$form_time = intval($_POST['form_time'] ?? 0);
if ($form_time === 0 || (time() * 1000 - $form_time) < 3000) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

$name    = strip_tags(trim($_POST['name']    ?? ''));
$email   = strip_tags(trim($_POST['email']   ?? ''));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid input']);
    exit;
}

$to      = 'info@maxlamm.de';
$subject = 'Kontaktformular: ' . $name;
$body    = "Name: $name\nEmail: $email\n\n$message";
$headers = "From: noreply@maxlamm.de\r\nReply-To: $email\r\n";

$sent = mail($to, $subject, $body, $headers);

echo json_encode(['ok' => $sent]);
