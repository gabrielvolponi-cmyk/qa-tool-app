export type ProjectsStackParamList = {
  ProjectList: undefined;
  ProjectDetail: { projectId: string; name: string };
};

export type MainTabParamList = {
  Home: undefined;
  Projects: undefined;
  Learning: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  RegisterQA: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList {}
  }
}
