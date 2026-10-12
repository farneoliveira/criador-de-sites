import React, { useState } from 'react';
import { ArrowUp, MessageSquare, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Coluna 1: Marca & Apresentação (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              {siteConfig.brand.name}
            </span>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Desenvolvimento de sites profissionais, landing pages de alta conversão e presença digital acessível para pequenos negócios, comércios e autônomos no Brasil.
            </p>
            <div className="text-slate-400 space-y-1">
              <div><strong>Domínio Oficial:</strong> {siteConfig.brand.domain}</div>
              <div><strong>Atendimento:</strong> {siteConfig.contact.location}</div>
              <div><strong>Horários:</strong> {siteConfig.contact.businessHours}</div>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#planos" className="hover:text-white transition-colors">Planos & Preços</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfólio Conceitual</a></li>
              <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
              <li><a href="#orcamento" className="hover:text-white transition-colors">Solicitar Orçamento</a></li>
            </ul>
          </div>

          {/* Coluna 3: Serviços Principais */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Serviços
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Landing Pages de Conversão</li>
              <li>Sites Institucionais</li>
              <li>Sites para Autônomos</li>
              <li>Cardápio e Catálogo Digital</li>
              <li>Páginas de Divulgação</li>
              <li>Hospedagem & Manutenção</li>
            </ul>
          </div>

          {/* Coluna 4: Contato & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contato Direto
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Fale pelo WhatsApp para esclarecer dúvidas sobre prazos e escopo.
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{siteConfig.contact.whatsappFormatted}</span>
            </a>
            <div className="text-slate-400 break-all">
              {siteConfig.contact.email}
            </div>
          </div>

        </div>

        {/* Linha Divisória */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {currentYear} {siteConfig.brand.name} · Todos os direitos reservados.</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModalType('privacy')}
                className="hover:text-white underline cursor-pointer"
              >
                Política de Privacidade
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setModalType('terms')}
                className="hover:text-white underline cursor-pointer"
              >
                Termos de Uso
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Modal de Políticas e Termos */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {modalType === 'privacy' ? (
                  <>
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Política de Privacidade · Criador de Sites</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Termos de Uso & Contratação</span>
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold px-2 py-1"
              >
                Fechar
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Coleta de Dados:</strong> O Criador de Sites (criadordesites.app.br) coleta unicamente os dados voluntariamente fornecidos pelo visitante em nossos formulários de orçamento ou via WhatsApp (como nome, telefone, e-mail e informações sobre o projeto pretendido).
                  </p>
                  <p>
                    <strong>2. Finalidade:</strong> As informações são utilizadas exclusivamente para a elaboração de propostas comerciais, esclarecimento de dúvidas e prestação dos serviços contratados.
                  </p>
                  <p>
                    <strong>3. Sigilo & Segurança:</strong> Não comercializamos, compartilhamos ou repassamos seus dados cadastrais para terceiros. O tráfego de dados é protegido por criptografia SSL (HTTPS).
                  </p>
                  <p>
                    <strong>4. LGPD:</strong> Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), o titular pode solicitar a exclusão de suas informações de contato a qualquer momento através do e-mail <code>{siteConfig.contact.email}</code>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Objeto:</strong> O Criador de Sites presta serviços técnicos de criação, diagramação, programação frontend/backend e publicação de websites, landing pages e soluções digitais sob encomenda.
                  </p>
                  <p>
                    <strong>2. Escopo & Proposta:</strong> Cada projeto é regulado por proposta comercial formalizada previamente, onde são estipulados os prazos, valores, número de páginas, revisões incluídas e condições de pagamento.
                  </p>
                  <p>
                    <strong>3. Domínio e Conteúdo:</strong> O cliente é responsável por fornecer os dados e materiais institucionais (textos, logotipos e fotos próprias ou autorizadas). O registro do domínio oficial (.com.br) permanece sempre em nome e propriedade do cliente.
                  </p>
                  <p>
                    <strong>4. Hospedagem:</strong> A hospedagem e manutenção periódica podem ser contratadas através de nossos planos ou configuradas no servidor particular do cliente (ex: aaPanel, cPanel, VPS).
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Compreendido
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
};
