/**
 * Configuração Central do Criador de Sites (https://criadordesites.app.br)
 * 
 * Todas as informações comerciais, números de contato, planos, serviços e
 * portfólio conceitual estão concentrados neste arquivo para edição simplificada.
 */

// Import das imagens geradas de alta fidelidade
import heroImg from '../assets/images/hero_web_showcase_1791815266803.jpg';
import bistroImg from '../assets/images/portfolio_local_bistro_1791815275885.jpg';
import clinicImg from '../assets/images/portfolio_clinic_site_1791815287110.jpg';
import techImg from '../assets/images/portfolio_landing_tech_1791815296609.jpg';

export interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceDisplay: string;
  pricePeriod?: string;
  priceNote: string;
  deliveryEstimate: string;
  features: PlanFeature[];
  hostingNote: string;
  supportNote: string;
  recommendedFor: string;
  whatsappMessage: string;
  highlighted?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  idealFor: string;
  deliverables: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  segment: string;
  category: 'Landing Page' | 'Institucional' | 'Comércio Local';
  description: string;
  image: string;
  features: string[];
  isConceptual: boolean;
  liveDemoSummary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    domain: string;
    canonicalUrl: string;
    tagline: string;
    subheadline: string;
  };
  contact: {
    // Número do WhatsApp no formato internacional sem símbolos (ex: 5511999999999)
    // O cliente pode alterar facilmente aqui para o seu número real.
    whatsappNumber: string;
    whatsappFormatted: string;
    email: string;
    location: string;
    businessHours: string;
  };
  plans: Plan[];
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  benefits: {
    title: string;
    description: string;
    detail: string;
  }[];
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  faqs: FAQItem[];
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Criador de Sites",
    domain: "criadordesites.app.br",
    canonicalUrl: "https://criadordesites.app.br",
    tagline: "Seu próximo site profissional começa aqui.",
    subheadline: "Criamos sites modernos, responsivos e preparados para apresentar seu negócio ao mundo, com soluções acessíveis e transparentes para quem quer crescer na internet."
  },
  contact: {
    // Número padrão configurável (exemplo formatado com DDD do Brasil, facilmente substituível)
    whatsappNumber: "5511999999999",
    whatsappFormatted: "(11) 99999-9999",
    email: "contato@criadordesites.app.br",
    location: "São Paulo, SP · Atendimento para todo o Brasil",
    businessHours: "Segunda a Sexta, das 09h às 18h"
  },
  benefits: [
    {
      title: "100% Adaptado para Celular",
      description: "Mais de 80% do público acessa por smartphone.",
      detail: "Seu site se ajusta perfeitamente em celulares, tablets e computadores de qualquer tamanho."
    },
    {
      title: "Contato Direto no WhatsApp",
      description: "Sem burocracia para falar com seu cliente.",
      detail: "Botões estrategicamente posicionados que abrem conversas diretas no WhatsApp com mensagens prontas."
    },
    {
      title: "Estrutura Pronta para o Google (SEO)",
      description: "Códigos semânticos e títulos organizados.",
      detail: "Metadados, OpenGraph, carregamento veloz e indexação inicial preparados para mecanismos de busca."
    },
    {
      title: "Velocidade e Estabilidade",
      description: "Páginas leves que abrem num piscar de olhos.",
      detail: "Otimização de imagens e código enxuto para que ninguém desista antes de ver seus serviços."
    },
    {
      title: "Suporte e Manutenção sob Medida",
      description: "Você não fica na mão após a entrega.",
      detail: "Opções de manutenção mensal ou suporte pontual conforme o plano contratado."
    },
    {
      title: "Transparência Total e Sem Pegadinhas",
      description: "Escopo e valores claros desde o início.",
      detail: "Você sabe exatamente o que está contratando, sem custos ocultos ou fidelidades forçadas."
    }
  ],
  services: [
    {
      id: "landing-page",
      title: "Landing Pages de Alta Conversão",
      shortDescription: "Página única e focada em apresentar um produto, serviço ou oferta específica para captar clientes rapidamente.",
      idealFor: "Campanhas de tráfego pago, lançamentos de serviços e profissionais autônomos.",
      deliverables: [
        "Página de apresentação com seções direcionadas",
        "Botões de chamada direta para o WhatsApp",
        "Formulário de contato/orçamento simplificado",
        "Otimização para carregamento ultra rápido"
      ],
      ctaLabel: "Solicitar Orçamento de Landing Page",
      whatsappMessage: "Olá! Gostaria de um orçamento para criação de uma Landing Page para meu negócio."
    },
    {
      id: "site-institucional",
      title: "Sites Institucionais para Empresas",
      shortDescription: "Presença digital completa para sua empresa apresentar história, portfólio, equipe, serviços e dados de contato.",
      idealFor: "Pequenas empresas, clínicas, consultorias, escritórios e prestadores de serviços estabelecidos.",
      deliverables: [
        "Múltiplas seções ou páginas organizadas (Início, Quem Somos, Serviços, Contato)",
        "Galeria de projetos, fotos ou estrutura física",
        "Integração com Google Maps e WhatsApp",
        "Configuração de domínio próprio e e-mail profissional"
      ],
      ctaLabel: "Solicitar Orçamento de Site Institucional",
      whatsappMessage: "Olá! Gostaria de receber uma proposta para criação de um Site Institucional para minha empresa."
    },
    {
      id: "profissionais-autonomos",
      title: "Sites para Profissionais Autônomos",
      shortDescription: "Destaque sua autoridade profissional com um site elegante que valoriza suas credenciais e facilita agendamentos.",
      idealFor: "Advogados, médicos, nutricionistas, psicólogos, arquitetos, fotógrafos e consultores.",
      deliverables: [
        "Apresentação de especialidades e biografia",
        "Links diretos para agenda, redes sociais e WhatsApp",
        "Seção para esclarecimento de dúvidas frequentes",
        "Visual limpo que gera autoridade imediata"
      ],
      ctaLabel: "Solicitar Orçamento para Autônomo",
      whatsappMessage: "Olá! Sou profissional autônomo e gostaria de criar um site para divulgar meus atendimentos."
    },
    {
      id: "comercio-local",
      title: "Sites para Lojas e Comércio Local",
      shortDescription: "Apresente seus produtos, horários de funcionamento, cardápio ou catálogo com localização física no mapa.",
      idealFor: "Restaurantes, padarias, oficinas, academias, salões de beleza e lojas de bairro.",
      deliverables: [
        "Catálogo de produtos ou cardápio digital visualizável",
        "Endereço, mapa interativo e botão 'Como Chegar'",
        "Horários de atendimento e canais de delivery/WhatsApp",
        "Destaque para produtos em evidência"
      ],
      ctaLabel: "Solicitar Orçamento para Comércio Local",
      whatsappMessage: "Olá! Tenho um comércio local e gostaria de criar um site/catálogo para atrair clientes da minha região."
    },
    {
      id: "hospedagem-manutencao",
      title: "Hospedagem & Manutenção Web",
      shortDescription: "Garantia de que seu site continuará no ar, seguro, atualizado e com certificado SSL (HTTPS) ativo.",
      idealFor: "Empreendedores que preferem focar no seu trabalho e deixar a parte técnica com um especialista.",
      deliverables: [
        "Servidor seguro com backup periódico",
        "Certificado de segurança SSL gratuito",
        "Atualizações de textos e contatos conforme demanda",
        "Monitoramento de disponibilidade do site"
      ],
      ctaLabel: "Conhecer Opções de Hospedagem",
      whatsappMessage: "Olá! Gostaria de saber mais sobre as condições de hospedagem e manutenção de sites."
    },
    {
      id: "paginas-vendas",
      title: "Páginas de Divulgação & Catálogos",
      shortDescription: "Apresente promoções sazonais, catálogos de serviços ou divulgue novos lançamentos com impacto visual.",
      idealFor: "Negócios que querem divulgar campanhas específicas sem a complexidade de um e-commerce pesado.",
      deliverables: [
        "Layout visualmente persuasivo para o seu produto",
        "Tabela comparativa ou lista de benefícios",
        "Gatilhos de contato rápido via WhatsApp",
        "Rastreamento básico de cliques e visualizações"
      ],
      ctaLabel: "Solicitar Orçamento de Divulgação",
      whatsappMessage: "Olá! Gostaria de um orçamento para uma página de divulgação de serviços/produtos."
    }
  ],
  plans: [
    {
      id: "essencial",
      name: "Plano Essencial",
      tagline: "Ideal para quem está começando e precisa de uma presença online profissional sem complicar.",
      priceDisplay: "A partir de R$ 490",
      pricePeriod: "taxa única de criação",
      priceNote: "Valores personalizáveis conforme o escopo acordado.",
      deliveryEstimate: "3 a 7 dias úteis após o envio dos materiais",
      recommendedFor: "Profissionais liberais, autônomos e pequenos comércios que precisam de contato rápido.",
      hostingNote: "Hospedagem à parte ou pode ser hospedado no seu próprio servidor/provedor de preferência.",
      supportNote: "Suporte inicial de 30 dias para pequenos ajustes de texto e imagens.",
      features: [
        { text: "Página única (Landing Page ou One-page moderna)", included: true },
        { text: "100% responsivo para celulares e computadores", included: true },
        { text: "Botão de WhatsApp com mensagem personalizada", included: true },
        { text: "Seção de serviços, sobre nós e contatos", included: true },
        { text: "Configuração de domínio próprio (ex: suaempresa.com.br)", included: true },
        { text: "Otimização básica para mecanismos de busca (SEO)", included: true },
        { text: "Múltiplas páginas internas adicionais", included: false, tooltip: "Disponível no Plano Profissional" },
        { text: "Blog ou painel de postagens", included: false }
      ],
      whatsappMessage: "Olá! Tenho interesse no Plano Essencial de criação de site. Poderia me enviar mais detalhes?"
    },
    {
      id: "profissional",
      name: "Plano Profissional",
      badge: "Mais Procurado",
      highlighted: true,
      tagline: "Para empresas que querem transmitir mais solidez, com múltiplas seções e apresentação detalhada.",
      priceDisplay: "A partir de R$ 980",
      pricePeriod: "taxa única de criação",
      priceNote: "Orçamento ajustado de acordo com a quantidade de páginas e recursos.",
      deliveryEstimate: "7 a 15 dias úteis após a aprovação do conteúdo",
      recommendedFor: "Pequenas empresas, clínicas, consultorias e negócios com portfólio de serviços diversificado.",
      hostingNote: "Planos de hospedagem estável disponíveis ou instalação no seu servidor próprio (aaPanel, cPanel, etc.).",
      supportNote: "60 dias de suporte e garantia de funcionamento após publicação.",
      features: [
        { text: "Estrutura institucional completa (até 4 a 5 páginas/seções)", included: true },
        { text: "Design exclusivo adaptado às cores da sua marca", included: true },
        { text: "Formulário de orçamento com validação e envio seguro", included: true },
        { text: "Galeria de fotos / portfólio de trabalhos", included: true },
        { text: "Integração com Google Maps e canais de contato", included: true },
        { text: "SEO estruturado com metatags e OpenGraph para redes sociais", included: true },
        { text: "Configuração de e-mail profissional", included: true },
        { text: "Área de membros restrita ou loja virtual complexa", included: false, tooltip: "Requer escopo sob medida" }
      ],
      whatsappMessage: "Olá! Gostaria de entender melhor o Plano Profissional para minha empresa e receber um orçamento."
    },
    {
      id: "personalizado",
      name: "Plano Personalizado",
      tagline: "Desenvolvimento sob medida para demandas específicas, catálogos extensos ou sistemas web.",
      priceDisplay: "Sob Consulta",
      pricePeriod: "proposta comercial dedicada",
      priceNote: "Valores definidos após reunião de alinhamento de escopo técnico.",
      deliveryEstimate: "Prazo acordado conforme a complexidade",
      recommendedFor: "Empresas com fluxos customizados, múltiplos departamentos ou integrações especiais.",
      hostingNote: "Orientação e configuração em infraestrutura dedicada ou cloud conforme demanda.",
      supportNote: "Contrato de manutenção e evolução contínua sob medida.",
      features: [
        { text: "Arquitetura customizada para o seu modelo de negócio", included: true },
        { text: "Catálogos avançados de produtos com busca e filtros", included: true },
        { text: "Integração com APIs e sistemas externos", included: true },
        { text: "Otimização avançada de performance e segurança", included: true },
        { text: "Assessoria técnica na escolha de hospedagem e domínio", included: true },
        { text: "Consultoria de arquitetura e evolução do produto digital", included: true }
      ],
      whatsappMessage: "Olá! Tenho um projeto personalizado e gostaria de solicitar uma proposta comercial sob medida."
    }
  ],
  portfolio: [
    {
      id: "pao-e-arte",
      title: "Pão & Arte · Padaria & Café Artesanal",
      segment: "Gastronomia & Comércio Local",
      category: "Comércio Local",
      description: "Site com cardápio digital visual, horários de fornadas e pedidos rápidos direto no WhatsApp para retirada ou entrega no bairro.",
      image: bistroImg,
      features: ["Cardápio visual responsivo", "Botão de pedido WhatsApp", "Localização integrada no mapa", "Carregamento em menos de 1 segundo"],
      isConceptual: true,
      liveDemoSummary: "Exemplo conceitual desenvolvido para demonstrar soluções de cardápio e presença para comércios de bairro."
    },
    {
      id: "alma-saude",
      title: "Alma · Centro de Saúde Integrativa",
      segment: "Saúde & Profissionais Liberais",
      category: "Institucional",
      description: "Presença digital para clínica médica com apresentação do corpo clínico, especialidades médicas e botão direto para agendamento de consultas.",
      image: clinicImg,
      features: ["Apresentação de especialidades", "Apresentação dos médicos", "Orientações para pacientes", "Agendamento ágil"],
      isConceptual: true,
      liveDemoSummary: "Exemplo conceitual focado em confiança, credibilidade e facilidade de agendamento em saúde."
    },
    {
      id: "solaria-energia",
      title: "Solaria · Energia Solar & Sustentabilidade",
      segment: "Engenharia & Soluções Técnicas",
      category: "Landing Page",
      description: "Landing page direta focada em gerar orçamentos para instalação de sistemas fotovoltaicos residenciais e comerciais no Brasil.",
      image: techImg,
      features: ["Simulador de economia simples", "Captação de leads qualificados", "Tira-dúvidas de instalação", "Destaque de projetos"],
      isConceptual: true,
      liveDemoSummary: "Exemplo conceitual projetado para prestadores de serviços técnicos e empresas B2B."
    }
  ],
  steps: [
    {
      number: "01",
      title: "Primeiro Contato",
      description: "Você nos chama pelo WhatsApp ou preenche o formulário. Entendemos o que você faz, seu público e o que seu negócio precisa no momento."
    },
    {
      number: "02",
      title: "Definição do Escopo",
      description: "Apresentamos a opção mais adequada (landing page, site institucional ou catálogo), detalhando o que estará incluído de forma transparente."
    },
    {
      number: "03",
      title: "Envio de Conteúdos",
      description: "Você compartilha seu logotipo, fotos e informações básicas do negócio. Caso não tenha textos prontos, orientamos a estrutura ideal."
    },
    {
      number: "04",
      title: "Criação & Desenvolvimento",
      description: "Construímos o site com design moderno, responsividade para smartphones e links diretos para seu WhatsApp e redes."
    },
    {
      number: "05",
      title: "Revisão e Ajustes",
      description: "Você navega no site em um link de teste no seu celular e computador, avalia o resultado e fazemos os ajustes necessários."
    },
    {
      number: "06",
      title: "Publicação no Ar",
      description: "Configuramos seu domínio (ex: suamarca.com.br) e o site é publicado oficialmente para começar a divulgar seu negócio."
    }
  ],
  faqs: [
    {
      question: "Quanto custa criar um site profissional?",
      answer: "O valor varia de acordo com a complexidade do projeto. Uma Landing Page ou site de página única (Plano Essencial) inicia a partir de R$ 490, enquanto sites institucionais com várias seções e formulários iniciam a partir de R$ 980. Todos os orçamentos são confirmados previamente, sem cobranças surpresa."
    },
    {
      question: "Qual é a diferença entre uma Landing Page e um Site Institucional?",
      answer: "Uma Landing Page é uma página única focada em uma ação específica (ex: solicitar um orçamento ou agendar um serviço pelo WhatsApp). Já o Site Institucional é mais amplo, contendo páginas separadas para história da empresa, lista completa de serviços, galeria de trabalhos, área de contato e informações detalhadas."
    },
    {
      question: "O domínio e a hospedagem estão incluídos no valor da criação?",
      answer: "O registro do domínio (.com.br custa cerca de R$ 40/ano no Registro.br e deve ser pago diretamente ao órgão oficial em seu CPF ou CNPJ, garantindo que o domínio seja sempre de sua propriedade). A hospedagem pode ser contratada conosco ou em qualquer provedor de sua escolha. Orientamos todo o processo."
    },
    {
      question: "O site vai funcionar bem no celular?",
      answer: "Sim, absolutamente. Desenvolvemos com metodologia Mobile-First: o site é projetado primeiramente para carregar rápido e ter navegação fluida em celulares de qualquer tamanho, além de funcionar com perfeição em tablets e computadores."
    },
    {
      question: "Posso solicitar alterações depois que o site for entregue?",
      answer: "Sim. Todos os nossos planos incluem um período de garantia e suporte após a publicação para pequenos ajustes e correções. Para atualizações recorrentes ou novas páginas no futuro, temos opções de manutenção mensal ou atendimento pontual."
    },
    {
      question: "Quanto tempo demora para meu site ficar pronto?",
      answer: "Landing pages e páginas essenciais costumam levar de 3 a 7 dias úteis após o envio dos materiais (textos, logos e fotos). Sites institucionais mais completos levam em média de 7 a 15 dias úteis. Prazos específicos são combinados e confirmados no escopo inicial."
    },
    {
      question: "Quem será responsável pelo conteúdo, textos e imagens do site?",
      answer: "Você fornece as informações sobre seus serviços, valores e fotos do negócio. Se você não tiver textos prontos, nós estruturamos títulos e descrições claras para valorizar sua proposta. Também podemos utilizar imagens demonstrativas profissionais livres de royalties caso não possua fotos próprias no momento."
    },
    {
      question: "Como funciona a contratação e o pagamento?",
      answer: "Após conversarmos pelo WhatsApp e aprovarmos a proposta com o escopo fechado, o pagamento é normalmente dividido: uma entrada para início da criação e o saldo final após aprovação do projeto antes da publicação oficial. Aceitamos PIX e parcelamento no cartão."
    },
    {
      question: "Preciso ter CNPJ para contratar um site?",
      answer: "Não! Atendemos tanto profissionais autônomos e pessoas físicas (com CPF) quanto empresas de todos os portes com CNPJ."
    },
    {
      question: "Vocês garantem que meu site vai ficar em 1º lugar no Google?",
      answer: "Não fazemos promessas enganosas de faturamento ou 1º lugar no Google. Nós entregamos uma estrutura técnica limpa, veloz, com metadados corretos, títulos adequados e indexação configurada, que é a base indispensável para que o Google encontre e avalie bem o seu site com o tempo."
    }
  ]
};

/**
 * Função utilitária para gerar links do WhatsApp devidamente codificados
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const phone = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
  const message = customMessage || "Olá! Conheci o Criador de Sites e gostaria de receber informações sobre a criação de um site para meu negócio.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
