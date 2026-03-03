<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/excel_parser.php';

require_admin();

if (isset($_GET['logout'])) {
    logout_and_redirect();
}

$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();

    if (!isset($_FILES['student_file']) || $_FILES['student_file']['error'] !== UPLOAD_ERR_OK) {
        $error = 'Please upload a valid file.';
    } else {
        $original = $_FILES['student_file']['name'];
        $tmpPath = $_FILES['student_file']['tmp_name'];
        $extension = strtolower(pathinfo($original, PATHINFO_EXTENSION));

        if (!in_array($extension, ['csv', 'xlsx'], true)) {
            $error = 'Only CSV and XLSX files are allowed.';
        } else {
            $safeName = uniqid('upload_', true) . '.' . $extension;
            $target = __DIR__ . '/../uploads/' . $safeName;
            if (!move_uploaded_file($tmpPath, $target)) {
                $error = 'File upload failed.';
            } else {
                try {
                    $rows = parse_uploaded_sheet($target, $extension);
                    $insert = $pdo->prepare('INSERT INTO students (name, father_name, roll_no, branch, password_hash) VALUES (:name, :father_name, :roll_no, :branch, :password_hash)
                        ON DUPLICATE KEY UPDATE name = VALUES(name), father_name = VALUES(father_name), branch = VALUES(branch), password_hash = VALUES(password_hash)');

                    $count = 0;
                    foreach ($rows as $row) {
                        if ($row['name'] === '' || $row['roll_no'] === '') {
                            continue;
                        }

                        $insert->execute([
                            'name' => $row['name'],
                            'father_name' => $row['father_name'],
                            'roll_no' => $row['roll_no'],
                            'branch' => $row['branch'],
                            'password_hash' => password_hash($row['roll_no'], PASSWORD_DEFAULT),
                        ]);
                        $count++;
                    }

                    $message = "Uploaded successfully. {$count} students processed.";
                } catch (Throwable $throwable) {
                    $error = 'Error while parsing file: ' . $throwable->getMessage();
                }
            }
        }
    }
}

$students = $pdo->query('SELECT name, father_name, roll_no, branch FROM students ORDER BY created_at DESC LIMIT 20')->fetchAll();
?>
<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Dashboard</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="/assets/css/style.css" rel="stylesheet"></head>
<body><div class="container py-4">
<div class="d-flex justify-content-between align-items-center mb-4"><h3>Admin Dashboard</h3><a href="?logout=1" class="btn btn-outline-danger">Logout</a></div>
<?php if ($message): ?><div class="alert alert-success"><?= e($message) ?></div><?php endif; ?>
<?php if ($error): ?><div class="alert alert-danger"><?= e($error) ?></div><?php endif; ?>
<div class="card card-shadow p-4 mb-4">
<h5>Upload Student File (CSV/XLSX)</h5>
<form method="post" enctype="multipart/form-data">
<input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>">
<input type="file" name="student_file" class="form-control mb-3" accept=".csv,.xlsx" required>
<button class="btn btn-primary">Upload</button>
</form>
</div>
<div class="card card-shadow p-4">
<h5>Recent Students</h5>
<div class="table-responsive"><table class="table table-striped">
<thead><tr><th>Name</th><th>Father Name</th><th>Roll No</th><th>Branch</th></tr></thead>
<tbody><?php foreach ($students as $student): ?><tr>
<td><?= e($student['name']) ?></td><td><?= e($student['father_name']) ?></td><td><?= e($student['roll_no']) ?></td><td><?= e($student['branch']) ?></td>
</tr><?php endforeach; ?></tbody>
</table></div>
</div>
</div></body></html>
