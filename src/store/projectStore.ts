import { create } from 'zustand';
import { MOCK_PROJECTS, type ProjectRow } from '@services/mockData';

type NewProjectInput = {
  name: string;
  description: string;
  clientId: string;
  status: ProjectRow['status'];
};

type ProjectsState = {
  projects: ProjectRow[];
  addProject: (input: NewProjectInput) => ProjectRow;
  updateProject: (id: string, input: NewProjectInput) => void;
  removeProject: (id: string) => void;
  projectById: (id: string) => ProjectRow | undefined;
};

function makeId(): string {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [...MOCK_PROJECTS],
  addProject: (input) => {
    const row: ProjectRow = {
      id: makeId(),
      name: input.name.trim(),
      description: input.description.trim(),
      clientId: input.clientId,
      status: input.status,
      openQaCount: 0,
    };
    set((s) => ({ projects: [row, ...s.projects] }));
    return row;
  },
  updateProject: (id, input) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              name: input.name.trim(),
              description: input.description.trim(),
              clientId: input.clientId,
              status: input.status,
            }
          : p
      ),
    })),
  removeProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
  projectById: (id) => get().projects.find((p) => p.id === id),
}));
