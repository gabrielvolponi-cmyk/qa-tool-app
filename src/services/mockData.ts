export type Client = {
  id: string;
  name: string;
};

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Luby' },
  { id: 'c2', name: 'Acme Corp' },
  { id: 'c3', name: 'Northwind' },
  { id: 'c4', name: 'Globex' },
];

export function getClientById(id: string): Client | undefined {
  return MOCK_CLIENTS.find((c) => c.id === id);
}

export type ProjectRow = {
  id: string;
  name: string;
  description: string;
  clientId: string;
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
  {
    id: 'p1',
    name: 'App mobile — checkout',
    description: 'Fluxo de pagamento e carrinho na app React Native.',
    clientId: 'c1',
    status: 'active',
    openQaCount: 4,
  },
  {
    id: 'p2',
    name: 'API pagamentos v2',
    description: 'Serviço de cobrança e webhooks.',
    clientId: 'c2',
    status: 'active',
    openQaCount: 2,
  },
  {
    id: 'p3',
    name: 'Portal admin',
    description: 'Backoffice interno para operações.',
    clientId: 'c3',
    status: 'paused',
    openQaCount: 0,
  },
];

export const MOCK_MODULES: LearningModule[] = [
  { id: 'm1', title: 'Fundamentos de testes exploratórios', durationMin: 45, level: 'iniciante' },
  { id: 'm2', title: 'Automação com Detox', durationMin: 90, level: 'intermédio' },
  { id: 'm3', title: 'Estratégia de regressão', durationMin: 60, level: 'avançado' },
];
