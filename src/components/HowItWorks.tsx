import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

export const HowItWorks: React.FC = () => {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Passo a Passo
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Como funciona a criação do seu site, do início à publicação
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Um processo direto, sem complicação técnica e com acompanhamento constante em cada etapa.
          </p>
        </div>

        {/* Linha do Tempo / Grid dos 6 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {siteConfig.steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 font-mono text-sm">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Box de Diferenciais de Atendimento */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nosso Compromisso
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                O que você pode esperar do nosso trabalho
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Atendimento humanizado:</strong> Conversamos diretamente com você em linguagem clara, sem termos técnicos desnecessários.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Solução no tamanho certo:</strong> Você não contrata um sistema complexo e caro quando precisa apenas de uma boa landing page.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Transparência de valores:</strong> Proposta comercial documentada antes de qualquer pagamento ou início de produção.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Flexibilidade para crescer:</strong> Seu site é construído em código moderno e pode receber novas páginas no futuro.</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <a
                href={buildWhatsAppLink("Olá! Gostaria de conversar sobre o início do desenvolvimento de um site para minha empresa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Dar o Primeiro Passo pelo WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
