import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UserLearning = {
  id: string;
  title: string;
  url: string;
};

type LearningStoreState = {
  userLearnings: UserLearning[];
  addLearning: (title: string, url: string) => void;
};

export const useLearningStore = create<LearningStoreState>()(
  persist(
    (set) => ({
      userLearnings: [],
      addLearning: (title, url) =>
        set((state) => ({
          userLearnings: [
            {
              id: `ul-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
              title: title.trim(),
              url: url.trim(),
            },
            ...state.userLearnings,
          ],
        })),
    }),
    {
      name: 'qa-tool-learning-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ userLearnings: state.userLearnings }),
    }
  )
);
