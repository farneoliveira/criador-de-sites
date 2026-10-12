import React, { useState } from 'react';
import { Eye, ExternalLink, X, Smartphone, Monitor, CheckCircle, MessageSquare } from 'lucide-react';
import { siteConfig, buildWhatsAppLink, PortfolioProject } from '../config/siteConfig';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const categories = ['Todos', 'Comércio Local', 'Institucional', 'Landing Page'];

  const filteredProjects = activeCategory === 'Todos'
    ? siteConfig.portfolio
    : siteConfig.portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Projetos & Demonstrações
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Exemplos de sites criados para diferentes segmentos
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Veja como podemos estruturar a presença digital do seu negócio com elegância visual, usabilidade e foco em conversão.
          </p>
        </div>

        {/* Filtros de Categoria (Interativos) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grade do Portfólio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                {/* Imagem do Projeto */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={project.image}
                    alt={`Mockup conceitual do projeto ${project.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {project.isConceptual && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[10px] font-semibold text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
                      Projeto Conceitual
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 space-y-3">
                  <div className="text-xs font-medium text-blue-600">
                    {project.segment} · {project.category}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <ul className="space-y-1 text-xs text-slate-500">
                      {project.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ação do Card */}
              <div className="p-6 pt-0 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Detalhes do Projeto</span>
                </button>

                <a
                  href={buildWhatsAppLink(`Olá! Gostei do modelo de site "${project.title}" e gostaria de algo semelhante para o meu negócio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-200 transition-colors"
                  title="Gostei desse estilo de site"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Nota de transparência sobre o portfólio */}
        <div className="mt-12 text-center text-xs text-slate-400">
          * Todas as demonstrações acima foram produzidas para exemplificar a qualidade estética, organização e velocidade dos sites que entregamos.
        </div>

      </div>

      {/* Modal de Detalhes do Projeto */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col">
            
            {/* Topo do Modal */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-xs font-medium text-blue-600">
                  {selectedProject.segment}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Fechar detalhes"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6">
              
              {/* Imagem em destaque com seletor de visualização */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Visualização do Projeto</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`px-2 py-1 rounded flex items-center gap-1 ${
                        previewDevice === 'desktop' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Desktop</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`px-2 py-1 rounded flex items-center gap-1 ${
                        previewDevice === 'mobile' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition-all mx-auto ${
                  previewDevice === 'mobile' ? 'max-w-xs' : 'w-full'
                }`}>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[420px]"
                  />
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className="space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2">
                  <span className="font-semibold text-slate-800 block">Proposta do Projeto:</span>
                  <p>{selectedProject.liveDemoSummary}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Destaques de Implementação:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedProject.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Rodapé do Modal com Ação */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0">
              <span className="text-xs text-slate-500">
                Gostou deste estilo? Adaptamos para a sua marca.
              </span>
              <a
                href={buildWhatsAppLink(`Olá! Gostaria de um orçamento para criar um site no estilo do projeto "${selectedProject.title}".`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Pedir Proposta com Este Estilo</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
