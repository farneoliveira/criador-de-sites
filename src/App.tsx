/**
 * Criador de Sites (https://criadordesites.app.br)
 * Aplicação Principal
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { ServicesSection } from './components/ServicesSection';
import { InteractiveCalculator } from './components/InteractiveCalculator';
import { PlansSection } from './components/PlansSection';
import { PortfolioSection } from './components/PortfolioSection';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  const [selectedServiceForBudget, setSelectedServiceForBudget] = useState<string | undefined>();
  const [selectedPlanForBudget, setSelectedPlanForBudget] = useState<string | undefined>();
  const [simulatorData, setSimulatorData] = useState<{
    projectType: string;
    addons: string[];
    estimatedTotal: number;
  } | null>(null);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceForBudget(serviceId);
    setSelectedPlanForBudget(undefined);
    setSimulatorData(null);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanForBudget(planId);
    setSelectedServiceForBudget(undefined);
    setSimulatorData(null);
  };

  const handleApplySimulatorToForm = (data: {
    projectType: string;
    addons: string[];
    estimatedTotal: number;
  }) => {
    setSimulatorData(data);
    setSelectedServiceForBudget(undefined);
    setSelectedPlanForBudget(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Cabeçalho com Contrato de 3 Zonas */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* 2. Hero Section com Headline Clara e Mockup Real */}
        <Hero />

        {/* 3. Benefícios Práticos & Sem Promessas Falsas */}
        <Benefits />

        {/* 4. Serviços Detalhados */}
        <ServicesSection onSelectServiceForBudget={handleSelectService} />

        {/* 5. Simulador Interativo de Orçamento */}
        <InteractiveCalculator onApplyToForm={handleApplySimulatorToForm} />

        {/* 6. Planos Comerciais Transparentes */}
        <PlansSection onSelectPlanForBudget={handleSelectPlan} />

        {/* 7. Portfólio Conceitual com Demonstrações */}
        <PortfolioSection />

        {/* 8. Como Funciona & Diferenciais */}
        <HowItWorks />

        {/* 9. Perguntas Frequentes (FAQ) */}
        <FAQSection />

        {/* 10. Contato & Formulário de Orçamento */}
        <ContactSection
          preselectedService={selectedServiceForBudget}
          preselectedPlan={selectedPlanForBudget}
          simulatorData={simulatorData}
        />
      </main>

      {/* 11. Rodapé Completo com Políticas e Termos */}
      <Footer />

      {/* 12. Botão Flutuante do WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
}
