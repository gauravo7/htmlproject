<?php

declare(strict_types=1);

require_once __DIR__ . '/security.php';

function require_admin(): void
{
    if (($_SESSION['role'] ?? '') !== 'admin') {
        header('Location: /admin_login.php');
        exit;
    }
}

function require_student(): void
{
    if (($_SESSION['role'] ?? '') !== 'student') {
        header('Location: /student_login.php');
        exit;
    }
}

function logout_and_redirect(): void
{
    session_unset();
    session_destroy();
    header('Location: /index.php');
    exit;
}
