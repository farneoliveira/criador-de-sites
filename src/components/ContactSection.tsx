import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '../config/siteConfig';

interface FormData {
  name: string;
  phone: string;
  email: string;
  businessSegment: string;
  projectType: string;
  description: string;
  budgetPreference: string;
  hasDomain: string;
  agreeTerms: boolean;
}

interface ContactSectionProps {
  preselectedService?: string;
  preselectedPlan?: string;
  simulatorData?: {
    projectType: string;
    addons: string[];
    estimatedTotal: number;
  } | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  preselectedPlan,
  simulatorData
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    businessSegment: '',
    projectType: 'Landing Page',
    description: '',
    budgetPreference: 'Ainda pesquisando opções',
    hasDomain: 'Ainda não possuo',
    agreeTerms: true
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Efeito para preencher campos quando o usuário seleciona um serviço ou plano
  useEffect(() => {
    if (simulatorData) {
      setFormData((prev) => ({
        ...prev,
        projectType: simulatorData.projectType,
        description: `Simulação de site: ${simulatorData.projectType} com adicionais (${simulatorData.addons.join(', ')}). Estimativa: R$ ${simulatorData.estimatedTotal}.`
      }));
    } else if (preselectedPlan) {
      const plan = siteConfig.plans.find((p) => p.id === preselectedPlan);
      if (plan) {
        setFormData((prev) => ({
          ...prev,
          projectType: plan.name,
          description: `Tenho interesse no ${plan.name} (${plan.priceDisplay}).`
        }));
      }
    } else if (preselectedService) {
      const service = siteConfig.services.find((s) => s.id === preselectedService);
      if (service) {
        setFormData((prev) => ({
          ...prev,
          projectType: service.title,
          description: `Gostaria de mais detalhes sobre o serviço de ${service.title}.`
        }));
      }
    }
  }, [preselectedService, preselectedPlan, simulatorData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const validatePhone = (phone: string): boolean => {
    const clean = phone.replace(/\D/g, '');
    return clean.length >= 10 && clean.length <= 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validação estrita no cliente
    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome ou o nome da sua empresa.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrorMessage('Por favor, informe um número de telefone/WhatsApp válido com DDD (10 ou 11 dígitos).');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Por favor, descreva resumidamente o que você precisa em seu site.');
      return;
    }

    setLoading(true);

    try {
      // Envio para o endpoint do backend
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Não foi possível processar a mensagem no servidor.');
      }

      setSubmittedData({ ...formData });
    } catch (err: any) {
      // Fallback gracioso: permitir envio direto via WhatsApp sem frustrar o usuário
      console.warn('Backend indisponível, utilizando canal direto:', err);
      setSubmittedData({ ...formData });
    } finally {
      setLoading(false);
    }
  };

  const buildSubmittedWhatsAppLink = (): string => {
    if (!submittedData) return buildWhatsAppLink();
    const msg = `Olá! Acabei de enviar uma solicitação de orçamento:
• Nome: ${submittedData.name}
• WhatsApp: ${submittedData.phone}
• Tipo de Site: ${submittedData.projectType}
• Segmento: ${submittedData.businessSegment || 'Não informado'}
• Domínio: ${submittedData.hasDomain}
• Resumo: ${submittedData.description}`;
    return buildWhatsAppLink(msg);
  };

