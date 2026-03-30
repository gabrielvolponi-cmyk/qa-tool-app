export type ProjectRow = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  openQaCount: number;
};

export type LearningModule = {
  id: string;
  title: string;
  durationMin: number;
  level: 'iniciante' | 'intermédio' | 'avançado';
};

export const MOCK_PROJECTS: ProjectRow[] = [
  { id: 'p1', name: 'App mobile — checkout', status: 'active', openQaCount: 4 },
  { id: 'p2', name: 'API pagamentos v2', status: 'active', openQaCount: 2 },
  { id: 'p3', name: 'Portal admin', status: 'paused', openQaCount: 0 },
];

export const MOCK_MODULES: LearningModule[] = [
  { id: 'm1', title: 'Fundamentos de testes exploratórios', durationMin: 45, level: 'iniciante' },
  { id: 'm2', title: 'Automação com Detox', durationMin: 90, level: 'intermédio' },
  { id: 'm3', title: 'Estratégia de regressão', durationMin: 60, level: 'avançado' },
];
