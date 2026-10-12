import React, { useState } from 'react';
import { Calculator, Check, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

interface ProjectTypeOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  baseDays: string;
  description: string;
}

const projectTypeOptions: ProjectTypeOption[] = [
  {
    id: 'landing-page',
    name: 'Landing Page de Alta Conversão',
    category: 'Página Única',
    basePrice: 490,
    baseDays: '3 a 5 dias úteis',
    description: 'Focada em vender um serviço ou produto com CTA para o WhatsApp.'
  },
  {
    id: 'institucional',
    name: 'Site Institucional para Empresa',
    category: 'Múltiplas Páginas',
    basePrice: 980,
    baseDays: '7 a 12 dias úteis',
    description: 'Apresentação completa: Início, Sobre, Serviços, Galeria e Contato.'
  },
  {
    id: 'autonomo',
    name: 'Site para Profissional Autônomo',
    category: 'Autoridade & Agenda',
    basePrice: 690,
    baseDays: '5 a 8 dias úteis',
    description: 'Especialidades, biografia, dúvidas frequentes e agendamento.'
  },
  {
    id: 'comercio-local',
    name: 'Site para Comércio ou Restaurante',
    category: 'Catálogo / Cardápio',
    basePrice: 790,
    baseDays: '6 a 10 dias úteis',
    description: 'Apresentação de produtos, cardápio digital e mapa de localização.'
  }
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

const addonOptions: AddonOption[] = [
  {
    id: 'copy-writing',
    name: 'Redação Estruturada de Textos',
    price: 150,
    description: 'Apoio profissional na escrita de chamadas e descrição dos seus serviços.'
  },
  {
    id: 'lead-form',
    name: 'Formulário com Envio Seguro de Dados',
    price: 120,
    description: 'Formulário de captação de orçamentos integrado.'
  },
  {
    id: 'expanded-catalog',
    name: 'Catálogo / Galeria Expandida',
    price: 160,
    description: 'Mais de 15 itens cadastrados com fotos e descrições detalhadas.'
  },
  {
    id: 'domain-email',
    name: 'Configuração de Domínio e E-mail Profissional',
    price: 90,
    description: 'Orientação e apontamento do seu nome .com.br e caixas de e-mail.'
  },
  {
    id: 'hosting-support',
    name: 'Hospedagem Rápida & Manutenção (1º Ano)',
    price: 360,
    description: 'Servidor seguro, SSL (HTTPS), backups e suporte técnico contínuo.'
  }
];

interface InteractiveCalculatorProps {
  initialProjectType?: string;
  onApplyToForm?: (summary: { projectType: string; addons: string[]; estimatedTotal: number }) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  initialProjectType = 'landing-page',
  onApplyToForm
}) => {
  const [selectedType, setSelectedType] = useState<string>(initialProjectType);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['domain-email']);

  const currentType = projectTypeOptions.find((p) => p.id === selectedType) || projectTypeOptions[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = (): number => {
    const addonsTotal = selectedAddons.reduce((acc, currId) => {
      const addon = addonOptions.find((a) => a.id === currId);
      return acc + (addon ? addon.price : 0);
    }, 0);
    return currentType.basePrice + addonsTotal;
  };

  const estimatedTotal = calculateTotal();

  const handleReset = () => {
    setSelectedType('landing-page');
    setSelectedAddons(['domain-email']);
  };

  const generateWhatsAppMessage = (): string => {
    const addonsNames = selectedAddons
      .map((id) => addonOptions.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return `Olá! Fiz uma simulação de site no criadordesites.app.br:
• Tipo de Site: ${currentType.name}
• Recursos Adicionais: ${addonsNames || 'Nenhum adicional'}
• Estimativa calculada: R$ ${estimatedTotal}
Gostaria de validar essa estimativa e tirar dúvidas!`;
  };

  const handleApplyToForm = () => {
    if (onApplyToForm) {
      onApplyToForm({
        projectType: currentType.name,
        addons: selectedAddons.map((id) => addonOptions.find((a) => a.id === id)?.name || id),
        estimatedTotal
      });
    }
    const formElem = document.querySelector('#formulario-contato');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho do Simulador */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Calculator className="w-4 h-4" />
            <span>Ferramenta de Planejamento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Simulador de Escopo e Investimento
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Simule os itens que fazem sentido para o seu negócio e veja uma estimativa transparente antes de conversar conosco.
          </p>
        </div>

        {/* Caixa Principal do Simulador */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Esquerdo: Seleção de Opções */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
            
            {/* Etapa 1: Tipo de Site */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  1. Escolha o tipo de site principal:
                </span>
                <span className="text-xs text-slate-500">Obrigatório</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypeOptions.map((opt) => {
                  const isSelected = selectedType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedType(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-700">{opt.category}</span>
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          R$ {opt.basePrice}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm mt-1">{opt.name}</div>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">{opt.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Etapa 2: Adicionais Opcionais */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  2. Recursos complementares recomendados:
                </span>
                <span className="text-xs text-slate-500">Opcional</span>
              </div>

              <div className="space-y-2.5">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-blue-500/80 bg-blue-50/20'
                          : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <span className="text-sm font-semibold text-slate-800">{addon.name}</span>
                          <p className="text-xs text-slate-500 leading-snug">{addon.description}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-700 font-mono whitespace-nowrap shrink-0">
                          + R$ {addon.price}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar opções padrão</span>
              </button>
            </div>

          </div>

          {/* Lado Direito: Resumo Estimado e Ação */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Resumo da Simulação
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Estimativa Transparente
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-medium text-slate-800">{currentType.name}</span>
                <span className="font-bold text-slate-900 font-mono">R$ {currentType.basePrice}</span>
              </div>

              {selectedAddons.length > 0 ? (
                selectedAddons.map((id) => {
                  const addon = addonOptions.find((a) => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between items-center py-1 text-slate-500">
                      <span>+ {addon.name}</span>
                      <span className="font-mono text-slate-700">+ R$ {addon.price}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-400 italic py-1">Nenhum adicional selecionado</div>
              )}

              <div className="flex justify-between items-center py-2 text-slate-500 border-t border-slate-100">
                <span>Prazo médio estimado de entrega:</span>
                <span className="font-semibold text-slate-800">{currentType.baseDays}</span>
              </div>
            </div>

            {/* Total Destacado */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium">Investimento Estimado:</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  R$ {estimatedTotal}
                </span>
                <span className="text-xs text-slate-500">referência inicial</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                * Sem pegadinhas: O valor final é fixado em proposta comercial antes de qualquer pagamento.
              </p>
            </div>

            {/* CTAs de Conversão */}
            <div className="space-y-2.5 pt-2">
              <a
                href={buildWhatsAppLink(generateWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-3.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar Sobre Esta Simulação no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Usar no Formulário de Contato</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
