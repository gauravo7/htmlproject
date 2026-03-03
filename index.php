<?php require_once __DIR__ . '/includes/security.php'; ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Placement Training Letter Portal</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="/assets/css/style.css" rel="stylesheet">
</head>
<body>
<div class="container py-5">
  <div class="p-5 hero mb-4">
    <h1 class="display-6">Placement Training Letter Portal</h1>
    <p class="mb-0">Admin uploads student Excel/CSV and students download personalized training letters as PDF.</p>
  </div>
  <div class="row g-4">
    <div class="col-md-6">
      <div class="card card-shadow p-4">
        <h4>Admin</h4>
        <p>Upload student records and manage data.</p>
        <a href="/admin_login.php" class="btn btn-primary">Admin Login</a>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card card-shadow p-4">
        <h4>Student</h4>
        <p>Login with roll number to view and download your letter.</p>
        <a href="/student_login.php" class="btn btn-success">Student Login</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>
