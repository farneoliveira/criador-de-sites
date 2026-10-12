import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware de segurança básica e parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Anti-spam em memória (Rate limiting por IP)
const ipRequestCounts = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestCounts.get(ip);

  if (!entry) {
    ipRequestCounts.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, firstRequestTime: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Armazenamento em memória para leads da sessão
interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessSegment?: string;
  projectType: string;
  description: string;
  hasDomain?: string;
  createdAt: string;
  ip: string;
}

const leadsStore: LeadRecord[] = [];

// Endpoint de Saúde
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    domain: 'criadordesites.app.br',
    timestamp: new Date().toISOString()
  });
});

// Endpoint seguro para processamento de Leads do Formulário de Orçamento
app.post('/api/lead', (req: Request, res: Response): any => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Muitas solicitações a partir desta conexão. Por favor, aguarde alguns minutos ou entre em contato pelo WhatsApp.'
    });
  }

  const { name, phone, email, businessSegment, projectType, description, hasDomain } = req.body;

  // Validação dos campos obrigatórios
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Nome é obrigatório.' });
  }

  if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Número de WhatsApp/telefone inválido com DDD.' });
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ error: 'Descrição da necessidade do projeto é obrigatória.' });
  }

  // Sanitização básica
  const sanitizedLead: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim().slice(0, 100),
    phone: phone.trim().slice(0, 20),
    email: email && typeof email === 'string' ? email.trim().slice(0, 100) : undefined,
    businessSegment: businessSegment && typeof businessSegment === 'string' ? businessSegment.trim().slice(0, 100) : undefined,
    projectType: projectType && typeof projectType === 'string' ? projectType.trim().slice(0, 80) : 'Landing Page',
    description: description.trim().slice(0, 1500),
    hasDomain: hasDomain && typeof hasDomain === 'string' ? hasDomain.trim().slice(0, 50) : undefined,
    createdAt: new Date().toISOString(),
    ip: clientIp.slice(0, 45)
  };

  leadsStore.push(sanitizedLead);
  console.log(`[Lead Recebido] ID: ${sanitizedLead.id} | Nome: ${sanitizedLead.name} | WhatsApp: ${sanitizedLead.phone} | Projeto: ${sanitizedLead.projectType}`);

  return res.status(201).json({
    success: true,
    message: 'Solicitação de orçamento recebida com sucesso! Em breve entraremos em contato.',
    leadId: sanitizedLead.id
  });
});

// Inicialização do servidor com Vite em desenvolvimento ou estático em produção
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Criador de Sites em execução na porta ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Falha ao iniciar o servidor:', err);
});
