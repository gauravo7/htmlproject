<?php

declare(strict_types=1);

require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/includes/security.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $rollNo = trim($_POST['roll_no'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT id, roll_no, password_hash FROM students WHERE roll_no = :roll_no LIMIT 1');
    $stmt->execute(['roll_no' => $rollNo]);
    $student = $stmt->fetch();

    if ($student && password_verify($password, $student['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['role'] = 'student';
        $_SESSION['student_id'] = $student['id'];
        header('Location: /student/dashboard.php');
        exit;
    }

    $error = 'Invalid roll number or password';
}
?>
<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Student Login</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="/assets/css/style.css" rel="stylesheet"></head>
<body><div class="container py-5"><div class="row justify-content-center"><div class="col-md-5">
<div class="card card-shadow p-4"><h3 class="mb-3">Student Login</h3>
<?php if ($error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endif; ?>
<form method="post">
<input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
<div class="mb-3"><label class="form-label">Roll Number</label><input class="form-control" name="roll_no" required></div>
<div class="mb-3"><label class="form-label">Password</label><input type="password" class="form-control" name="password" required></div>
<button class="btn btn-success w-100">Login</button>
</form></div></div></div></div></body></html>
