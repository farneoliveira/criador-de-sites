import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            aria-label="Criador de Sites - Início"
          >
            Criador de Sites
          </a>

          {/* Zone 2: 4–5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Navegação Principal">
            <a
              href="#servicos"
              onClick={(e) => { e.preventDefault(); handleNavClick('#servicos'); }}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#planos"
              onClick={(e) => { e.preventDefault(); handleNavClick('#planos'); }}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Planos
            </a>
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); handleNavClick('#portfolio'); }}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Portfólio
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => { e.preventDefault(); handleNavClick('#como-funciona'); }}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Como Funciona
            </a>
            <a
              href="#faq"
              onClick={(e) => { e.preventDefault(); handleNavClick('#faq'); }}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#orcamento"
              onClick={(e) => { e.preventDefault(); handleNavClick('#orcamento'); }}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700" aria-label="Menu móvel">
            <a
              href="#servicos"
              onClick={(e) => { e.preventDefault(); handleNavClick('#servicos'); }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#planos"
              onClick={(e) => { e.preventDefault(); handleNavClick('#planos'); }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Planos
            </a>
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); handleNavClick('#portfolio'); }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Portfólio
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => { e.preventDefault(); handleNavClick('#como-funciona'); }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Como Funciona
            </a>
            <a
              href="#faq"
              onClick={(e) => { e.preventDefault(); handleNavClick('#faq'); }}
              className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Perguntas Frequentes
            </a>
          </nav>
          <div className="pt-2">
            <a
              href="#orcamento"
              onClick={(e) => { e.preventDefault(); handleNavClick('#orcamento'); }}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
