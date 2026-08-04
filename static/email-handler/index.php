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
    echo json_encode(['ok' => false, 'error' => 'spam']);
    exit;
}

// Zeitcheck: Formular muss mindestens 3 Sekunden offen gewesen sein
$form_time = intval($_POST['form_time'] ?? 0);
if ($form_time === 0 || (time() * 1000 - $form_time) < 3000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'spam']);
    exit;
}

// Cloudflare Turnstile Verification
$turnstile_token = $_POST['cf-turnstile-response'] ?? '';
$turnstile_secret = trim(file_get_contents($_SERVER['HOME'] . '/turnstile-secret.txt'));

$verify_response = file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query([
            'secret' => $turnstile_secret,
            'response' => $turnstile_token,
            'remoteip' => $_SERVER['REMOTE_ADDR']
        ])
    ]
]));

$verify_result = json_decode($verify_response, true);
if (!$verify_result || !$verify_result['success']) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'captcha']);
    exit;
}

$name    = strip_tags(trim($_POST['name']    ?? ''));
$email   = strip_tags(trim($_POST['email']   ?? ''));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

$to      = 'info@maxlamm.de';
$subject = 'Kontaktformular: ' . $name;
$body    = "Name: $name\nEmail: $email\n\n$message";
$headers = "From: noreply@maxlamm.de\r\nReply-To: $email\r\n";

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail']);
    exit;
}

echo json_encode(['ok' => true]);
