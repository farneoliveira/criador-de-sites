import React from 'react';
import { ArrowRight, Check, MessageSquare } from 'lucide-react';
import { siteConfig, buildWhatsAppLink, ServiceItem } from '../config/siteConfig';

interface ServicesSectionProps {
  onSelectServiceForBudget?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBudget }) => {
  const handleSelectService = (service: ServiceItem) => {
    if (onSelectServiceForBudget) {
      onSelectServiceForBudget(service.id);
    }
    const orcamentoElem = document.querySelector('#orcamento');
    if (orcamentoElem) {
      orcamentoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Nossos Serviços
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Soluções digitais desenhadas para o momento do seu negócio
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Escolha o modelo de site ideal para apresentar seu trabalho com profissionalismo, transparência e sem pagar por recursos desnecessários.
          </p>
        </div>

        {/* Grade de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>0{index + 1}</span>
                  <span className="font-sans text-slate-500 font-medium">Desenvolvimento Web</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
                  <span className="font-semibold text-slate-800 block">Indicado para:</span>
                  <p>{service.idealFor}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                    O que está incluído:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ações do Card */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectService(service)}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Incluir no Simulador</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={buildWhatsAppLink(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Conversar no WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
