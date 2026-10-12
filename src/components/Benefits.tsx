import React from 'react';
import { Smartphone, MessageCircle, Search, ShieldCheck, Headphones, Eye } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const icons = [
  Smartphone,
  MessageCircle,
  Search,
  Eye,
  Headphones,
  ShieldCheck,
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Diferenciais de Verdade
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Por que um site bem estruturado faz diferença para o seu negócio?
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Sem promessas irreais ou termos técnicos confusos. Entregamos uma base digital sólida, rápida e feita para converter visitantes em clientes.
          </p>
        </div>

        {/* Grade de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.benefits.map((benefit, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={benefit.title}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-700">
                    {benefit.description}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {benefit.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
