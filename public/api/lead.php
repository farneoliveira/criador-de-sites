<?php
/**
 * Script PHP de Processamento de Leads para Hospedagem com suporte a PHP (ex: aaPanel / cPanel)
 * Endpoint: POST /api/lead.php
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Permitir apenas requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido. Utilize POST.']);
    exit;
}

// Ler corpo da requisição JSON
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos ou formato JSON ausente.']);
    exit;
}

// Obter e sanitizar campos
$name = trim(filter_var($data['name'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$phone = trim(preg_replace('/[^0-9]/', '', $data['phone'] ?? ''));
$email = trim(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL));
$businessSegment = trim(filter_var($data['businessSegment'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$projectType = trim(filter_var($data['projectType'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$description = trim(filter_var($data['description'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));
$hasDomain = trim(filter_var($data['hasDomain'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS));

// Validação dos campos obrigatórios
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nome é obrigatório.']);
    exit;
}

if (strlen($phone) < 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Número de WhatsApp/telefone inválido com DDD.']);
    exit;
}

if (empty($description)) {
    http_response_code(400);
    echo json_encode(['error' => 'Descrição do projeto é obrigatória.']);
    exit;
}

// Preparar registro do Lead
$leadRecord = [
    'id' => 'lead_' . date('Ymd_His') . '_' . bin2hex(random_bytes(3)),
    'name' => $name,
    'phone' => $phone,
    'email' => $email ?: null,
    'businessSegment' => $businessSegment ?: null,
    'projectType' => $projectType ?: 'Landing Page',
    'description' => $description,
    'hasDomain' => $hasDomain ?: null,
    'createdAt' => date('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'
];

// Opcional: Salvar em arquivo de log local seguro (fora da raiz web em produção)
$logDir = __DIR__ . '/../storage';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0750, true);
}

$logFile = $logDir . '/leads.log';
@file_put_contents($logFile, json_encode($leadRecord, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);

// Resposta de sucesso
http_response_code(201);
echo json_encode([
    'success' => true,
    'message' => 'Solicitação de orçamento recebida com sucesso!',
    'leadId' => $leadRecord['id']
]);