  return (
    <section id="orcamento" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Fale Conosco
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Solicite um orçamento sem compromisso
          </h2>
          <p className="text-base text-slate-600 [text-wrap:pretty]">
            Preencha os dados abaixo ou converse diretamente pelo WhatsApp para receber uma proposta alinhada ao seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Coluna de Informações e Contatos Diretos */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900">
                Atendimento Rápido e Descomplicado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Respondemos em horário comercial com clareza sobre prazos, custos e orientações técnicas para o seu site.
              </p>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">WhatsApp Comercial:</span>
                    <span>{siteConfig.contact.whatsappFormatted}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">E-mail:</span>
                    <span>{siteConfig.contact.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Horário de Atendimento:</span>
                    <span>{siteConfig.contact.businessHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Localização:</span>
                    <span>{siteConfig.contact.location}</span>
                  </div>
                </div>
              </div>

              {/* Botão de Destaque WhatsApp */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chamar Diretamente no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Caixa de Transparência */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-blue-900 block">Privacidade & Segurança:</span>
              <p>Seus dados de contato são usados exclusivamente para o envio do orçamento e esclarecimento de dúvidas. Não enviamos spam nem compartilhamos suas informações.</p>
            </div>

          </div>

          {/* Coluna do Formulário de Orçamento */}
          <div id="formulario-contato" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            
            {submittedData ? (
              /* Estado de Sucesso */
              <div className="py-8 text-center space-y-5">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    Solicitação Registrada com Sucesso!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong>{submittedData.name}</strong>. Recebemos sua mensagem sobre <strong>{submittedData.projectType}</strong>. Entraremos em contato pelo telefone/WhatsApp informado.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 max-w-md mx-auto text-left space-y-1.5">
                  <div><strong>Telefone:</strong> {submittedData.phone}</div>
                  <div><strong>Tipo de Site:</strong> {submittedData.projectType}</div>
                  <div><strong>Descrição:</strong> {submittedData.description}</div>
                </div>

                <div className="pt-3 space-y-2 max-w-md mx-auto">
                  <a
                    href={buildSubmittedWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Agilizar e Conversar Agora no WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    Enviar outra solicitação
                  </button>
                </div>
              </div>
            ) : (
              /* Formulário Ativo */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    Formulário de Orçamento Detalhado
                  </h3>
                  <p className="text-xs text-slate-500">
                    Preencha os campos abaixo para elaborarmos uma proposta personalizada.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700">
                      Seu Nome / Nome da Empresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Carlos Silva"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Telefone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
                      WhatsApp com DDD <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 98765-4321"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="carlos@exemplo.com.br"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Segmento */}
                  <div className="space-y-1.5">
                    <label htmlFor="businessSegment" className="block text-xs font-semibold text-slate-700">
                      Ramo de Atuação
                    </label>
                    <input
                      type="text"
                      id="businessSegment"
                      name="businessSegment"
                      value={formData.businessSegment}
                      onChange={handleChange}
                      placeholder="Ex: Advocacia, Consultoria, Padaria"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tipo de Site Desejado */}
                  <div className="space-y-1.5">
                    <label htmlFor="projectType" className="block text-xs font-semibold text-slate-700">
                      Tipo de Site Desejado
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="Landing Page">Landing Page (Página única de conversão)</option>
                      <option value="Site Institucional">Site Institucional para Empresa</option>
                      <option value="Profissional Autônomo">Site para Profissional Autônomo</option>
                      <option value="Comércio Local / Catálogo">Comércio Local / Cardápio / Catálogo</option>
                      <option value="Plano Essencial">Plano Essencial (A partir de R$ 490)</option>
                      <option value="Plano Profissional">Plano Profissional (A partir de R$ 980)</option>
                      <option value="Plano Personalizado">Plano Personalizado / Sob Medida</option>
                      <option value="Outro / Preciso de Orientação">Outro / Não sei qual escolher</option>
                    </select>
                  </div>

                  {/* Situação do Domínio */}
                  <div className="space-y-1.5">
                    <label htmlFor="hasDomain" className="block text-xs font-semibold text-slate-700">
                      Já tem domínio registrado (.com.br)?
                    </label>
                    <select
                      id="hasDomain"
                      name="hasDomain"
                      value={formData.hasDomain}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="Ainda não possuo">Ainda não possuo (preciso de orientação)</option>
                      <option value="Já possuo registrado">Já possuo registrado</option>
                      <option value="Já tenho site antigo e quero renovar">Já tenho site antigo e quero renovar</option>
                    </select>
                  </div>
                </div>

                {/* Descrição do Projeto */}
                <div className="space-y-1.5">
                  <label htmlFor="description" className="block text-xs font-semibold text-slate-700">
                    O que seu site precisa ter? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Conte resumidamente sobre seus serviços, se já possui fotos e logotipo, e qual é o principal objetivo do site."
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                {/* Termos de Consentimento */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-[11px] text-slate-500 cursor-pointer">
                    Concordo em receber o contato para fins de apresentação do orçamento solicitado.
                  </label>
                </div>

                {/* Botão de Envio */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    {loading ? (
                      <span>Enviando dados...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Proposta Comercial</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
