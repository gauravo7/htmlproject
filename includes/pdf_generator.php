<?php

declare(strict_types=1);

function output_letter_pdf(array $student): void
{
    $letter = training_letter_text($student);
    $lines = explode("\n", wordwrap($letter, 85));

    $content = "BT\n/F1 12 Tf\n50 780 Td\n";
    foreach ($lines as $idx => $line) {
        $safe = addcslashes($line, "\\()");
        if ($idx > 0) {
            $content .= "0 -16 Td\n";
        }
        $content .= "({$safe}) Tj\n";
    }
    $content .= "ET";

    $objects = [];
    $objects[] = "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj";
    $objects[] = "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj";
    $objects[] = "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj";
    $objects[] = "4 0 obj << /Length " . strlen($content) . " >> stream\n{$content}\nendstream endobj";
    $objects[] = "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj";

    $pdf = "%PDF-1.4\n";
    $offsets = [0];
    foreach ($objects as $object) {
        $offsets[] = strlen($pdf);
        $pdf .= $object . "\n";
    }

    $xrefPos = strlen($pdf);
    $pdf .= "xref\n0 " . (count($objects) + 1) . "\n";
    $pdf .= "0000000000 65535 f \n";
    for ($i = 1; $i <= count($objects); $i++) {
        $pdf .= str_pad((string) $offsets[$i], 10, '0', STR_PAD_LEFT) . " 00000 n \n";
    }

    $pdf .= "trailer << /Size " . (count($objects) + 1) . " /Root 1 0 R >>\n";
    $pdf .= "startxref\n{$xrefPos}\n%%EOF";

    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="training_letter_' . preg_replace('/[^a-zA-Z0-9_-]/', '_', $student['roll_no']) . '.pdf"');
    echo $pdf;
    exit;
}

function training_letter_text(array $student): string
{
    $date = date('d M Y');
    return "Date: {$date}\n\nTo,\n{$student['name']}\nS/o {$student['father_name']}\nRoll No: {$student['roll_no']}\nBranch: {$student['branch']}\n\nSubject: Training Letter\n\nDear {$student['name']},\n\nThis is to certify that you are selected for institutional training activities under the Placement Cell. You are instructed to report to the Training Coordinator as per schedule shared by your department.\n\nRegards,\nPlacement Officer\nYour Institute";
}
