import React, { useState } from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import heroImg from '../assets/images/hero_web_showcase_1791815266803.jpg';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-slate-50 pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna de Texto (Conteúdo Editorial) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline discreta sem pílula decorativa ou pulso artificial */}
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Desenvolvimento Web Especializado · Brasil
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] [text-wrap:balance]">
              {siteConfig.brand.tagline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed [text-wrap:pretty]">
              {siteConfig.brand.subheadline}
            </p>

            {/* CTAs Principais */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#planos"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Conhecer os Planos
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#orcamento"
                className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
              >
                Solicitar Orçamento
              </a>

              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/80 rounded-lg transition-colors"
                title="Falar no WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold">Tirar Dúvida Rápida</span>
              </a>
            </div>

            {/* Destaques de Confiança Práticos */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Navegação impecável em qualquer celular</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Carregamento rápido e código limpo</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Sem pegadinhas ou fidelidade oculta</span>
              </div>
            </div>

          </div>

          {/* Coluna Visual (Mockup Dominante) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white">
              
              {/* Fallback container enquanto a imagem carrega */}
              {!imageLoaded && (
                <div className="aspect-[16/9] lg:aspect-[4/3] w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm">
                  Carregando apresentação do projeto...
                </div>
              )}

              <img
                src={heroImg}
                alt="Ambiente profissional com sites responsivos sendo apresentados em computadores e smartphones"
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                className={`w-full aspect-[16/9] lg:aspect-[4/3] object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Legenda visual sutil e transparente */}
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">Design responsivo estratégico</span>
                <span>Projetado para telas reais</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
