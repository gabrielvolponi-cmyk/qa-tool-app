/** Textos da UI em português (QA Tool MVP) */
export const strings = {
  appName: 'QA Tool',
  tabs: {
    home: 'Início',
    projects: 'Projetos',
    learning: 'Aprendizagem',
    settings: 'Definições',
  },
  dashboard: {
    title: 'Painel',
    greeting: 'Olá',
    subtitle: 'Resumo da tua atividade de QA',
    metrics: {
      openQa: 'Itens QA abertos',
      activeProjects: 'Projetos ativos',
      automation: 'Cobertura automação',
      learning: 'Módulos em curso',
    },
    actions: {
      newReview: 'Nova revisão',
      viewProjects: 'Ver projetos',
    },
    feedback: {
      newReview: 'Fluxo de nova revisão (MVP).',
    },
  },
  projects: {
    title: 'Projetos',
    detailTitle: 'Detalhe do projeto',
    detailBody:
      'Este ecrã demonstra navegação tipada e stack de projetos. Os dados virão da API ou Firebase em fases seguintes.',
    detailFooter: 'MVP sem chamadas de rede.',
    emptyTitle: 'Sem projetos',
    emptyDescription: 'Ainda não há projetos. Cria um no backoffice ou sincroniza mais tarde.',
    emptyCta: 'Atualizar',
    refreshError: 'Não foi possível atualizar. Tenta outra vez.',
    openDetailA11y: 'Abrir detalhe do projeto',
  },
  learning: {
    title: 'Aprendizagem',
    subtitle: 'Conteúdos para subir o nível de QA e automação',
    emptyTitle: 'Sem cursos disponíveis',
    emptyDescription: 'Os cursos aparecerão aqui quando estiverem publicados.',
    moduleA11y: 'Abrir módulo',
  },
  settings: {
    title: 'Definições',
    appearance: 'Aparência',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    themeSystem: 'Sistema',
    themeHint: 'Escolhe como o tema segue o dispositivo ou força claro/escuro.',
    about: 'Sobre',
    version: 'Versão',
    aboutBody:
      'QA Tool — gestão de QA, projetos, automação e aprendizagem. MVP alinhado às regras do repositório.',
  },
} as const;
