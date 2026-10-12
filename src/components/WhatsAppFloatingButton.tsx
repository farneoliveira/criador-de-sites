import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center"
    >
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-emerald-500/50"
        aria-label="Falar com o Criador de Sites pelo WhatsApp"
      >
        <MessageSquare className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
          Conversar no WhatsApp
        </span>
      </a>
    </aside>
  );
};
