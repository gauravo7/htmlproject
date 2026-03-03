<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/pdf_generator.php';

require_student();

if (isset($_GET['logout'])) {
    logout_and_redirect();
}

$stmt = $pdo->prepare('SELECT name, father_name, roll_no, branch FROM students WHERE id = :id LIMIT 1');
$stmt->execute(['id' => $_SESSION['student_id']]);
$student = $stmt->fetch();

if (!$student) {
    logout_and_redirect();
}

if (isset($_GET['download']) && $_GET['download'] === 'pdf') {
    output_letter_pdf($student);
}

$letter = training_letter_text($student);
?>
<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Student Dashboard</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="/assets/css/style.css" rel="stylesheet"></head>
<body><div class="container py-4">
<div class="d-flex justify-content-between align-items-center mb-4"><h3>Student Dashboard</h3><a href="?logout=1" class="btn btn-outline-danger">Logout</a></div>
<div class="card card-shadow p-4">
<h5 class="mb-3">Your Training Letter</h5>
<pre class="bg-light p-3 rounded"><?= e($letter) ?></pre>
<a href="?download=pdf" class="btn btn-primary">Download PDF</a>
</div>
</div></body></html>
