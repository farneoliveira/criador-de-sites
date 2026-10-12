import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Tira-Dúvidas
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Respostas claras e transparentes para as dúvidas mais comuns de quem vai criar um site.
          </p>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-3">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 text-slate-900 font-semibold text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Chamada para dúvida não listada */}
        <div className="mt-12 p-6 rounded-xl bg-blue-50/60 border border-blue-100 text-center space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            Ainda tem alguma dúvida específica sobre o seu projeto?
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            Fale diretamente conosco sem nenhum compromisso. Explicamos o que for necessário para você tomar a melhor decisão.
          </p>
          <div>
            <a
              href={buildWhatsAppLink("Olá! Tenho uma dúvida sobre criação de site que não encontrei no site.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tirar Dúvida no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
