<?php

declare(strict_types=1);

function parse_uploaded_sheet(string $path, string $extension): array
{
    if ($extension === 'csv') {
        return parse_csv_file($path);
    }

    if ($extension === 'xlsx') {
        return parse_xlsx_file($path);
    }

    throw new RuntimeException('Unsupported file type. Use CSV or XLSX.');
}

function parse_csv_file(string $path): array
{
    $rows = [];
    if (($handle = fopen($path, 'rb')) === false) {
        throw new RuntimeException('Unable to open CSV file.');
    }

    $headerRead = false;
    while (($data = fgetcsv($handle)) !== false) {
        if (!$headerRead) {
            $headerRead = true;
            continue;
        }

        if (count(array_filter($data, fn($item) => trim((string) $item) !== '')) === 0) {
            continue;
        }

        $rows[] = [
            'name' => trim((string) ($data[0] ?? '')),
            'father_name' => trim((string) ($data[1] ?? '')),
            'roll_no' => trim((string) ($data[2] ?? '')),
            'branch' => trim((string) ($data[3] ?? '')),
        ];
    }

    fclose($handle);
    return $rows;
}

function parse_xlsx_file(string $path): array
{
    $zip = new ZipArchive();
    if ($zip->open($path) !== true) {
        throw new RuntimeException('Cannot open XLSX file.');
    }

    $sharedStrings = [];
    $sharedXml = $zip->getFromName('xl/sharedStrings.xml');
    if ($sharedXml !== false) {
        $shared = simplexml_load_string($sharedXml);
        if ($shared !== false && isset($shared->si)) {
            foreach ($shared->si as $si) {
                $sharedStrings[] = trim((string) $si->t);
            }
        }
    }

    $sheetXml = $zip->getFromName('xl/worksheets/sheet1.xml');
    $zip->close();

    if ($sheetXml === false) {
        throw new RuntimeException('Sheet1 not found in XLSX file.');
    }

    $sheet = simplexml_load_string($sheetXml);
    if ($sheet === false || !isset($sheet->sheetData->row)) {
        throw new RuntimeException('Invalid XLSX structure.');
    }

    $rows = [];
    $isFirstRow = true;

    foreach ($sheet->sheetData->row as $row) {
        if ($isFirstRow) {
            $isFirstRow = false;
            continue;
        }

        $cells = ['A' => '', 'B' => '', 'C' => '', 'D' => ''];
        foreach ($row->c as $cell) {
            $reference = (string) $cell['r'];
            $column = preg_replace('/\d/', '', $reference) ?: '';
            if (!array_key_exists($column, $cells)) {
                continue;
            }

            $value = (string) ($cell->v ?? '');
            if ((string) $cell['t'] === 's') {
                $index = (int) $value;
                $value = $sharedStrings[$index] ?? '';
            }

            $cells[$column] = trim($value);
        }

        if (implode('', $cells) === '') {
            continue;
        }

        $rows[] = [
            'name' => $cells['A'],
            'father_name' => $cells['B'],
            'roll_no' => $cells['C'],
            'branch' => $cells['D'],
        ];
    }

    return $rows;
}
