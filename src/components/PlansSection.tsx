import React from 'react';
import { Check, X, Clock, Server, LifeBuoy, ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig, buildWhatsAppLink, Plan } from '../config/siteConfig';

interface PlansSectionProps {
  onSelectPlanForBudget?: (planId: string) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlanForBudget }) => {
  const handleSelectPlan = (plan: Plan) => {
    if (onSelectPlanForBudget) {
      onSelectPlanForBudget(plan.id);
    }
    const orcamentoElem = document.querySelector('#orcamento');
    if (orcamentoElem) {
      orcamentoElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="planos" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Planos & Condições Transparentes
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Escolha a estrutura adequada para a fase do seu negócio
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Sem custos ocultos ou cobranças inesperadas. Valores de referência editáveis e adaptados ao tamanho de cada projeto.
          </p>
        </div>

        {/* Grade de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {siteConfig.plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.highlighted
                  ? 'border-blue-600 shadow-lg bg-blue-50/10 ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Badge discreto para plano recomendado */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-xs">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Preço e Forma */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {plan.priceDisplay}
                    </span>
                    {plan.pricePeriod && (
                      <span className="text-xs text-slate-500 font-medium">
                        · {plan.pricePeriod}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {plan.priceNote}
                  </p>
                </div>

                {/* Prazo estimado */}
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Prazo de entrega: </span>
                    <span>{plan.deliveryEstimate}</span>
                  </div>
                </div>

                {/* Recursos incluídos */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                    Recursos do Projeto:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        )}
                        <span className={feat.included ? 'text-slate-800' : 'text-slate-400 line-through'}>
                          {feat.text}
                          {feat.tooltip && (
                            <span className="ml-1 text-[10px] text-slate-400 no-underline italic">
                              ({feat.tooltip})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notas de Hospedagem & Suporte */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
                  <div className="flex items-start gap-2">
                    <Server className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">Hospedagem: </span>
                      <span>{plan.hostingNote}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <LifeBuoy className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800">Suporte: </span>
                      <span>{plan.supportNote}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Botões de Ação */}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                <a
                  href={buildWhatsAppLink(plan.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contratar ou Tirar Dúvidas via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <span>Preencher Orçamento Detalhado</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Rodapé informativo da seção de planos */}
        <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          <strong>Aviso de Transparência:</strong> Os valores acima são referências para projetos padrão. Cada empresa possui necessidades particulares de conteúdo e páginas; o valor final e o prazo exato são confirmados na proposta formal antes do início.
        </div>

      </div>
    </section>
  );
};
