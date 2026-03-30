import type { LinkingOptions } from '@react-navigation/native';
import type { MainTabParamList } from '@app-types/navigation';

/** Deep linking básico (MVP) — alinhado a `linking` no container nas regras de UI/UX */
export const linking: LinkingOptions<MainTabParamList> = {
  prefixes: ['qa-tool://'],
  config: {
    screens: {
      Home: 'inicio',
      Projects: 'projetos',
      Learning: 'aprendizagem',
      Settings: 'definicoes',
    },
  },
};
